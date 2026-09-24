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
  if (trip.photo) {
    $("photo-img").src = trip.photo;
    $("photo-img").alt = trip.title;
    $("photo").hidden = false;
    document.querySelector(".hero").classList.add("has-photo");
  }
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
  const forecast = {}; // date -> { code, max, min, rain }   (실제 예보, 최대 16일 앞)
  const climo = {};    // date -> { max, min, rain }         (최근 10년 같은 날짜 평균)
  const FORECAST_DAYS = 16;
  // 해당 날짜의 예보가 처음 나오는 날 (오늘 포함 16일 범위)
  const forecastFrom = (date) => { const d = parseDate(date); d.setDate(d.getDate() - (FORECAST_DAYS - 1)); return d; };
  function weatherFor(date) {
    const f = forecast[date];
    if (f) {
      const [icon, label] = WMO(f.code);
      return { icon, label, max: Math.round(f.max), min: Math.round(f.min), rain: f.rain, live: true };
    }
    const c = climo[date];
    if (c) {
      const icon = c.rain >= 50 ? "🌦️" : c.rain >= 30 ? "⛅" : "🌤️";
      return { icon, label: "10년 평균", max: Math.round(c.max), min: Math.round(c.min), rain: c.rain, live: false };
    }
    const n = trip.weather && trip.weather.normal;
    return n ? { icon: "🍂", label: "평년", max: n.max, min: n.min, live: false } : null;
  }
  function pendingNote(date) {
    if (forecast[date]) return "";
    const from = forecastFrom(date);
    return from > new Date() ? `${from.getMonth() + 1}/${from.getDate()}부터 예보` : "";
  }
  function weatherChip(date) {
    const w = weatherFor(date);
    if (!w) return "";
    const tail = w.live ? "" : ` · ${w.label}${pendingNote(date) ? " (" + pendingNote(date) + ")" : ""}`;
    return `<span class="wx ${w.live ? "" : "normal"}">${w.icon} ${w.max}° / ${w.min}°${w.rain != null ? ` · ☔ ${w.rain}%` : ""}${tail}</span>`;
  }
  // 최근 10년(작년까지) 같은 날짜의 실제 관측값 평균 → 예보가 없는 날에 사용
  function loadClimate() {
    const W = trip.weather;
    if (!W) return;
    const lastYear = parseDate(trip.startDate).getFullYear() - 1;
    const md = (s) => s.slice(5);
    const want = new Set(trip.days.map((d) => md(d.date)));
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${W.lat}&longitude=${W.lon}` +
      `&start_date=${lastYear - 9}${trip.startDate.slice(4)}&end_date=${lastYear}${trip.endDate.slice(4)}` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=${encodeURIComponent(W.timezone || "auto")}`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        const d = data.daily, acc = {};
        d.time.forEach((t, i) => {
          const k = md(t);
          if (!want.has(k) || d.temperature_2m_max[i] == null) return;
          const a = (acc[k] = acc[k] || { max: 0, min: 0, wet: 0, n: 0 });
          a.max += d.temperature_2m_max[i]; a.min += d.temperature_2m_min[i];
          a.wet += (d.precipitation_sum[i] || 0) >= 1 ? 1 : 0; a.n++;
        });
        trip.days.forEach((day) => {
          const a = acc[md(day.date)];
          if (a && a.n) climo[day.date] = { max: a.max / a.n, min: a.min / a.n, rain: Math.round((a.wet / a.n) * 100) };
        });
        renderDay();
        renderInfo();
      })
      .catch(() => {}); // 실패 시 10월 평년값 유지
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
            <span class="l">${w.label}${pendingNote(d.date) ? `<small>${pendingNote(d.date)}</small>` : ""}</span><span class="t"><b>${w.max}°</b> ${w.min}°</span>
            <span class="r">${w.rain != null ? "☔ " + w.rain + "%" : ""}</span></li>`;
        }).join("")}
      </ul>
      <p class="progress">일기예보는 최대 ${FORECAST_DAYS}일 앞까지 나와서, 그 전에는 최근 10년 같은 날짜의 평균(☔ = 비 온 해의 비율)을 보여줍니다. 예보가 나오면 자동으로 바뀝니다.${trip.weather.normal?.note ? " · " + esc(trip.weather.normal.note) : ""}</p>
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

  // 체크리스트 (준비물 · 전리품 공용)
  // - trip.shared.dbUrl 이 있으면 Firebase Realtime Database(REST + 실시간 스트림)로 모두와 공유
  // - 없거나 연결 실패 시 이 기기(localStorage)에만 저장
  // Firebase 키에 쓸 수 없는 문자( . $ # [ ] / ) 치환
  const fbKey = (s) => s.replace(/[.$#[\]/]/g, "_");
  const SYNC_TEXT = {
    local: "📱 이 기기에만 저장됩니다",
    connecting: "⏳ 공유 목록에 연결 중…",
    live: "👨‍👩‍👧 가족 모두와 실시간 공유 중",
    offline: "⚠️ 연결 끊김 · 다시 연결되면 공유됩니다"
  };

  function makeChecklist({ viewId, title, items, path, storeKey, oldStoreKey }) {
    const view = $(viewId);
    const load = () => { try { return JSON.parse(localStorage.getItem(storeKey)) || {}; } catch { return {}; } };
    const save = (v) => { try { localStorage.setItem(storeKey, JSON.stringify(v)); } catch {} };
    if (oldStoreKey) try { if (!localStorage.getItem(storeKey) && localStorage.getItem(oldStoreKey)) localStorage.setItem(storeKey, localStorage.getItem(oldStoreKey)); } catch {}

    const SHARED = trip.shared && trip.shared.dbUrl && path ? `${trip.shared.dbUrl.replace(/\/+$/, "")}/${path}` : null;
    let checks = {};          // fbKey -> boolean
    let sync = SHARED ? "connecting" : "local";
    // 로컬 캐시(항목 이름 기준)를 fbKey 기준으로 옮겨 담기
    (() => { const l = load(); items.forEach((c) => { if (l[c]) checks[fbKey(c)] = true; }); })();
    const cache = () => { const o = {}; items.forEach((c) => { if (checks[fbKey(c)]) o[c] = true; }); save(o); };

    function render() {
      const done = items.filter((c) => checks[fbKey(c)]).length;
      view.innerHTML = `
        <h2>${esc(title)}</h2>
        <p class="progress">${done} / ${items.length} 완료</p>
        <p class="sync sync-${sync}">${SYNC_TEXT[sync]}</p>
        <ul class="list check">
          ${items.map((c) => {
            const on = !!checks[fbKey(c)];
            return `
            <li class="${on ? "checked" : ""}" data-item="${esc(c)}">
              <input type="checkbox" ${on ? "checked" : ""} tabindex="-1">
              <span>${esc(c)}</span>
            </li>`;
          }).join("")}
        </ul>`;
    }
    view.addEventListener("click", (e) => {
      const li = e.target.closest("li[data-item]");
      if (!li) return;
      const k = fbKey(li.dataset.item);
      const next = !checks[k];
      checks[k] = next;
      cache();
      render();
      if (SHARED) {
        fetch(`${SHARED}/${encodeURIComponent(k)}.json`, { method: "PUT", body: JSON.stringify(next) })
          .then((r) => { if (!r.ok) throw r.status; })
          .catch(() => { sync = "offline"; render(); });
      }
    });

    function applyServer(p, data, merge) {
      if (p === "/") {
        if (merge) Object.assign(checks, data || {});
        else checks = data && typeof data === "object" ? { ...data } : {};
      } else {
        checks[decodeURIComponent(p.slice(1).split("/")[0])] = data;
      }
      Object.keys(checks).forEach((k) => { if (checks[k] == null) delete checks[k]; });
      cache();
      render();
    }
    function connect() {
      if (!SHARED || !window.EventSource) return;
      const es = new EventSource(`${SHARED}.json`);
      const onData = (merge) => (ev) => {
        try { const m = JSON.parse(ev.data); sync = "live"; applyServer(m.path, m.data, merge); } catch {}
      };
      es.addEventListener("put", onData(false));
      es.addEventListener("patch", onData(true));
      es.addEventListener("cancel", () => { sync = "offline"; render(); });
      es.onerror = () => { if (sync !== "offline") { sync = "offline"; render(); } };  // EventSource가 자동 재연결
    }
    return { render, connect };
  }

  const lists = [
    makeChecklist({
      viewId: "check-view", title: "준비물", items: trip.checklist,
      path: trip.shared && trip.shared.path,
      storeKey: "trip-check:" + trip.title,
      oldStoreKey: "trip-check:도쿄 4박 5일"   // 제목 변경 전 체크 상태 이어받기
    }),
    trip.loot && makeChecklist({
      viewId: "loot-view", title: "전리품", items: trip.loot.items,
      path: trip.loot.path,
      storeKey: "trip-loot:" + trip.title
    })
  ].filter(Boolean);

  // 하단 메뉴
  document.querySelectorAll(".bottom-bar button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const v = btn.dataset.view;
      document.querySelectorAll(".bottom-bar button").forEach((b) => b.classList.toggle("active", b === btn));
      $("day-view").hidden = v !== "day";
      $("info-view").hidden = v !== "info";
      $("check-view").hidden = v !== "check";
      $("loot-view").hidden = v !== "loot";
      tabs.hidden = v !== "day";
      window.scrollTo(0, 0);
    });
  });

  renderDay();
  renderInfo();
  lists.forEach((l) => l.render());
  renderFx();
  loadForecast();
  loadClimate();
  loadFx();
  lists.forEach((l) => l.connect());
})();
