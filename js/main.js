(function () {
  'use strict';

  // ───── COUNTDOWN ─────
  var countdownInterval;

  function updateCountdown() {
    var target = new Date('2026-07-12T09:00:00+05:30').getTime();
    var now = new Date().getTime();
    var diff = target - now;

    var daysEl = document.getElementById('cd-days');
    var hrsEl = document.getElementById('cd-hrs');
    var minEl = document.getElementById('cd-min');
    var secEl = document.getElementById('cd-sec');

    if (!daysEl || !hrsEl || !minEl || !secEl) return;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hrsEl.textContent = '00';
      minEl.textContent = '00';
      secEl.textContent = '00';
      if (countdownInterval) clearInterval(countdownInterval);
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var sec = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hrsEl.textContent = String(hrs).padStart(2, '0');
    minEl.textContent = String(min).padStart(2, '0');
    secEl.textContent = String(sec).padStart(2, '0');
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);

  // ───── FAQ ACCORDION ─────
  function toggleFaq(el) {
    var item = el.closest('.faq-item');
    var isOpen = item.classList.contains('open');

    // Close all open items
    document.querySelectorAll('.faq-item.open').forEach(function (i) {
      i.classList.remove('open');
      var q = i.querySelector('.faq-q');
      if (q) q.setAttribute('aria-expanded', 'false');
    });

    // Toggle the clicked item
    if (!isOpen) {
      item.classList.add('open');
      el.setAttribute('aria-expanded', 'true');
    }
  }

  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      toggleFaq(this);
    });

    // Keyboard support: Enter and Space
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFaq(this);
      }
    });
  });

  // ───── REGISTER BUTTON ─────
  var registerBtn = document.getElementById('register-btn');
  if (registerBtn) {
    registerBtn.addEventListener('click', function (event) {
      var btn = event.currentTarget;
      btn.textContent = '[ PROCESSING... ]';
      btn.style.background = '#CC0000';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = '[ \u2713 SUBMITTED \u2014 CHECK YOUR EMAIL ]';
      }, 1200);
    });
  }

  // ───── HAMBURGER MENU ─────
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    if (hamburgerBtn) {
      hamburgerBtn.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    if (mobileMenu) mobileMenu.classList.remove('open');
  }

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', function () {
      hamburgerBtn.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      var isOpen = mobileMenu.classList.contains('open');
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when any link inside is clicked
    mobileMenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }
})();
