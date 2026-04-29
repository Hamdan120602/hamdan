document.addEventListener("DOMContentLoaded", () => {

/* ================= ELEMENTS ================= */
const navbar = document.getElementById("navbar");
const loader = document.getElementById("loader");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const topBtn = document.createElement("button");

const counters = document.querySelectorAll(".counter");
const cards = document.querySelectorAll(".card");
const boxes = document.querySelectorAll(".box");
const stats = document.querySelectorAll(".stats div");

const bookingBox = document.querySelector(".booking-box");
const searchBtn = document.getElementById("searchBtn");

const city = document.getElementById("city");
const pickup = document.getElementById("pickup");
const ret = document.getElementById("return");


/* ================= LOADER (CINEMATIC ENTRY) ================= */
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transform = "scale(1.05)";
    setTimeout(() => loader.remove(), 600);
  }, 900);
});


/* ================= NAVBAR SCROLL EFFECT ================= */
window.addEventListener("scroll", () => {
  const y = window.scrollY;

  if (y > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");

  if (y > 400) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});


/* ================= BACK TO TOP ================= */
topBtn.innerHTML = "↑";
topBtn.className = "top-btn";
document.body.appendChild(topBtn);

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ================= MOBILE MENU ================= */
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
});


/* ================= SMOOTH SCROLL ================= */
document.querySelectorAll("a[href^='#']").forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      mobileMenu.classList.remove("show");
    }
  });
});


/* ================= COUNTER ANIMATION (APPLE STYLE) ================= */
const counterObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {
    if (entry.isIntersecting) {

      const el = entry.target;
      const target = +el.dataset.target;
      let count = 0;

      const step = target / 80;

      const timer = setInterval(() => {
        count += step;

        if (count >= target) {
          el.innerText = target;
          clearInterval(timer);
        } else {
          el.innerText = Math.floor(count);
        }

      }, 20);

    }
  });

}, { threshold: 0.6 });

counters.forEach(c => counterObserver.observe(c));


/* ================= SCROLL REVEAL (APPLE MOTION STYLE) ================= */
const revealObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });

}, { threshold: 0.15 });

[...cards, ...boxes, ...stats].forEach(el => {
  revealObserver.observe(el);
});


/* ================= MAGNETIC BUTTON EFFECT ================= */
document.querySelectorAll("button").forEach(btn => {

  btn.addEventListener("mousemove", (e) => {

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) / 8;
    const moveY = (y - rect.height / 2) / 8;

    btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.03)`;

  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0) scale(1)";
  });

});


/* ================= BOOKING LOGIC ================= */
if (searchBtn) {
  searchBtn.addEventListener("click", () => {

    if (!city.value || !pickup.value || !ret.value) {
      toast("⚠ Lengkapi data booking");
      return;
    }

    toast("🚗 Searching premium fleet...");

    bookingBox.style.transform = "scale(1.02)";
    setTimeout(() => {
      bookingBox.style.transform = "scale(1)";
    }, 400);

  });
}


/* ================= TOAST SYSTEM ================= */
function toast(msg) {

  const old = document.querySelector(".toast");
  if (old) old.remove();

  const el = document.createElement("div");
  el.className = "toast";
  el.innerText = msg;

  document.body.appendChild(el);

  setTimeout(() => el.classList.add("show"), 50);

  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 300);
  }, 2500);

}


/* ================= HERO PARALLAX (APPLE DEPTH) ================= */
window.addEventListener("mousemove", (e) => {

  const hero = document.querySelector(".hero");
  if (!hero) return;

  const x = (window.innerWidth / 2 - e.clientX) / 60;
  const y = (window.innerHeight / 2 - e.clientY) / 60;

  hero.style.transform = `translate(${x}px, ${y}px)`;

});


/* ================= ENTER CONSOLE BRAND ================= */
console.log(
  "%cLUXE RENT V7 MOTION ENGINE ACTIVE",
  "color:#f7c873;font-size:14px;font-weight:bold;"
);

});