AOS.init({
  duration: 900,
  once: true,
  offset: 80
});
// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('nav-blur', 'shadow-md');
  } else {
    navbar.classList.remove('nav-blur', 'shadow-md');
  }
});
// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('translate-x-full');
});
closeMenu.addEventListener('click', () => {
  mobileMenu.classList.add('translate-x-full');
});
// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      if (window.innerWidth < 768) {
        mobileMenu.classList.add('translate-x-full');
      }
    }
  });
});