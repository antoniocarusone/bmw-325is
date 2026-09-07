/* ============================================================
   KLAUS — interactions
   ============================================================ */

/* ------------------------------------------------------------------
   PHOTOS
   List your gallery images here, in the order you want them shown.
   Drop the files into the /images folder and use the exact filenames.
   - "span" controls the tile size in the grid:
       "hero" (big), "wide", "tall", or "" (standard).
   The first few are sized for a nice editorial layout — tweak freely.
------------------------------------------------------------------- */
const PHOTOS = [
  { src: "images/klaus-01.jpg", alt: "Front three-quarter, Alpine White",        span: "hero" },
  { src: "images/klaus-02.jpg", alt: "Driver-side profile",                      span: "tall" },
  { src: "images/klaus-03.jpg", alt: "Rear three-quarter",                       span: ""     },
  { src: "images/klaus-04.jpg", alt: "Rear three-quarter in autumn light",       span: ""     },
  { src: "images/klaus-05.jpg", alt: "Passenger-side profile",                   span: "wide" },
  { src: "images/klaus-06.jpg", alt: "Rear with MUNICH plate",                   span: ""     },
  { src: "images/klaus-07.jpg", alt: "BBS-style wheel with BMW roundel",         span: ""     },
  { src: "images/klaus-08.jpg", alt: "Kidney grille and quad headlights",        span: ""     },
  { src: "images/klaus-09.jpg", alt: "Factory sunroof and glass",                span: ""     },
  { src: "images/klaus-10.jpg", alt: "Driver's view — gauges and shifter",       span: "wide" },
  { src: "images/klaus-11.jpg", alt: "Front sport seats in black leather",       span: ""     },
  { src: "images/klaus-12.jpg", alt: "Rear bench in black leather",              span: ""     },
  { src: "images/klaus-13.jpg", alt: "Dashboard and center console",             span: ""     },
  { src: "images/klaus-14.jpg", alt: "Front seats from the passenger side",      span: ""     },
  { src: "images/klaus-15.jpg", alt: "Rear seating",                             span: ""     },
  { src: "images/klaus-16.jpg", alt: "Seat bolster patina (close-up)",           span: ""     },
  { src: "images/klaus-17.jpg", alt: "Seat leather detail",                      span: ""     },
  { src: "images/klaus-18.jpg", alt: "Center console and seat detail",           span: ""     },
  { src: "images/klaus-19.jpg", alt: "Panel gap and paint detail",               span: ""     },
  { src: "images/klaus-20.jpg", alt: "Clearcoat surface detail",                 span: ""     },
  { src: "images/klaus-21.jpg", alt: "Front valance and foglight detail",        span: ""     },
  { src: "images/klaus-22.jpg", alt: "Front three-quarter, pollen season",       span: ""     },
  { src: "images/klaus-23.jpg", alt: "Rear three-quarter, pollen season",        span: ""     },
  { src: "images/klaus-24.jpg", alt: "At home in the garage",                    span: ""     },
];

/* ---------- graceful fallback for any missing image ---------- */
window.__photoFallback = function (img) {
  const fig = img.closest(".photo, .gallery__cell, .hero__photo");
  if (!fig) return;
  fig.classList.add("photo--empty");
  const name = (img.getAttribute("src") || "").split("/").pop() || "photo";
  fig.setAttribute("data-label", "Add  " + name);
};

/* ---------- build the gallery ---------- */
const grid = document.getElementById("galleryGrid");
const spanClass = { hero: "gallery__cell--hero", wide: "gallery__cell--wide", tall: "gallery__cell--tall", "": "" };

PHOTOS.forEach((p, i) => {
  const cell = document.createElement("figure");
  cell.className = "gallery__cell " + (spanClass[p.span] || "");
  cell.dataset.index = i;
  cell.setAttribute("role", "button");
  cell.setAttribute("tabindex", "0");

  const idx = document.createElement("span");
  idx.className = "gallery__idx";
  idx.textContent = String(i + 1).padStart(2, "0");

  const img = document.createElement("img");
  img.src = p.src;
  img.alt = p.alt;
  img.loading = "lazy";
  img.addEventListener("error", () => window.__photoFallback(img));

  cell.append(idx, img);
  cell.addEventListener("click", () => openLightbox(i));
  cell.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(i); } });
  grid.appendChild(cell);
});

/* ---------- lightbox ---------- */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCount = document.getElementById("lbCount");
let current = 0;

function openLightbox(i) {
  const cell = grid.querySelector(`[data-index="${i}"]`);
  // skip missing images
  if (cell && cell.classList.contains("photo--empty")) return;
  current = i;
  render();
  lb.classList.add("is-open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lb.classList.remove("is-open");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function step(dir) {
  const n = PHOTOS.length;
  let tries = 0;
  do {
    current = (current + dir + n) % n;
    tries++;
    const cell = grid.querySelector(`[data-index="${current}"]`);
    if (!cell || !cell.classList.contains("photo--empty")) break;
  } while (tries < n);
  render();
}
function render() {
  lbImg.src = PHOTOS[current].src;
  lbImg.alt = PHOTOS[current].alt;
  lbCount.textContent = String(current + 1).padStart(2, "0") + " / " + String(PHOTOS.length).padStart(2, "0");
}

document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lbNext").addEventListener("click", () => step(1));
document.getElementById("lbPrev").addEventListener("click", () => step(-1));
lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") step(1);
  if (e.key === "ArrowLeft") step(-1);
});

/* ---------- spam-safe email reveal ----------
   The address is never written in the page source as plain text;
   it's assembled from data-* parts only when a human clicks. */
const revealBtn = document.getElementById("revealEmail");
if (revealBtn) {
  revealBtn.addEventListener("click", () => {
    const user = revealBtn.dataset.user;
    const domain = revealBtn.dataset.domain;
    const addr = user + "@" + domain;
    const subject = encodeURIComponent("Klaus — 1990 BMW 325is");
    const body = encodeURIComponent("Hi, I have a question about Klaus. ");
    const a = document.createElement("a");
    a.className = "contact__email";
    a.href = `mailto:${addr}?subject=${subject}&body=${body}`;
    a.textContent = addr;
    revealBtn.replaceWith(a);
    const hint = document.getElementById("emailHint");
    if (hint) hint.textContent = "Click the address to open your mail app.";
  });
}

/* ---------- scroll reveals ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- animated odometer on load ---------- */
const odo = document.querySelector(".odo");
if (odo && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const target = 200500;
  const dur = 1100;
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = Math.round(eased * target);
    odo.textContent = val.toLocaleString("en-US");
    if (t < 1) requestAnimationFrame(tick);
    else odo.textContent = "200,500";
  }
  requestAnimationFrame(tick);
}
