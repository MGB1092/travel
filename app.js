(function () {
  const trip = window.TRIP;
  const TYPE_ICON = { flight: "✈️", move: "🚆", food: "🍜", sight: "📸", stay: "🏨", shop: "🛍️", etc: "📌" };
  const WEEK = ["일", "월", "화", "수", "목", "금", "토"];
  const $ = (id) => document.getElementById(id);

  const parseDate = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const fmtDate = (s) => { const d = parseDate(s); return `${d.getMonth() + 1}/${d.getDate()}(${WEEK[d.getDay()]})`; };
  const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  const mapUrl = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // 헤더
  document.title = trip.title;
  $("title").textContent = trip.title;
  $("subtitle").textContent = trip.subtitle || "";
  $("range").textContent = `${fmtDate(trip.startDate)} – ${fmtDate(trip.endDate)} · ${trip.days.length}일`;

  const today = todayStr();
  const diff = Math.round((parseDate(trip.startDate) - parseDate(today)) / 86400000);
  $("dday").textContent =
    diff > 0 ? `D-${diff}` :
    today <= trip.endDate ? `여행 ${1 - diff}일차` : "여행 완료 🎉";


  // 날씨: Open-Meteo 예보 (API 키 불필요). 예보 범위 밖이면 평년값 사용
  const WMO = (c) =>
    c === 0 ? ["☀️", "맑음"] : c <= 2 ? ["🌤️", "구름 조금"] : c === 3 ? ["☁️", "흐림"] :
    c <= 48 ? ["🌫️", "안개"] : c <= 57 ? ["🌦️", "이슬비"] : c <= 67 ? ["🌧️", "비"] :
    c <= 77 ? ["🌨️", "눈"] : c <= 82 ? ["🌧️", "소나기"] : c <= 86 ? ["🌨️", "눈"] : ["⛈️", "뇌우"];
  const forecast = {}; // date -> { code, max, min, rain }
  function weatherFor(date) {
    const f = forecast[date];
    if (f) {
      const [icon, label] = WMO(f.code);
      return { icon, label, max: Math.round(f.max), min: Math.round(f.min), rain: f.rain, live: true };
    }
    const n = trip.weather && trip.weather.normal;
    return n ? { icon: "🍂", label: "평년", max: n.max, min: n.min, live: false } : null;
  }
  function weatherChip(date) {
    const w = weatherFor(date);
    if (!w) return "";
    return `<span class="wx ${w.live ? "" : "normal"}">${w.icon} ${w.max}° / ${w.min}°${w.rain != null ? ` · ☔ ${w.rain}%` : ""}${w.live ? "" : " · 평년"}</span>`;
  }
  function loadForecast() {
    const W = trip.weather;
    if (!W) return;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${W.lat}&longitude=${W.lon}` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
      `&timezone=${encodeURIComponent(W.timezone || "auto")}&forecast_days=16`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        const d = data.daily;
        d.time.forEach((t, i) => {
          if (t >= trip.startDate && t <= trip.endDate) {
            forecast[t] = { code: d.weather_code[i], max: d.temperature_2m_max[i], min: d.temperature_2m_min[i], rain: d.precipitation_probability_max[i] };
          }
        });
        renderDay();
        renderInfo();
      })
      .catch(() => {}); // 오프라인 등 실패 시 평년값 유지
  }


  // 환율: open.er-api.com → frankfurter.app 순서로 시도, 모두 실패하면 fallback
  const fx = { rate: trip.exchange ? trip.exchange.fallback : null, source: "기본값", updated: null };
  const won = (n) => Math.round(n).toLocaleString("ko-KR");
  function renderFx() {
    const X = trip.exchange;
    if (!X) return;
    $("fx-box").innerHTML = `
      <h2>엔화 환율</h2>
      <div class="fx-card">
        <div class="fx-rate"><b id="fx-100"></b><span id="fx-meta"></span></div>
        <label class="fx-conv">
          <input id="fx-in" type="number" inputmode="numeric" min="0" placeholder="엔 금액 입력" value="1000">
          <span>엔 =</span>
          <b id="fx-out"></b>
        </label>
        <div class="fx-quick">${[500, 1000, 3000, 5000, 10000].map((v) => `<button data-yen="${v}">${v.toLocaleString()}¥</button>`).join("")}</div>
      </div>
      ${X.link ? `<a class="btn-link" href="${esc(X.link.url)}" target="_blank" rel="noopener">💴 ${esc(X.link.label)} ↗</a>` : ""}`;
    $("fx-in").addEventListener("input", updateFx);
    $("fx-box").querySelector(".fx-quick").addEventListener("click", (e) => {
      const v = e.target.dataset.yen;
      if (v) { $("fx-in").value = v; updateFx(); }
    });
    updateFx();
  }
  function updateFx() {
    if (!$("fx-100")) return;
    $("fx-100").textContent = `100엔 = ${(fx.rate * 100).toFixed(2)}원`;
    $("fx-meta").textContent = fx.updated ? `${fx.source} · ${fx.updated} 기준` : "실시간 환율을 불러오지 못해 기본값 표시 중";
    const yen = parseFloat($("fx-in").value) || 0;
    $("fx-out").textContent = `${won(yen * fx.rate)}원`;
  }
  function loadFx() {
    const X = trip.exchange;
    if (!X) return;
    const stamp = (d) => `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    fetch(`https://open.er-api.com/v6/latest/${X.from}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.result !== "success" || !j.rates[X.to]) throw 0;
        return { rate: j.rates[X.to], source: "ExchangeRate-API", updated: stamp(new Date(j.time_last_update_unix * 1000)) };
      })
      .catch(() => fetch(`https://api.frankfurter.app/latest?from=${X.from}&to=${X.to}`)
        .then((r) => r.json())
        .then((j) => {
          if (!j.rates || !j.rates[X.to]) throw 0;
          return { rate: j.rates[X.to], source: "유럽중앙은행(Frankfurter)", updated: j.date };
        }))
      .then((r) => { Object.assign(fx, r); updateFx(); })
      .catch(() => {});
  }

  // 일자 탭
  let current = Math.max(0, trip.days.findIndex((d) => d.date === today));
  const tabs = $("tabs");
  trip.days.forEach((day, i) => {
    const b = document.createElement("button");
    b.innerHTML = `Day ${i + 1}<small>${fmtDate(day.date)}</small>`;
    if (day.date === today) b.classList.add("today");
    b.addEventListener("click", () => { current = i; renderDay(); });
    tabs.appendChild(b);
  });

  function renderDay() {
    const day = trip.days[current];
    [...tabs.children].forEach((b, i) => b.classList.toggle("active", i === current));
    tabs.children[current].scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });

    // 오늘 일정이면 현재 진행 중인 항목 표시
    const now = new Date();
    const nowHM = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const isToday = day.date === today;
    let nowIdx = -1;
    if (isToday) day.items.forEach((it, i) => { if (it.time <= nowHM) nowIdx = i; });

    $("day-view").innerHTML = `
      <h2>Day ${current + 1} · ${esc(day.title)}<small>${fmtDate(day.date)}</small></h2>
      ${weatherChip(day.date) ? `<p class="day-wx">${weatherChip(day.date)}${trip.weather.link ? ` <a class="wx-link" href="${esc(trip.weather.link.url)}" target="_blank" rel="noopener">AccuWeather ↗</a>` : ""}</p>` : ""}
      <ol class="timeline">
        ${day.items.map((it, i) => `
          <li class="item ${isToday && i === nowIdx ? "now" : ""} ${isToday && i < nowIdx ? "done" : ""}">
            <div class="icon">${TYPE_ICON[it.type] || TYPE_ICON.etc}</div>
            <div class="card">
              <div class="time">${esc(it.time)}</div>
              <p class="title">${esc(it.title)}</p>
              ${it.memo ? `<p class="memo">${esc(it.memo)}</p>` : ""}
              ${it.place ? `<a class="map" href="${mapUrl(it.place)}" target="_blank" rel="noopener">📍 지도 보기</a>` : ""}
            </div>
          </li>`).join("")}
      </ol>`;
  }

  function renderInfo() {
    $("wx-box").innerHTML = `
      ${trip.weather ? `
      <h2>${esc(trip.weather.city)} 날씨</h2>
      <ul class="wx-list">
        ${trip.days.map((d) => {
          const w = weatherFor(d.date);
          return `<li><span class="d">${fmtDate(d.date)}</span><span class="i">${w.icon}</span>
            <span class="l">${w.label}</span><span class="t"><b>${w.max}°</b> ${w.min}°</span>
            <span class="r">${w.rain != null ? "☔ " + w.rain + "%" : ""}</span></li>`;
        }).join("")}
      </ul>
      <p class="progress">${Object.keys(forecast).length ? "실시간 예보(Open-Meteo) · " : ""}예보가 없는 날은 10월 평년값${trip.weather.normal?.note ? " · " + esc(trip.weather.normal.note) : ""}</p>
      ${trip.weather.link ? `<a class="btn-link" href="${esc(trip.weather.link.url)}" target="_blank" rel="noopener">🌤️ ${esc(trip.weather.link.label)} ↗</a>` : ""}` : ""}`;
    $("info-box").innerHTML = `
      <h2>여행 정보</h2>
      <ul class="list">
        ${trip.info.map((x) => `
          <li>
            <div class="emoji">${x.icon}</div>
            <div>
              <div class="label">${esc(x.label)}</div>
              <div class="value">${esc(x.value)}</div>
              ${x.memo ? `<div class="label">${esc(x.memo)}</div>` : ""}
              ${x.place ? `<a href="${mapUrl(x.place)}" target="_blank" rel="noopener">📍 지도</a>` : ""}
              ${x.tel ? `<a href="tel:${esc(x.tel)}">📞 전화 걸기</a>` : ""}
            </div>
          </li>`).join("")}
      </ul>
      ${trip.members?.length ? `<p class="progress">함께하는 사람: ${trip.members.map(esc).join(", ")}</p>` : ""}`;
  }

  // 준비물 체크 상태는 브라우저에 저장
  const KEY = "trip-check:" + trip.title;
  const OLD_KEY = "trip-check:도쿄 4박 5일"; // 제목 변경 전 체크 상태 이어받기
  try { if (!localStorage.getItem(KEY) && localStorage.getItem(OLD_KEY)) localStorage.setItem(KEY, localStorage.getItem(OLD_KEY)); } catch {}
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const save = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} };

  function renderCheck() {
    const state = load();
    const done = trip.checklist.filter((c) => state[c]).length;
    $("check-view").innerHTML = `
      <h2>준비물</h2>
      <p class="progress">${done} / ${trip.checklist.length} 완료</p>
      <ul class="list check">
        ${trip.checklist.map((c) => `
          <li class="${state[c] ? "checked" : ""}" data-item="${esc(c)}">
            <input type="checkbox" ${state[c] ? "checked" : ""} tabindex="-1">
            <span>${esc(c)}</span>
          </li>`).join("")}
      </ul>`;
  }
  $("check-view").addEventListener("click", (e) => {
    const li = e.target.closest("li[data-item]");
    if (!li) return;
    const state = load();
    state[li.dataset.item] = !state[li.dataset.item];
    save(state);
    renderCheck();
  });

  // 하단 메뉴
  document.querySelectorAll(".bottom-bar button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const v = btn.dataset.view;
      document.querySelectorAll(".bottom-bar button").forEach((b) => b.classList.toggle("active", b === btn));
      $("day-view").hidden = v !== "day";
      $("info-view").hidden = v !== "info";
      $("check-view").hidden = v !== "check";
      tabs.hidden = v !== "day";
      window.scrollTo(0, 0);
    });
  });

  renderDay();
  renderInfo();
  renderCheck();
  renderFx();
  loadForecast();
  loadFx();
})();
