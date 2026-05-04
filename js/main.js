// SM TECH — UI Interactions
(function () {
  'use strict';

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', menu.classList.contains('open'));
    });
  }

  // Mobile submenu expand on tap
  document.querySelectorAll('.nav-item.has-sub > .nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const item = link.parentElement;
        item.classList.toggle('open');
      }
    });
  });

  // IntersectionObserver reveal
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Counter animation for .stats .num[data-target]
  const counters = document.querySelectorAll('.stat .num[data-target]');
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const duration = 1600;
        const start = performance.now();
        function tick(now) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          current = target * eased;
          el.textContent = (target % 1 === 0 ? Math.floor(current) : current.toFixed(1)) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => counterIO.observe(c));

  // Live clock in hero-meta if present
  const clock = document.querySelector('[data-clock]');
  if (clock) {
    const fmt = () => {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };
    clock.textContent = fmt();
    setInterval(() => { clock.textContent = fmt(); }, 1000);
  }

  // Close mobile menu on nav link click (sub link)
  document.querySelectorAll('.submenu a').forEach((a) => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 768 && menu) menu.classList.remove('open');
    });
  });

  // Year in footer
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // Parts Slider — auto-flow + prev/next buttons (infinite loop via cloned items)
  document.querySelectorAll('.parts-slider').forEach((slider) => {
    const track = slider.querySelector('.ps-track');
    const prev = slider.querySelector('.ps-nav.prev');
    const next = slider.querySelector('.ps-nav.next');
    if (!track) return;

    // Clone items so the strip can scroll seamlessly forever
    const originalItems = Array.from(track.children);
    if (originalItems.length === 0) return;
    originalItems.forEach((node) => {
      const clone = node.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    const SPEED = 0.6;            // pixels per animation frame (slow continuous flow)
    const RESUME_DELAY = 2500;    // ms to wait after user interaction before resuming
    let paused = false;
    let userInteractTimer = null;
    let rafId = null;

    const halfWidth = () => Math.max(1, track.scrollWidth / 2);

    const tick = () => {
      if (!paused) {
        track.scrollLeft += SPEED;
        // Seamless loop: when we pass the original block, jump back by its width
        if (track.scrollLeft >= halfWidth()) {
          track.scrollLeft -= halfWidth();
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const pauseAuto = () => { paused = true; };
    const resumeAuto = () => { paused = false; };

    // Pause on hover / focus
    slider.addEventListener('mouseenter', pauseAuto);
    slider.addEventListener('mouseleave', resumeAuto);
    slider.addEventListener('focusin', pauseAuto);
    slider.addEventListener('focusout', resumeAuto);
    track.addEventListener('touchstart', pauseAuto, { passive: true });
    track.addEventListener('touchend', () => {
      clearTimeout(userInteractTimer);
      userInteractTimer = setTimeout(resumeAuto, RESUME_DELAY);
    }, { passive: true });

    // Manual prev / next
    const scrollByPage = (dir) => {
      pauseAuto();
      clearTimeout(userInteractTimer);
      const item = track.querySelector('.ps-item');
      const step = item ? item.getBoundingClientRect().width + 16 : 240;
      const visible = Math.max(1, Math.floor(track.clientWidth / step));
      const targetLeft = track.scrollLeft + dir * step * visible;
      // Allow normal scrollLeft for prev (negative values handled by loop)
      if (targetLeft < 0) {
        track.scrollLeft = halfWidth() + targetLeft;
      } else {
        track.scrollTo({ left: targetLeft, behavior: 'smooth' });
      }
      userInteractTimer = setTimeout(resumeAuto, RESUME_DELAY);
    };

    if (prev) prev.addEventListener('click', () => scrollByPage(-1));
    if (next) next.addEventListener('click', () => scrollByPage(1));

    // Pause when the slider isn't visible (saves CPU)
    const visibilityIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!rafId) rafId = requestAnimationFrame(tick);
        } else {
          if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        }
      });
    }, { threshold: 0 });
    visibilityIO.observe(slider);
  });
})();
