/* ============================================================
   KLAUS — interactions
   ============================================================ */

/* ---------- graceful fallback for any missing image ---------- */
window.__photoFallback = function (img) {
  const fig = img.closest(".photo, .hero__photo");
  if (!fig) return;
  fig.classList.add("photo--empty");
  const name = (img.getAttribute("src") || "").split("/").pop() || "photo";
  fig.setAttribute("data-label", "Add  " + name);
};

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
  const target = 200800;
  const dur = 1100;
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = Math.round(eased * target);
    odo.textContent = val.toLocaleString("en-US");
    if (t < 1) requestAnimationFrame(tick);
    else odo.textContent = "200,800";
  }
  requestAnimationFrame(tick);
}
