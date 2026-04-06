/* microinteractions.js — dalidonuts
   Progressive enhancement. Respects prefers-reduced-motion.
*/
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── 1. MAGNETIC BUTTONS ──────────────────────────────────────────
  function initMagneticButtons() {
    if (reduced) return;
    document.querySelectorAll('.btn-primary, .btn-ghost, .btn-ghost-dark, .nav-cta').forEach(btn => {
      btn.style.transition = 'transform 0.18s cubic-bezier(0.23,1,0.32,1), background 0.2s';
      btn.style.willChange = 'transform';

      btn.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width  / 2)) / rect.width;
        const dy = (e.clientY - (rect.top  + rect.height / 2)) / rect.height;
        this.style.transform = `translate(${dx * 7}px, ${dy * 5}px) translateY(-1px)`;
      });

      btn.addEventListener('mouseleave', function () {
        this.style.transform = '';
      });

      btn.addEventListener('mousedown', function () {
        this.style.transform = 'scale(0.95)';
      });

      btn.addEventListener('mouseup', function () {
        this.style.transform = '';
      });
    });
  }

  // ── 2. CARD TILT ─────────────────────────────────────────────────
  function initCardTilt() {
    if (reduced) return;
    document.querySelectorAll('.menu-item, .menu-item-sm, .combo-card, .zone').forEach(card => {
      card.style.transition = 'transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s';
      card.style.willChange = 'transform';
      card.style.transformStyle = 'preserve-3d';

      card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        const rotX = -(y * 7);
        const rotY =   x * 7;
        this.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`;
        this.style.boxShadow = `${-rotY * 2}px ${rotX * 2 + 10}px 36px rgba(0,0,0,0.2)`;
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
  }

  // ── 3. NAV LINK UNDERLINES ───────────────────────────────────────
  function initNavUnderlines() {
    if (reduced) return;
    document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
      link.style.position = 'relative';

      const line = document.createElement('span');
      line.style.cssText = [
        'position:absolute',
        'bottom:-3px',
        'left:0',
        'width:100%',
        'height:2px',
        'background:var(--green)',
        'border-radius:1px',
        'transform:scaleX(0)',
        'transform-origin:right center',
        'transition:transform 0.22s cubic-bezier(0.23,1,0.32,1)',
        'pointer-events:none',
      ].join(';');
      link.appendChild(line);

      link.addEventListener('mouseenter', () => {
        line.style.transformOrigin = 'left center';
        line.style.transform = 'scaleX(1)';
      });
      link.addEventListener('mouseleave', () => {
        line.style.transformOrigin = 'right center';
        line.style.transform = 'scaleX(0)';
      });
    });
  }

  // ── 4. SCROLL ENTRANCE ───────────────────────────────────────────
  function initScrollEntrance() {
    if (reduced) return;
    const targets = document.querySelectorAll(
      '.menu-item, .menu-item-sm, .combo-card, .zone, ' +
      '.experience-text h2, .location-info h2, ' +
      '.section-label, .order-text h2'
    );

    targets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.45s ease ${(i % 4) * 0.06}s, transform 0.45s ease ${(i % 4) * 0.06}s`;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    targets.forEach(el => observer.observe(el));
  }

  // ── 5. TICKER PAUSE ON HOVER ─────────────────────────────────────
  function initTickerPause() {
    const ticker = document.querySelector('.ticker');
    if (!ticker) return;
    ticker.addEventListener('mouseenter', () => {
      ticker.style.animationPlayState = 'paused';
    });
    ticker.addEventListener('mouseleave', () => {
      ticker.style.animationPlayState = 'running';
    });
  }

  // ── 6. BUTTON RIPPLE ─────────────────────────────────────────────
  function initButtonRipple() {
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.style.overflow = 'hidden';
      btn.style.position = 'relative';

      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top  - size / 2;

        const ripple = document.createElement('span');
        ripple.style.cssText = [
          `position:absolute`,
          `width:${size}px`,
          `height:${size}px`,
          `left:${x}px`,
          `top:${y}px`,
          `background:rgba(255,255,255,0.18)`,
          `border-radius:50%`,
          `transform:scale(0)`,
          `animation:dd-ripple 0.55s ease-out forwards`,
          `pointer-events:none`,
        ].join(';');

        if (!document.getElementById('dd-ripple-style')) {
          const s = document.createElement('style');
          s.id = 'dd-ripple-style';
          s.textContent = '@keyframes dd-ripple { to { transform: scale(1); opacity: 0; } }';
          document.head.appendChild(s);
        }

        this.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  }

  // ── 7. CONTACT PILL BOUNCE ───────────────────────────────────────
  function initContactPills() {
    if (reduced) return;
    document.querySelectorAll('.contact-pill').forEach((pill, i) => {
      pill.style.transition = 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1), background 0.2s';
      pill.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px) scale(1.03)';
      });
      pill.addEventListener('mouseleave', function () {
        this.style.transform = '';
      });
    });
  }

  // ── 8. ZONE ICON SPIN ────────────────────────────────────────────
  function initZoneIcons() {
    if (reduced) return;
    document.querySelectorAll('.zone').forEach(zone => {
      const icon = zone.querySelector('.zone-icon');
      if (!icon) return;
      icon.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)';
      zone.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.25) rotate(-8deg)';
      });
      zone.addEventListener('mouseleave', () => {
        icon.style.transform = '';
      });
    });
  }

  // ── INIT ─────────────────────────────────────────────────────────
  function init() {
    initMagneticButtons();
    initCardTilt();
    initNavUnderlines();
    initScrollEntrance();
    initTickerPause();
    initButtonRipple();
    initContactPills();
    initZoneIcons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
