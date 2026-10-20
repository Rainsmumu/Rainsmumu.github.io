(() => {
  const D = window.SITE;
  const $ = (s) => document.querySelector(s);
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 界面固定文案(内容文案在 data.js)
  const UI = {
    "sec.about": { zh: "关于我", en: "About" },
    "sec.news": { zh: "近况", en: "News" },
    "sec.pubs": { zh: "论文发表", en: "Publications" },
    "sec.projects": { zh: "项目", en: "Projects" },
    "sec.exp": { zh: "工作经历", en: "Experience" },
    "sec.edu": { zh: "教育背景", en: "Education" },
    "sec.skills": { zh: "技能", en: "Skills" },
    cv: { zh: "下载简历", en: "Download CV" },
    hi: { zh: "你好呀 👋", en: "Hey there 👋" },
    quote: { zh: "复制引用", en: "Copy quote" },
    copied: { zh: "已复制 ✓", en: "Copied ✓" },
    quoted: { zh: "引用已复制到剪贴板", en: "Quote copied to clipboard" },
    "k.theme": { zh: "主题", en: "theme" },
    "k.lang": { zh: "语言", en: "lang" },
    top: { zh: "回到顶部", en: "Top" },
    read: { zh: (n) => `约 ${n} 分钟读完`, en: (n) => `${n} min read` },
    updated: { zh: (d) => `更新于 ${d}`, en: (d) => `Updated ${d}` },
    pushed: { zh: (r) => `${r}有更新`, en: (r) => `updated ${r}` },
    clap0: { zh: "看到这里了?鼓个掌吧", en: "Made it this far? Leave a clap" },
    clapN: { zh: (n) => `你鼓了 ${n} 次掌,谢谢!`, en: (n) => `You clapped ${n} time${n > 1 ? "s" : ""} — thanks!` },
    clapMax: { zh: "收到了 50 次掌声,太热情了 🙏", en: "50 claps — that's the max, thank you 🙏" },
  };
  // 根据上海时间猜一下此刻的状态
  const STATUS = [
    [0, 7, { zh: "上海 {t} · 大概在睡觉", en: "Shanghai {t} · probably asleep" }, true],
    [7, 9, { zh: "上海 {t} · 正在醒来 / 通勤", en: "Shanghai {t} · waking up / commuting" }],
    [9, 18, { zh: "上海 {t} · 上班中", en: "Shanghai {t} · at work" }, false, true],
    [18, 23, { zh: "上海 {t} · 可能在折腾 Agent", en: "Shanghai {t} · probably hacking on agents" }],
    [23, 24, { zh: "上海 {t} · 准备睡了", en: "Shanghai {t} · winding down" }, true],
  ];

  const ICONS = {
    github: '<path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5Z"/>',
    bilibili: '<path fill="currentColor" d="M7.2 2.4a1 1 0 0 1 1.4 0L11.2 5h1.6l2.6-2.6a1 1 0 1 1 1.4 1.4L15.6 5H18a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h2.4L7.2 3.8a1 1 0 0 1 0-1.4ZM6 7a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H6Zm2 4a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V12a1 1 0 0 1 1-1Zm8 0a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V12a1 1 0 0 1 1-1Z"/>',
    scholar: '<path fill="currentColor" d="M12 2 1 9l4 2.5V17c0 2.2 3.1 4 7 4s7-1.8 7-4v-5.5l2-1.3V16h2V9L12 2Zm5 15c0 .9-2 2-5 2s-5-1.1-5-2v-4.2l5 3.2 5-3.2V17Zm-5-3.4L4.8 9 12 4.4 19.2 9 12 13.6Z"/>',
    email: '<path fill="currentColor" d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2.4V17h16V7.4l-8 5.3-8-5.3ZM5.6 7l6.4 4.3L18.4 7H5.6Z"/>',
  };

  let lang = store.get("lang") || (navigator.language.startsWith("zh") ? "zh" : "en");
  const t = (v) => (v && typeof v === "object" && !Array.isArray(v) && "zh" in v ? v[lang] : v);
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const icon = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k] || ""}</svg>`;
  const boldMe = (authors) => D.me.reduce((s, n) => s.replaceAll(esc(n), `<b>${esc(n)}</b>`), esc(authors));
  const SECTIONS = { about: "sec.about", news: "sec.news", publications: "sec.pubs", projects: "sec.projects", experience: "sec.exp", education: "sec.edu", skills: "sec.skills" };
  const has = (id) => !Array.isArray(D[id]) || D[id].length > 0; // 列表为空的板块整块隐藏

  // ---------- render ----------
  function render() {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    $("#langBtn").textContent = lang === "zh" ? "EN" : "中";
    document.querySelectorAll("[data-t]").forEach((el) => (el.textContent = UI[el.dataset.t][lang]));
    document.querySelectorAll("[data-k]").forEach((el) => (el.textContent = t(D[el.dataset.k])));

    $("#avatar").querySelector("img, .ini")?.remove();
    $("#avatar").insertAdjacentHTML("afterbegin", D.avatar ? `<img src="${esc(D.avatar)}" alt="${esc(t(D.name))}">` : `<span class="ini">${esc(D.name.zh.slice(0, 1))}</span>`);

    $("#links").innerHTML =
      `<li><button id="mailBtn" title="${esc(D.email)}">${icon("email")}<span class="label"><span class="orig">${esc(D.email)}</span><span class="copied">${UI.copied[lang]}</span></span></button></li>` +
      D.links.filter((l) => l.url).map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${icon(l.icon)}<span class="u">${esc(t(l.label))}</span></a></li>`).join("");
    $("#mailBtn").onclick = copyMail;

    $("#toc").querySelectorAll("a").forEach((a) => a.remove());
    $("#toc").insertAdjacentHTML("beforeend", Object.keys(SECTIONS).filter(has).map((id) => `<a href="#${id}">${UI[SECTIONS[id]][lang]}</a>`).join(""));

    $("#aboutText").innerHTML = t(D.about).map((p) => `<p>${esc(p)}</p>`).join("");
    $("#interests").innerHTML = D.interests.map((i) => `<li>${esc(t(i))}</li>`).join("");

    $("#newsList").innerHTML = D.news.map((n, i) => `<li data-reveal><time>${esc(n.date)}</time><span class="${i === 0 ? "fresh" : ""}">${esc(t(n.text))}</span></li>`).join("");

    $("#pubList").innerHTML = D.publications.map((p) => `
      <li data-reveal>
        <div class="pub-title">${esc(p.title)}</div>
        <div class="pub-authors">${boldMe(p.authors)}</div>
        <div class="pub-venue">${esc(p.venue)}, ${esc(p.year)}${t(p.note) ? `<span class="note">${esc(t(p.note))}</span>` : ""}</div>
        ${p.links.some((l) => l.url) ? `<div class="pub-links">${p.links.filter((l) => l.url).map((l) => `<a class="u" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</div>` : ""}
      </li>`).join("");

    $("#projectList").innerHTML = D.projects.map((p) => `
      <li data-reveal>
        <div class="proj-head">
          ${p.url ? `<a class="proj-name" href="${esc(p.url)}" target="_blank" rel="noopener"><span class="u">${esc(p.name)}</span><span class="arrow">↗</span></a>` : `<span class="proj-name">${esc(p.name)}</span>`}
          <span class="gh-meta" data-repo="${esc(repoOf(p.url))}"></span>
        </div>
        <p>${esc(t(p.desc))}</p>
        <div class="tags">${p.tags.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>
      </li>`).join("");

    const rows = (items) => items.map((e) => `
      <li data-reveal>
        <span class="when">${esc(t(e.when))}</span>
        <div>
          <div class="what">${esc(t(e.title))}</div>
          <div class="org">${esc(t(e.org))}</div>
          ${t(e.points).length ? `<ul>${t(e.points).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
        </div>
      </li>`).join("");
    $("#expList").innerHTML = rows(D.experience);
    $("#eduList").innerHTML = rows(D.education);

    $("#skillList").innerHTML = D.skills.map((s) => `<dt>${esc(t(s.group))}</dt><dd>${esc(t(s.items))}</dd>`).join("");

    Object.keys(SECTIONS).forEach((id) => ($("#" + id).hidden = !has(id)));
    $("#year").textContent = new Date().getFullYear();
    $("#updated").textContent = UI.updated[lang](new Date(document.lastModified).toISOString().slice(0, 10));
    $("#readtime").textContent = UI.read[lang](readMinutes());

    tick();
    renderClap();
    renderPrint();
    fillGitHub();
    observe();
  }

  // 中文按 400 字/分钟,英文按 230 词/分钟估算
  function readMinutes() {
    const text = $("#content").innerText;
    const cjk = (text.match(/[一-鿿]/g) || []).length;
    const words = (text.replace(/[一-鿿]/g, " ").match(/[A-Za-z]+/g) || []).length;
    return Math.max(1, Math.round(cjk / 400 + words / 230));
  }

  function renderPrint() {
    const rows = (title, items) => `<h2>${title}</h2>` + items.map((e) => `
      <div class="pr-item">
        <div class="pr-line">${esc(t(e.title))} · ${esc(t(e.org))}<span>${esc(t(e.when))}</span></div>
        ${t(e.points).length ? `<ul>${t(e.points).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
      </div>`).join("");
    const github = D.links.find((l) => l.icon === "github");
    $("#printResume").innerHTML = `
      <div class="pr-head">
        <div><h1>${esc(t(D.name))}<small>${esc(t(D.altName))}</small></h1><div class="pr-role">${esc(t(D.title))}</div></div>
        <div class="pr-contact">${esc(D.email)}<br>${github ? esc(github.url.replace("https://", "")) : ""}<br>${esc(t(D.location))}</div>
      </div>
      ${rows(UI["sec.edu"][lang], D.education)}
      ${rows(UI["sec.exp"][lang], D.experience)}
      ${D.publications.length ? `<h2>${UI["sec.pubs"][lang]}</h2>` + D.publications.map((p) => `
        <div class="pr-item"><div>${boldMe(p.authors)}. ${esc(p.title)}. <em>${esc(p.venue)}</em>, ${esc(p.year)}.</div></div>`).join("") : ""}
      <h2>${UI["sec.projects"][lang]}</h2>
      ${D.projects.map((p) => `
        <div class="pr-item">
          <div class="pr-line">${esc(p.name)}<span>${esc(p.tags.join(" / "))}</span></div>
          <p>${esc(t(p.desc))}</p>
        </div>`).join("")}
      <h2>${UI["sec.skills"][lang]}</h2>
      ${D.skills.map((s) => `<div><b>${esc(t(s.group))}:</b> ${esc(t(s.items))}</div>`).join("")}`;
  }

  // ---------- 项目的 GitHub 最近更新时间(拉取失败就静默不显示) ----------
  const repoOf = (url) => (url && url.match(/github\.com\/([^/]+\/[^/#?]+)/)?.[1]) || "";
  const ghCache = {};
  function fillGitHub() {
    document.querySelectorAll(".gh-meta[data-repo]").forEach(async (el) => {
      const repo = el.dataset.repo;
      if (!repo) return;
      try {
        let info = ghCache[repo];
        if (!info) {
          const cached = sessionStorage.getItem("gh:" + repo);
          info = cached ? JSON.parse(cached) : await fetch(`https://api.github.com/repos/${repo}`).then((r) => (r.ok ? r.json() : Promise.reject()));
          info = ghCache[repo] = { pushed: info.pushed_at || info.pushed, stars: info.stargazers_count ?? info.stars ?? 0 };
          try { sessionStorage.setItem("gh:" + repo, JSON.stringify(info)); } catch {}
        }
        el.textContent = UI.pushed[lang](relTime(info.pushed)) + (info.stars ? ` · ★ ${info.stars}` : "");
        el.classList.add("ok");
      } catch {}
    });
  }
  function relTime(iso) {
    const rtf = new Intl.RelativeTimeFormat(lang === "zh" ? "zh-CN" : "en", { numeric: "auto" });
    const s = (new Date(iso) - Date.now()) / 1000;
    for (const [u, n] of [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]]) {
      if (Math.abs(s) >= n) return rtf.format(Math.round(s / n), u);
    }
    return rtf.format(0, "minute");
  }

  // ---------- 上海时间 + 状态 ----------
  function tick() {
    const now = new Date();
    const parts = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Shanghai", hour: "2-digit", minute: "2-digit", weekday: "short", hourCycle: "h23" }).formatToParts(now).map((p) => [p.type, p.value]));
    const h = +parts.hour, weekend = parts.weekday === "Sat" || parts.weekday === "Sun";
    let [, , label, sleep, work] = STATUS.find(([a, b]) => h >= a && h < b);
    if (work && weekend) label = { zh: "上海 {t} · 周末,可能在折腾项目", en: "Shanghai {t} · weekend, probably tinkering" };
    $("#now span").textContent = t(label).replace("{t}", `${parts.hour}:${parts.minute}`);
    $("#now").classList.toggle("sleep", !!sleep);
  }
  setInterval(tick, 30000);

  // ---------- 滚动:依次淡入、标题横线、目录指示条、阅读进度 ----------
  let io, spyIo;
  function observe() {
    io?.disconnect(); spyIo?.disconnect();
    io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    }), { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".content h2").forEach((h) => io.observe(h));
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.style.setProperty("--d", `${[...el.parentNode.children].indexOf(el) * 70}ms`);
      io.observe(el);
    });

    spyIo = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-15% 0px -70% 0px" });
    Object.keys(SECTIONS).filter(has).forEach((id) => spyIo.observe($("#" + id)));
    setActive(activeId || "about");
  }
  let activeId;
  function setActive(id) {
    activeId = id;
    const a = $(`#toc a[href="#${id}"]`);
    document.querySelectorAll("#toc a").forEach((x) => x.classList.toggle("active", x === a));
    if (a) { const bar = $("#tocBar"); bar.style.height = a.offsetHeight + "px"; bar.style.transform = `translateY(${a.offsetTop}px)`; }
  }
  let ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      $("#progress").style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      ticking = false;
    });
  }, { passive: true });

  // ---------- 小交互 ----------
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => el.classList.remove("show"), 1800);
  }
  async function copyText(s) {
    try { await navigator.clipboard.writeText(s); return true; } catch { return false; }
  }
  async function copyMail() {
    const b = $("#mailBtn");
    if (!(await copyText(D.email))) { location.href = "mailto:" + D.email; return; }
    b.classList.add("ok");
    clearTimeout(copyMail.t);
    copyMail.t = setTimeout(() => b.classList.remove("ok"), 1600);
  }

  // 选中正文里的一段文字 → 浮出「复制引用」
  const pop = $("#quotePop");
  let picked = "";
  document.addEventListener("mouseup", (e) => {
    if (pop.contains(e.target)) return;
    setTimeout(() => {
      const sel = getSelection();
      const s = sel.toString().trim();
      if (!s || s.length < 4 || !sel.rangeCount || !$("#content").contains(sel.anchorNode)) { pop.hidden = true; return; }
      const r = sel.getRangeAt(0).getBoundingClientRect();
      picked = s;
      pop.style.left = r.left + r.width / 2 + scrollX + "px";
      pop.style.top = r.top + scrollY + "px";
      pop.hidden = false;
    }, 0);
  });
  pop.addEventListener("mousedown", (e) => e.preventDefault());
  pop.addEventListener("click", async () => {
    const q = lang === "zh" ? `「${picked}」—— ${D.name.zh}\n${location.href}` : `"${picked}" — ${D.name.en}\n${location.href}`;
    if (await copyText(q)) toast(UI.quoted[lang]);
    pop.hidden = true;
    getSelection().removeAllRanges();
  });
  addEventListener("scroll", () => (pop.hidden = true), { passive: true });

  // 鼓掌(致敬 Medium):每位访客最多 50 次,只记在本机
  let claps = +(store.get("claps") || 0);
  function renderClap() {
    $("#clap").classList.toggle("on", claps > 0);
    $("#clapText").textContent = claps >= 50 ? UI.clapMax[lang] : claps ? UI.clapN[lang](claps) : UI.clap0[lang];
  }
  $("#clap").onclick = () => {
    if (claps >= 50) return;
    claps++;
    store.set("claps", claps);
    const b = $("#clap"), burst = $("#burst");
    burst.textContent = "+" + claps;
    b.classList.remove("pop"); burst.classList.remove("go");
    void b.offsetWidth;
    b.classList.add("pop"); burst.classList.add("go");
    renderClap();
  };

  // ---------- 主题:从按钮位置圆形扩散 ----------
  const applyTheme = (th) => (th === "dark" ? (document.documentElement.dataset.theme = "dark") : delete document.documentElement.dataset.theme);
  applyTheme(store.get("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    store.set("theme", next);
    if (!document.startViewTransition || reduced) return applyTheme(next);
    const r = $("#themeBtn").getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(() => applyTheme(next)).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(.4, 0, .2, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }

  // ---------- 语言:淡出 → 切换 → 淡入 ----------
  function toggleLang() {
    lang = lang === "zh" ? "en" : "zh";
    store.set("lang", lang);
    if (reduced) return render();
    const c = $("#content"), side = $(".side");
    c.classList.add("fading"); side.style.transition = "opacity .18s"; side.style.opacity = 0;
    setTimeout(() => {
      render();
      c.classList.remove("fading"); side.style.opacity = 1;
    }, 180);
  }

  $("#themeBtn").onclick = toggleTheme;
  $("#langBtn").onclick = toggleLang;
  $("#printBtn").onclick = () => window.print();
  $("#toTop").onclick = (e) => { e.preventDefault(); scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); };
  addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || /input|textarea/i.test(e.target.tagName)) return;
    if (e.key === "t" || e.key === "T") toggleTheme();
    if (e.key === "l" || e.key === "L") toggleLang();
  });
  addEventListener("resize", () => setActive(activeId));

  render();
})();
