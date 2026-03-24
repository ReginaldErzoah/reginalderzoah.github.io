// ===== Smooth scrolling for nav links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    // Adjust for sticky header height
    const headerOffset = 80; // match your header height
    const elementPosition = target.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });

    // Close mobile menu if open
    const mobileNav = document.querySelector('.nav-links');
    if (mobileNav.classList.contains('show')) {
      mobileNav.classList.remove('show');
    }
  });
});

// ===== Highlight active nav link on scroll =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

const observerOptions = {
  root: null,
  rootMargin: "-150px 0px -70% 0px", // tweak for earlier/later highlight
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

// ===== Hamburger Menu Toggle for Mobile =====
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.nav-links');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
  });
}
