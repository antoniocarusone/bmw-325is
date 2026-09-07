/* ============================================================
   DIETER — interactions
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

/* ---------- maintenance tracker ----------
   Every item can carry a mileage limit and a time limit. BMW quotes these as
   "whichever comes first", so both are measured and the more urgent one is shown.
   Urgency is compared as the fraction of the interval still left, which puts
   miles and months on one scale. */
const fmt = (n) => n.toLocaleString("en-US");

function byMiles(lastMi, everyMi) {
  const left = lastMi + everyMi - ODOMETER;
  return {
    frac: left / everyMi,
    over: left < 0,
    past: fmt(-left) + " mi past",
    ahead: "In " + fmt(left) + " mi",
    soon: "in " + fmt(left) + " mi",
  };
}

function byMonths(lastOn, everyMonths) {
  const due = new Date(lastOn + "T00:00:00");
  due.setMonth(due.getMonth() + everyMonths);
  const days = Math.round((due - new Date()) / 86400000);
  const years = Math.floor(-days / 365);
  const months = Math.round(-days / 30);
  return {
    frac: days / (everyMonths * 30.44),
    over: days < 0,
    past: years >= 1 ? years + (years === 1 ? " yr past" : " yrs past")
                     : months + " mo past",
    ahead: "In " + Math.round(days / 30) + " mo",
    soon: "in " + days + " days",
  };
}

document.querySelectorAll(".maint").forEach((el) => {
  const d = el.dataset;
  const limits = [];
  if (d.lastMi && d.everyMi) limits.push(byMiles(+d.lastMi, +d.everyMi));
  if (d.lastOn && d.everyMonths) limits.push(byMonths(d.lastOn, +d.everyMonths));

  /* Spell out the interval either way, so an item with no history still says
     what it will be measured against once a date goes in. */
  const every = [
    d.everyMi ? fmt(+d.everyMi) + " mi" : null,
    d.everyMonths ? (d.everyMonths % 12 ? d.everyMonths + " mo" : d.everyMonths / 12 + " yr") : null,
  ].filter(Boolean).join(" / ");

  const sub = el.querySelector(".maint__sub");
  const slot = el.querySelector(".maint__status");

  /* A top-up is not a service — it corrects the level without renewing the fluid,
     so it is worth recording but must not reset the interval. */
  const topped = d.toppedOn
    ? " · topped up " + new Date(d.toppedOn + "T00:00:00")
        .toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "";

  if (!limits.length) {
    el.classList.add("maint--unknown");
    slot.textContent = "No record";
    sub.textContent = sub.textContent + " · every " + every + topped;
    return;
  }

  /* Lowest fraction remaining is the binding limit. */
  const worst = limits.reduce((a, b) => (b.frac < a.frac ? b : a));
  let state, label, detail;
  if (worst.over)            { state = "overdue"; label = "Overdue";  detail = worst.past; }
  else if (worst.frac <= 0.1){ state = "soon";    label = "Due soon"; detail = worst.soon; }
  else                       { state = "ok";      label = worst.ahead; detail = null; }

  /* An item can have a limit that is not actually being measured — a time interval
     with no known date, say. Say so rather than showing a confident status that
     only covers half the rule. */
  const unchecked = [
    d.everyMi && !d.lastMi ? "mileage" : null,
    d.everyMonths && !d.lastOn ? "date" : null,
  ].filter(Boolean);

  el.classList.add("maint--" + state);
  slot.textContent = label;
  sub.textContent = sub.textContent + " · every " + every
    + (detail ? " · " + detail : "")
    + (unchecked.length ? " · " + unchecked.join(" & ") + " unknown" : "")
    + topped;
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
