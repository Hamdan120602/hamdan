/* =====================================================
LUXE RENT — APPLE MOTION SYSTEM v6
CINEMATIC UI / SMOOTH INTERACTION / PERFORMANCE SAFE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

/* ================= ELEMENT ================= */
const loader = document.getElementById("loader");
const navbar = document.getElementById("navbar");
const topBtn = document.getElementById("topBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuBtn = document.getElementById("menuBtn");
const themeBtn = document.getElementById("themeBtn");
const bookNowBtn = document.getElementById("bookNowBtn");
const exploreBtn = document.getElementById("exploreBtn");
const offerBtn = document.getElementById("offerBtn");
const searchBtn = document.getElementById("searchBtn");

const cityInput = document.getElementById("cityInput");
const pickupDate = document.getElementById("pickupDate");
const returnDate = document.getElementById("returnDate");
const carType = document.getElementById("carType");
const bookingBox = document.getElementById("bookingBox");

const counters = document.querySelectorAll(".counter");
const cards = document.querySelectorAll(".car-card");
const serviceBoxes = document.querySelectorAll(".service-box");
const statBoxes = document.querySelectorAll(".stat-box");

const contactForm = document.getElementById("contactForm");


/* ================= CINEMATIC LOADER ================= */
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transform = "scale(1.05)";

    setTimeout(() => {
      loader.style.display = "none";
      toast("✨ Welcome to Luxe Rent Experience");
    }, 600);

  }, 900);
});


/* ================= NAVBAR SCROLL EFFECT ================= */
window.addEventListener("scroll", () => {

  const y = window.scrollY;

  if (y > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  if (y > 500) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }

});


/* ================= BACK TO TOP ================= */
topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* ================= MOBILE MENU ================= */
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
});


document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
  });
});


/* ================= SMOOTH SECTION NAV ================= */
function smoothScroll(id){
  document.querySelector(id).scrollIntoView({
    behavior:"smooth"
  });
}

if(exploreBtn){
  exploreBtn.addEventListener("click", ()=> smoothScroll("#fleet"));
}

if(bookNowBtn){
  bookNowBtn.addEventListener("click", ()=> smoothScroll("#home"));
}


/* ================= COUNTER ANIMATION (APPLE SOFT) ================= */
const counterObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      const el = entry.target;
      const target = +el.dataset.target;
      let count = 0;

      const step = target / 80;

      const timer = setInterval(() => {

        count += step;

        if(count >= target){
          el.innerText = target;
          clearInterval(timer);
        } else {
          el.innerText = Math.floor(count);
        }

      }, 20);

    }

  });

}, {threshold:0.6});

counters.forEach(c => counterObserver.observe(c));


/* ================= SCROLL REVEAL (APPLE STYLE) ================= */
const revealObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }

  });

},{threshold:0.15});

[...cards, ...serviceBoxes, ...statBoxes].forEach(el => {
  revealObserver.observe(el);
});


/* ================= MAGNETIC BUTTON EFFECT ================= */
document.querySelectorAll("button").forEach(btn => {

  btn.addEventListener("mousemove", (e) => {

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    btn.style.transform =
      `translate(${(x - rect.width/2)/10}px,
                 ${(y - rect.height/2)/10}px)`;

  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });

});


/* ================= SEARCH BOOKING LOGIC ================= */
if(searchBtn){

  searchBtn.addEventListener("click", () => {

    if(!cityInput.value){
      toast("⚠ Enter city first");
      return;
    }

    if(!pickupDate.value || !returnDate.value){
      toast("⚠ Select dates");
      return;
    }

    toast("🚗 Searching premium cars...");

    bookingBox.classList.add("active");

    setTimeout(() => {
      bookingBox.classList.remove("active");
      smoothScroll("#fleet");
    }, 900);

  });

}


/* ================= CONTACT FORM ================= */
if(contactForm){

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    toast("📨 Message sent successfully");
    contactForm.reset();
  });

}


/* ================= TOAST SYSTEM (APPLE CLEAN) ================= */
function toast(msg){

  const old = document.querySelector(".toast");
  if(old) old.remove();

  const box = document.createElement("div");
  box.className = "toast";
  box.innerText = msg;

  document.body.appendChild(box);

  setTimeout(() => box.classList.add("show"), 50);

  setTimeout(() => {
    box.classList.remove("show");
    setTimeout(() => box.remove(), 300);
  }, 2500);

}


/* ================= THEME SWITCH (SIMPLE SAFE) ================= */
if(themeBtn){

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    toast("🎨 Theme changed");
  });

}


/* ================= HERO PARALLAX (SOFT APPLE STYLE) ================= */
window.addEventListener("mousemove", (e) => {

  const hero = document.querySelector(".hero");
  if(!hero) return;

  const x = (window.innerWidth/2 - e.clientX) / 80;
  const y = (window.innerHeight/2 - e.clientY) / 80;

  hero.style.transform = `translate(${x}px, ${y}px)`;

});


/* ================= CONSOLE BRAND ================= */
console.log(
  "%cLUXE RENT APPLE MOTION SYSTEM",
  "color:#f7c873;font-size:16px;font-weight:bold;"
);

});