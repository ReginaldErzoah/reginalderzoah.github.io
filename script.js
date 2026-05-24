const root = document.documentElement;

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const bottomNav = document.querySelector(".bottom-nav");
const bottomLinks = document.querySelectorAll(".bottom-nav a");

const sections = document.querySelectorAll("section[id]");
const reveals = document.querySelectorAll(".reveal");

const viewToggleButtons = document.querySelectorAll(".view-toggle-btn");

const portrait = document.querySelector(".portrait");
const contactScene = document.getElementById("contactScene");

const magneticButtons = document.querySelectorAll(
  ".project-button, .social-row a"
);

/* ================================
   THEME TOGGLE
================================ */

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);

  if (themeIcon) {
    themeIcon.textContent = savedTheme === "dark" ? "☾" : "☀";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (themeIcon) {
      themeIcon.textContent = nextTheme === "dark" ? "☾" : "☀";
    }
  });
}

/* ================================
   LAYOUT VIEW SWITCHER
================================ */

viewToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedView = button.dataset.view;
    const targetLayoutId = button.dataset.target;
    const targetLayout = document.getElementById(targetLayoutId);

    if (!targetLayout) return;

    targetLayout.style.opacity = "0";

    setTimeout(() => {
      targetLayout.classList.remove(
        "list-view",
        "grid-view",
        "presentation-view"
      );

      targetLayout.classList.add(`${selectedView}-view`);

      targetLayout.style.opacity = "1";
    }, 160);

    const parentToggle = button.closest(".layout-toggle");

    if (parentToggle) {
      parentToggle.querySelectorAll(".view-toggle-btn").forEach((item) => {
        item.classList.remove("active");
      });
    }

    button.classList.add("active");
  });
});

/* ================================
   MAGNETIC BUTTONS
================================ */

magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

/* ================================
   STAGGERED SCROLL REVEAL
================================ */

reveals.forEach((item, index) => {
  const delay = Math.min(index * 45, 240);
  item.style.setProperty("--delay", `${delay}ms`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -60px 0px",
  }
);

reveals.forEach((item) => revealObserver.observe(item));

/* ================================
   CONTACT SCENE INTERACTION
================================ */

if (contactScene) {
  const contactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          contactScene.classList.add("contact-awake");
          contactScene.classList.remove("contact-sleeping");
        } else {
          contactScene.classList.remove("contact-awake");
          contactScene.classList.add("contact-sleeping");
        }
      });
    },
    {
      threshold: 0.45,
    }
  );

  contactObserver.observe(contactScene);
}

/* ================================
   SCROLL INTERACTION
================================ */

let ticking = false;

function handleScrollEffects() {
  const scrollY = window.scrollY;

  if (bottomNav) {
    const isArticlePage = document.body.classList.contains("articles-page-body");

    bottomNav.classList.toggle("is-visible", isArticlePage || scrollY > 420);
  }

  if (portrait) {
    portrait.style.transform = `translateY(${scrollY * 0.045}px)`;
  }

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 160;

    if (scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  bottomLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || !href.startsWith("#")) {
      link.classList.remove("active");
      return;
    }

    link.classList.toggle("active", href === `#${currentSection}`);
  });

  document.body.style.setProperty("--scroll", scrollY);

  ticking = false;
}

/* ================================
   AUTO FOOTER YEAR
================================ */

const footerYear = document.getElementById("footerYear");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(handleScrollEffects);
    ticking = true;
  }
});

if (bottomNav || portrait || sections.length > 0) {
  handleScrollEffects();
}