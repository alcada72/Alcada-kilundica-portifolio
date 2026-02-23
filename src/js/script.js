// Custom cursor
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});
(function animCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animCursor);
})();
document
  .querySelectorAll("a,button,.skill-card,.project-card,.service-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(2)";
      ring.style.width = "52px";
      ring.style.height = "52px";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1)";
      ring.style.width = "36px";
      ring.style.height = "36px";
    });
  });

// Navbar scroll
window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 40);
});

// Mobile nav
document
  .getElementById("hamburger")
  .addEventListener("click", () =>
    document.getElementById("mobileNav").classList.add("open"),
  );
document
  .getElementById("mobileClose")
  .addEventListener("click", () =>
    document.getElementById("mobileNav").classList.remove("open"),
  );
document
  .querySelectorAll(".mobile-link")
  .forEach((l) =>
    l.addEventListener("click", () =>
      document.getElementById("mobileNav").classList.remove("open"),
    ),
  );

// Scroll reveal
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

// Skill bars
const barObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const bar = e.target.querySelector(".skill-bar");
        if (bar) {
          bar.style.width = bar.dataset.w + "%";
          barObs.unobserve(e.target);
        }
      }
    });
  },
  { threshold: 0.3 },
);
document.querySelectorAll(".skill-card").forEach((el) => barObs.observe(el));

// Counter animation
function animCount(el, target) {
  let cur = 0,
    step = Math.ceil(target / 40);
  const t = setInterval(() => {
    cur += step;
    if (cur >= target) {
      cur = target;
      clearInterval(t);
    }
    el.textContent = cur + "+";
  }, 40);
}
const cObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target
          .querySelectorAll("[data-count]")
          .forEach((el) => animCount(el, +el.dataset.count));
        cObs.disconnect();
      }
    });
  },
  { threshold: 0.5 },
);
cObs.observe(document.getElementById("hero"));

// Skills tabs
document.querySelectorAll(".skills-tab").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".skills-tab")
      .forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
    const f = this.dataset.filter;
    document.querySelectorAll(".skill-card").forEach((card) => {
      card.style.display = f === "all" || card.dataset.cat === f ? "" : "none";
    });
  });
});

// Form submit
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const btn = document.getElementById("formBtn");
  btn.textContent = "✓ Mensagem enviada!";
  btn.style.background = "#4ADE80";
  btn.style.color = "#000";
  setTimeout(() => {
    btn.innerHTML = "Enviar Mensagem &rarr;";
    btn.style.background = "";
    btn.style.color = "";
    this.reset();
  }, 3000);
});
