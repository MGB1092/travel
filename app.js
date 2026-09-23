(function () {
  const trip = window.TRIP;
  const TYPE_ICON = { move: "🚆", food: "🍜", sight: "📸", stay: "🏨", shop: "🛍️", etc: "📌" };
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
    $("info-view").innerHTML = `
      <h2>여행 정보</h2>
      <ul class="list">
        ${trip.info.map((x) => `
          <li>
            <div class="emoji">${x.icon}</div>
            <div>
              <div class="label">${esc(x.label)}</div>
              <div class="value">${esc(x.value)}</div>
              ${x.place ? `<a href="${mapUrl(x.place)}" target="_blank" rel="noopener">📍 지도</a>` : ""}
              ${x.tel ? `<a href="tel:${esc(x.tel)}">📞 전화 걸기</a>` : ""}
            </div>
          </li>`).join("")}
      </ul>
      ${trip.members?.length ? `<p class="progress">함께하는 사람: ${trip.members.map(esc).join(", ")}</p>` : ""}`;
  }

  // 준비물 체크 상태는 브라우저에 저장
  const KEY = "trip-check:" + trip.title;
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
})();
