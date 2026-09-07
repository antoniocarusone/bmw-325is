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

/* ============================================================
   Current mileage. Single source of truth — the hero counter and
   the maintenance tracker both read it. Update it here.
   ============================================================ */
const ODOMETER = 200800;

/* ---------- maintenance tracker ---------- */
const fmt = (n) => n.toLocaleString("en-US");

function milesStatus(lastMi, everyMi) {
  const remaining = lastMi + everyMi - ODOMETER;
  if (remaining < 0) return { state: "overdue", label: "Overdue", sub: fmt(-remaining) + " mi past" };
  if (remaining <= everyMi * 0.1) return { state: "soon", label: "Due soon", sub: "in " + fmt(remaining) + " mi" };
  return { state: "ok", label: "In " + fmt(remaining) + " mi", sub: "due at " + fmt(lastMi + everyMi) };
}

function monthsStatus(lastOn, everyMonths) {
  const due = new Date(lastOn);
  due.setMonth(due.getMonth() + everyMonths);
  const days = Math.round((due - new Date()) / 86400000);
  if (days < 0) {
    const yrs = Math.floor(-days / 365);
    return { state: "overdue", label: "Overdue", sub: yrs >= 1 ? yrs + (yrs === 1 ? " year" : " years") + " past" : -days + " days past" };
  }
  if (days <= 60) return { state: "soon", label: "Due soon", sub: "in " + days + " days" };
  return { state: "ok", label: "In " + Math.round(days / 30) + " mo", sub: "due " + due.getFullYear() };
}

document.querySelectorAll(".maint").forEach((el) => {
  const d = el.dataset;
  const slot = el.querySelector(".maint__status");
  const sub = el.querySelector(".maint__sub");
  let r;

  if (d.lastMi && d.everyMi) {
    r = milesStatus(+d.lastMi, +d.everyMi);
  } else if (d.lastOn && d.everyMonths) {
    r = monthsStatus(d.lastOn, +d.everyMonths);
  } else {
    r = { state: "unknown", label: "No record", sub: null };
  }

  el.classList.add("maint--" + r.state);
  slot.textContent = r.label;

  /* Keep the authored "last done" line and append what the status is measured
     against, so the tile still reads correctly with JavaScript switched off. */
  if (r.sub) {
    const every = d.everyMi ? fmt(+d.everyMi) + " mi" : d.everyMonths / 12 + " yr";
    sub.textContent = sub.textContent + " · every " + every + " · " + r.sub;
  } else if (d.everyMonths) {
    sub.textContent = sub.textContent + " · every " + d.everyMonths / 12 + " yr";
  }
});

/* ---------- animated odometer on load ---------- */
const odo = document.querySelector(".odo");
if (odo && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const target = ODOMETER;
  const dur = 1100;
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = Math.round(eased * target);
    odo.textContent = val.toLocaleString("en-US");
    if (t < 1) requestAnimationFrame(tick);
    else odo.textContent = fmt(ODOMETER);
  }
  requestAnimationFrame(tick);
}
