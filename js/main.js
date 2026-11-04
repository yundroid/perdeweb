(function () {
  const C = window.SITE_CONFIG;
  const MODELS = window.CURTAIN_MODELS;
  const WORKS = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const waLink = (msg) => `https://wa.me/${C.whatsappNumber}?text=${encodeURIComponent(msg || C.defaultWhatsappMessage)}`;

  function media(item) {
    return item.image
      ? `<img src="${esc(item.image)}" alt="${esc(item.title || item.name)}" loading="lazy">`
      : window.curtainArt(item.type, item.color, item.accent);
  }

  /* ---------- Ayarları sayfaya uygula ---------- */
  $$("[data-bind]").forEach((el) => {
    const v = C[el.dataset.bind];
    if (v) el.textContent = v;
  });
  document.title = `${C.businessName} | Tül, Fon, Stor, Zebra Perde`;
  $$("a[data-wa]").forEach((a) => { a.href = waLink(); a.target = "_blank"; a.rel = "noopener"; });
  $$("a[data-tel]").forEach((a) => (a.href = `tel:${C.phoneLink}`));
  $$("a[data-mail]").forEach((a) => (a.href = `mailto:${C.email}`));
  $$("a[data-maps]").forEach((a) => (a.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.address)}`));
  $("#mapFrame").src = `https://www.google.com/maps?q=${encodeURIComponent(C.mapsQuery || C.address)}&output=embed`;
  $("#year").textContent = new Date().getFullYear();
  $("#social").innerHTML = [["Instagram", C.instagram], ["Facebook", C.facebook]]
    .filter(([, u]) => u)
    .map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${n}</a>`)
    .join(" · ");

  $("#heroArt").innerHTML = window.curtainArt("fon", "#8c5a3c", "#6f4429");

  /* ---------- Mobil menü ---------- */
  const nav = $("#nav"), toggle = $("#navToggle");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", false); }
  });

  /* ---------- Perde modelleri ---------- */
  $("#modelGrid").innerHTML = MODELS.map((m) => `
    <article class="card">
      <div class="card__media">${media(m)}</div>
      <div class="card__body">
        <h3>${esc(m.name)}</h3>
        <p>${esc(m.desc)}</p>
        <div class="tags">${m.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        <div class="card__actions">
          <a class="btn btn--whatsapp btn--sm" target="_blank" rel="noopener"
             href="${waLink(`Merhaba, ${m.name} hakkında bilgi ve fiyat almak istiyorum.`)}">
            <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><use href="#ico-wa"/></svg>Fiyat Sor</a>
          <a class="btn btn--ghost btn--sm" href="#teklif" data-pick="${m.id}">Teklif Formu</a>
        </div>
      </div>
    </article>`).join("");

  /* ---------- Yapılan işler + filtre ---------- */
  const cats = ["Tümü", ...new Set(WORKS.map((w) => w.category))];
  let current = "Tümü", visible = WORKS;
  $("#portfolioFilters").innerHTML = cats.map((c, i) =>
    `<button role="tab" aria-selected="${i === 0}" class="filter${i === 0 ? " is-active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");

  function renderWorks() {
    visible = current === "Tümü" ? WORKS : WORKS.filter((w) => w.category === current);
    $("#portfolioGrid").innerHTML = visible.map((w, i) => `
      <button class="work" data-idx="${i}" aria-label="${esc(w.title)} görselini büyüt">
        <div class="work__media">${media(w)}</div>
        <div class="work__info"><strong>${esc(w.title)}</strong><span>${esc(w.place)} · ${esc(w.category)}</span></div>
      </button>`).join("");
  }
  renderWorks();

  $("#portfolioFilters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    current = b.dataset.cat;
    $$(".filter").forEach((f) => { f.classList.toggle("is-active", f === b); f.setAttribute("aria-selected", f === b); });
    renderWorks();
  });

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox");
  let lbIdx = 0, lastFocus = null;
  function showLb(i) {
    lbIdx = (i + visible.length) % visible.length;
    const w = visible[lbIdx];
    $("#lbMedia").innerHTML = media(w);
    $("#lbCaption").innerHTML = `<strong>${esc(w.title)}</strong> — ${esc(w.place)}`;
  }
  function openLb(i) { lastFocus = document.activeElement; showLb(i); lb.hidden = false; document.body.style.overflow = "hidden"; $("#lbClose").focus(); }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus(); }
  $("#portfolioGrid").addEventListener("click", (e) => {
    const w = e.target.closest(".work");
    if (w) openLb(+w.dataset.idx);
  });
  $("#lbClose").addEventListener("click", closeLb);
  $("#lbPrev").addEventListener("click", () => showLb(lbIdx - 1));
  $("#lbNext").addEventListener("click", () => showLb(lbIdx + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") showLb(lbIdx - 1);
    if (e.key === "ArrowRight") showLb(lbIdx + 1);
  });

  /* ---------- Teklif formu → WhatsApp ---------- */
  const chips = $("#modelChips");
  chips.innerHTML = MODELS.map((m) =>
    `<label class="chip"><input type="checkbox" name="models" value="${esc(m.name)}" data-id="${m.id}"><span>${esc(m.name)}</span></label>`).join("") +
    `<label class="chip"><input type="checkbox" name="models" value="Kararsızım, önerinizi isterim"><span>Kararsızım</span></label>`;

  document.addEventListener("click", (e) => {
    const p = e.target.closest("[data-pick]");
    if (!p) return;
    const box = chips.querySelector(`input[data-id="${p.dataset.pick}"]`);
    if (box) box.checked = true;
  });

  const form = $("#quoteForm"), err = $("#formError");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const name = (d.get("name") || "").trim();
    const phone = (d.get("phone") || "").trim();
    const models = d.getAll("models");
    const problems = [];
    if (!name) problems.push("ad soyad");
    if (phone.replace(/\D/g, "").length < 10) problems.push("geçerli bir telefon");
    if (!models.length) problems.push("en az bir model");
    if (problems.length) {
      err.textContent = `Lütfen ${problems.join(", ")} giriniz.`;
      err.hidden = false;
      return;
    }
    err.hidden = true;

    const w = d.get("width"), h = d.get("height");
    const lines = [
      `Merhaba, ${C.businessName} için fiyat teklifi almak istiyorum.\n`,
      `*Ad Soyad:* ${name}`,
      `*Telefon:* ${phone}`,
      d.get("district") && `*İlçe/Semt:* ${d.get("district").trim()}`,
      `*Mekân:* ${d.get("place")}`,
      `*Modeller:* ${models.join(", ")}`,
      d.get("windows") && `*Pencere sayısı:* ${d.get("windows")}`,
      (w || h) ? `*Ölçü:* ${w || "?"} x ${h || "?"} cm (G x Y)` : "*Ölçü:* Bilmiyorum, ölçü alınmasını istiyorum",
      d.get("note") && `*Not:* ${d.get("note").trim()}`,
      d.get("visit") && "✔ Ücretsiz keşif/ölçü talep ediyorum."
    ].filter(Boolean);

    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  });

  /* ---------- Header gölgesi ---------- */
  const header = $(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
