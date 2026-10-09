/* =========================================================
   ELEMENTS
========================================================= */

const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const header = document.querySelector(".header");

const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");

const currentYear = document.querySelector("#current-year");


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (menuIcon && navbar) {

  const toggleMenu = () => {

    navbar.classList.toggle("active");

    const isOpen = navbar.classList.contains("active");

    menuIcon.classList.toggle("fa-bars", !isOpen);
    menuIcon.classList.toggle("fa-xmark", isOpen);

    menuIcon.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuIcon.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation menu"
        : "Open navigation menu"
    );
  };


  menuIcon.addEventListener("click", toggleMenu);


  menuIcon.addEventListener("keydown", (event) => {

    if (event.key === "Enter" || event.key === " ") {

      event.preventDefault();
      toggleMenu();

    }

  });

}


/* =========================================================
   NAVIGATION SCROLL
   Fixes section alignment below fixed header
========================================================= */

navLinks.forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) {
      return;
    }

    const targetSection = document.querySelector(targetId);

    if (!targetSection) {
      return;
    }

    event.preventDefault();

    const headerHeight = header
      ? header.offsetHeight
      : 82;

    const targetPosition =
      targetSection.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });


    if (navbar) {
      navbar.classList.remove("active");
    }

    if (menuIcon) {

      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");

      menuIcon.setAttribute(
        "aria-expanded",
        "false"
      );

      menuIcon.setAttribute(
        "aria-label",
        "Open navigation menu"
      );

    }

  });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {

  const headerHeight = header
    ? header.offsetHeight
    : 82;

  const scrollPosition =
    window.scrollY + headerHeight + 40;


  sections.forEach((section) => {

    const sectionTop = section.offsetTop;

    const sectionBottom =
      sectionTop + section.offsetHeight;

    const sectionId =
      section.getAttribute("id");


    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionBottom
    ) {

      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(
        `.navbar a[href="#${sectionId}"]`
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }

    }

  });

}


window.addEventListener(
  "scroll",
  updateActiveNavigation
);

window.addEventListener(
  "load",
  updateActiveNavigation
);


/* =========================================================
   TYPING EFFECT
========================================================= */

if (
  typeof Typed !== "undefined" &&
  document.querySelector(".multiple-text")
) {

  new Typed(".multiple-text", {

    strings: [
      "Software Engineer",
      "Python Developer",
      "AI/ML Developer",
      "Full-Stack Developer",
  
    ],

    typeSpeed: 65,
    backSpeed: 45,
    backDelay: 1100,
    startDelay: 300,

    loop: true,

    showCursor: true,
    cursorChar: "|"

  });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
  ".education-box, .skill-category, .internship-box, .project-box, .certification-box, .about-card, .contact-card"
);


revealElements.forEach((element) => {
  element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(

  (entries, observer) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.12
  }

);


revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
