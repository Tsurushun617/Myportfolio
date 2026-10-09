/* =========================================================
   共通スクリプト
   - モバイルナビ開閉
   - 実績一覧の描画＋カテゴリ絞り込み（works.html / トップのプレビュー）
   - 実績詳細の描画（work.html?id=xxx）
   - 運用実績の一覧・詳細（operations.html / operation.html?id=xxx）
   - スクロール時のふわっと表示
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 小さなヘルパ ---------- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  /* デジタル庁デザインシステムの外部リンクアイコン（assets/images/icon-external-link.svg と同一） */
  const EXTERNAL_LINK_ICON =
    '<svg class="external-link-icon" width="16" height="16" viewBox="0 0 48 48" role="img" aria-label="新規タブで開きます">' +
    '<path d="M22 6V9H9V39H39V26H42V42H6V6H22ZM42 6V20H39V11.2L21 29L19 27L36.8 9H28V6H42Z" fill="currentColor"/>' +
    "</svg>";

  const ICON = {
    arrow: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>'
  };

  function initExternalLinkIcons(ctx) {
    $$('a[target="_blank"]', ctx).forEach((a) => {
      if (a.querySelector(".external-link-icon")) return;
      a.insertAdjacentHTML("beforeend", EXTERNAL_LINK_ICON);
    });
  }

  /* ---------- 実績カードのHTML ---------- */
  function cardHTML(w, href) {
    const thumb = w.thumb
      ? `<img src="${esc(w.thumb)}" alt="${esc(w.title)}のサムネイル" loading="lazy">`
      : `<span class="card__thumb-fallback">${esc(w.title)}</span>`;
    const url = typeof href === "string" ? href : `work.html?id=${encodeURIComponent(w.id)}`;
    return `
      <a class="card reveal" href="${url}" aria-label="${esc(w.title)}の詳細を見る">
        <div class="card__thumb">${thumb}</div>
        <div class="card__body">
          <div class="card__meta">
            <span class="badge badge--cat">${esc(w.catLabel)}</span>
            <span class="badge badge--role">${esc(w.role)}</span>
          </div>
          <h3 class="card__title">${esc(w.title)}</h3>
          <p class="card__desc">${esc(w.summary)}</p>
          <span class="card__more">詳細を見る ${ICON.arrow}</span>
        </div>
      </a>`;
  }

  /* ---------- 一覧の描画 ---------- */
  function renderList() {
    const grid = $("[data-works-grid]");
    if (!grid || typeof WORKS === "undefined") return;
    const limit = parseInt(grid.getAttribute("data-limit") || "0", 10);
    const items = limit > 0 ? WORKS.slice(0, limit) : WORKS;

    const paint = (filter) => {
      const list = filter && filter !== "all"
        ? items.filter((w) => w.category === filter)
        : items;
      grid.innerHTML = list.map((w) => cardHTML(w)).join("") ||
        '<p style="color:var(--muted)">該当する制作物がありません。</p>';
      observeReveal();
    };
    paint("all");

    /* 絞り込みボタン */
    $$("[data-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        paint(btn.getAttribute("data-filter"));
      });
    });
  }

  /* ---------- 工数比較の横棒グラフ ---------- */
  function effortHTML(e) {
    if (!e || !e.items || e.items.length < 2) return "";
    const max = Math.max(...e.items.map((i) => i.hours));
    const [base, ai] = e.items;
    const saved = base.hours - ai.hours;
    const rate = Math.round((saved / base.hours) * 100);
    const rows = e.items.map((i, n) => `
      <li class="effort__row${n === 0 ? " effort__row--base" : ""}">
        <div class="effort__head">
          <span class="effort__label">${esc(i.label)}</span>
          <span class="effort__hours">約${esc(i.hours)}h</span>
        </div>
        <div class="effort__bar" aria-hidden="true"><span class="effort__fill" style="width:${(i.hours / max) * 100}%"></span></div>
      </li>`).join("");
    return `
      <section class="effort" aria-labelledby="effort-title">
        <h2 class="effort__title" id="effort-title">工数比較シミュレーション</h2>
        <ul class="effort__bars">${rows}</ul>
        <p class="effort__rate">約${rate}%削減<small>（約${saved}h短縮）</small></p>
        ${(e.notes || []).length ? `<ul class="effort__notes">${e.notes.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
      </section>`;
  }

  /* ---------- 運用実績の一覧 ---------- */
  function renderOperations() {
    const grid = $("[data-operations-grid]");
    if (!grid || typeof OPERATIONS === "undefined") return;
    const limit = parseInt(grid.getAttribute("data-limit") || "0", 10);
    const items = limit > 0 ? OPERATIONS.slice(0, limit) : OPERATIONS;
    grid.innerHTML = items.map((item) =>
      cardHTML(item, `operation.html?id=${encodeURIComponent(item.id)}`)
    ).join("") || '<p style="color:var(--muted)">運用実績はまだありません。</p>';
    observeReveal();
  }

  /* ---------- 運用実績の詳細 ---------- */
  function renderOperationDetail() {
    const root = $("[data-operation-detail]");
    if (!root || typeof OPERATIONS === "undefined") return;
    const id = new URLSearchParams(location.search).get("id");
    const item = OPERATIONS.find((x) => x.id === id);

    if (!item) {
      root.innerHTML = `<p style="color:var(--muted)">運用実績が見つかりませんでした。<a href="operations.html" style="color:var(--accent);font-weight:700">一覧に戻る</a></p>`;
      return;
    }
    document.title = `${item.title}の運用 | Shun Tsuruoka Portfolio`;

    const visual = item.thumb
      ? `<div class="detail__visual"><img src="${esc(item.thumb)}" alt="${esc(item.title)}のスクリーンショット" style="width:100%;height:100%;object-fit:cover"></div>`
      : `<div class="detail__visual"><span>${esc(item.title)}</span></div>`;
    const updates = (item.updates || []).map((t) => `<li>${esc(t)}</li>`).join("");
    const workLink = item.workId
      ? `<p class="detail__note"><a href="work.html?id=${encodeURIComponent(item.workId)}">新規制作時の実績</a>は制作物一覧に掲載しています。</p>`
      : "";

    root.innerHTML = `
      <a class="back-link" href="operations.html">${ICON.back} 運用実績一覧へ戻る</a>
      <div class="detail">
        ${visual}
        <div>
          <div class="detail__meta">
            <span class="badge badge--cat">${esc(item.catLabel)}</span>
            <span class="badge badge--role">${esc(item.role)}</span>
          </div>
          <h1 class="detail__title">${esc(item.title)}</h1>
          <p class="detail__desc">${esc(item.description)}</p>
          ${updates ? `<h2 class="detail__subhead">公開後に対応したこと</h2><ul class="detail__updates">${updates}</ul>` : ""}
          <dl>
            <dt>担当</dt><dd>${esc(item.role)}</dd>
            <dt>時期</dt><dd>${esc(item.period)}</dd>
            <dt>使用技術</dt><dd>${item.tech.map(esc).join(" / ")}</dd>
          </dl>
          ${workLink}
          <a class="btn btn--primary" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">
            サイトを見る
          </a>
        </div>
      </div>`;
  }

  /* ---------- 詳細の描画 ---------- */
  function renderDetail() {
    const root = $("[data-work-detail]");
    if (!root || typeof WORKS === "undefined") return;
    const id = new URLSearchParams(location.search).get("id");
    const w = WORKS.find((x) => x.id === id);

    if (!w) {
      root.innerHTML = `<p style="color:var(--muted)">制作物が見つかりませんでした。<a href="works.html" style="color:var(--accent);font-weight:700">一覧に戻る</a></p>`;
      return;
    }
    document.title = `${w.title} | Shun Tsuruoka Portfolio`;

    const visual = w.thumb
      ? `<div class="detail__visual"><img src="${esc(w.thumb)}" alt="${esc(w.title)}のスクリーンショット" style="width:100%;height:100%;object-fit:cover"></div>`
      : `<div class="detail__visual"><span>${esc(w.title)}</span></div>`;

    root.innerHTML = `
      <a class="back-link" href="works.html">${ICON.back} 制作物一覧へ戻る</a>
      <div class="detail">
        ${visual}
        <div>
          <div class="detail__meta">
            <span class="badge badge--cat">${esc(w.catLabel)}</span>
            <span class="badge badge--role">${esc(w.role)}</span>
          </div>
          <h1 class="detail__title">${esc(w.title)}</h1>
          <p class="detail__desc">${esc(w.description)}</p>
          <dl>
            <dt>担当範囲</dt><dd>${esc(w.role)}</dd>
            <dt>使用技術</dt><dd>${w.tech.map(esc).join(" / ")}</dd>
            ${(w.tracking || []).map((t) => `<dt>${esc(t.name)}</dt><dd>${esc(t.work)}</dd>`).join("")}
          </dl>
          ${effortHTML(w.effort)}
          <a class="btn btn--primary" href="${esc(w.url)}" target="_blank" rel="noopener noreferrer">
            サイトを見る
          </a>
        </div>
      </div>`;
  }

  /* ---------- モバイルナビ ---------- */
  function initNav() {
    const toggle = $(".nav-toggle");
    const nav = $("#site-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.setAttribute("data-open", String(!open));
    });
    $$(".nav__link", nav).forEach((a) =>
      a.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        nav.setAttribute("data-open", "false");
      })
    );
  }

  /* ---------- スクロール表示 ---------- */
  let io;
  function observeReveal() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      $$(".reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    $$(".reveal:not(.is-in)").forEach((el) => io.observe(el));
  }

  /* ---------- 現在地ハイライト ---------- */
  function markCurrent() {
    const file = location.pathname.split("/").pop() || "index.html";
    $$(".site-header .nav__link").forEach((a) => {
      const href = a.getAttribute("href");
      if (href === file || (file === "" && href === "index.html") ||
          (file === "work.html" && href === "works.html") ||
          (file === "operation.html" && href === "operations.html")) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    markCurrent();
    renderList();
    renderDetail();
    renderOperations();
    renderOperationDetail();
    initExternalLinkIcons();
    observeReveal();
  });
})();
