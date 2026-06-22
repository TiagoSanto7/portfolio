// Portfolio — Tiago Santo

(function () {
  'use strict';

  // === ACTIVE NAV ON SCROLL ===
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  // === MOBILE MENU ===
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  function openMenu() {
    sidebar.classList.add('sidebar--open');
    overlay.classList.add('overlay--visible');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    sidebar.classList.remove('sidebar--open');
    overlay.classList.remove('overlay--visible');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = sidebar.classList.contains('sidebar--open');
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  // Fechar menu ao clicar em link de navegação (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) closeMenu();
    });
  });

  // === CONTACT FORM ===
  const form = document.getElementById('contato-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('form-submit');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const mensagem = form.mensagem.value.trim();

      if (!nome || !email || !mensagem) {
        feedback.style.color = '#ef4444';
        feedback.textContent = 'Preencha todos os campos.';
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        feedback.style.color = '#ef4444';
        feedback.textContent = 'Email inválido.';
        return;
      }

      // Fallback: abre cliente de email com os dados preenchidos
      const subject = encodeURIComponent(`Contato via portfólio — ${nome}`);
      const body = encodeURIComponent(`Nome: ${nome}\nEmail: ${email}\n\n${mensagem}`);
      window.location.href = `mailto:tiagoalvessoares17@gmail.com?subject=${subject}&body=${body}`;

      feedback.style.color = '#22c55e';
      feedback.textContent = 'Mensagem enviada! Obrigado pelo contato.';
      submitBtn.disabled = true;
      setTimeout(() => { form.reset(); feedback.textContent = ''; submitBtn.disabled = false; }, 4000);
    });
  }
})();
