// Dali Donuts — Main JS

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
  });
});

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(10,10,10,0.98)';
  } else {
    nav.style.background = 'rgba(10,10,10,0.92)';
  }
});

// Email signup handler
function handleEmailSignup(btn) {
  const input = btn.previousElementSibling;
  const email = input.value.trim();
  if (!email || !email.includes('@')) {
    input.style.borderColor = '#FF6600';
    input.placeholder = 'Enter a valid email';
    setTimeout(() => {
      input.style.borderColor = '';
      input.placeholder = 'your@email.com';
    }, 2000);
    return;
  }
  // In production this would POST to a mailing list API
  btn.textContent = 'You\'re on the list!';
  btn.style.background = '#8FCC00';
  btn.disabled = true;
  input.value = '';
  input.placeholder = 'See you soon!';
  input.disabled = true;
}

// Animate sections on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.menu-item, .menu-item-sm, .combo-card, .zone, .ice-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
