// ===== Smooth scrolling for nav links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    const headerOffset = 70; // adjust based on header height
    const elementPosition = target.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
});

// ===== Highlight active nav link on scroll =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

const observerOptions = {
  root: null,
  rootMargin: "-150px 0px -70% 0px", 
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// ===== Theme Toggle with Persistence + System Preference =====
const themeToggle = document.getElementById("theme-toggle");

// Detect saved theme or system preference
const savedTheme = localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

if (savedTheme === "light" || (!savedTheme && prefersLight)) {
  document.body.classList.add("light-theme");
  themeToggle.checked = true; // toggle ON
} else {
  document.body.classList.remove("light-theme");
  themeToggle.checked = false; // toggle OFF
}

// Listen for toggle changes
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.add("light-theme");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light-theme");
    localStorage.setItem("theme", "dark");
  }
});

// ===== Hamburger Menu Toggle for Mobile =====
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
});
