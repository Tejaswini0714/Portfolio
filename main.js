const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  navbar.classList.toggle('active');
};

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {

  sections.forEach(sec => {

    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height){

      navLinks.forEach(link => {
        link.classList.remove('active');

        document
        .querySelector('.navbar a[href*=' + id + ']')
        .classList.add('active');
      });
    }
  });

  navbar.classList.remove('active');
};

/* TYPING TEXT */

var typed = new Typed(".multiple-text", {
  strings: ["Web Developer", "AI/ML Enthusiast", "Software developer",
"Python Developer",
,"Full Stack Developer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});