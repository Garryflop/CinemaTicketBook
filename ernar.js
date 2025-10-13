  document.addEventListener('DOMContentLoaded', () => {
    const appContent = document.getElementById('appContent');
    const gateModalEl = document.getElementById('entryGateModal');
    const gateModal = new bootstrap.Modal(gateModalEl, { backdrop: 'static', keyboard: false });

    // Show only on first visit (persist in localStorage)
    const alreadyOk = localStorage.getItem('ac_gate_ok');
    if (!alreadyOk) {
      appContent.classList.add('gate-blur');
      gateModal.show();
    }

    // Remove blur when modal fully hides
    gateModalEl.addEventListener('hidden.bs.modal', () => {
      appContent.classList.remove('gate-blur');
    });

    // Utility: Email check
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

    // ===== Sign Up Validation =====
    const signupForm = document.getElementById('gateSignupForm');
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('gateFullName');
      const email    = document.getElementById('gateEmail');
      const pw       = document.getElementById('gatePassword');
      const confirm  = document.getElementById('gateConfirm');
      const terms    = document.getElementById('gateTerms');

      [fullName, email, pw, confirm, terms].forEach(el => el.classList.remove('is-invalid'));

      let ok = true;
      if (!fullName.value.trim()) { fullName.classList.add('is-invalid'); ok = false; }
      if (!isValidEmail(email.value.trim())) { email.classList.add('is-invalid'); ok = false; }
      if (pw.value.length < 6) { pw.classList.add('is-invalid'); ok = false; }
      if (confirm.value !== pw.value || !confirm.value) { confirm.classList.add('is-invalid'); ok = false; }
      if (!terms.checked) { terms.classList.add('is-invalid'); ok = false; }

      if (ok) {
        // persist gate pass
        localStorage.setItem('ac_gate_ok', '1');
        gateModal.hide();
        signupForm.reset();
        alert('✅ Account created (demo). Welcome!');
      }
    });

    // ===== Sign In Validation =====
    const signinForm = document.getElementById('gateSigninForm');
    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('gateLoginEmail');
      const pass  = document.getElementById('gateLoginPassword');
      [email, pass].forEach(el => el.classList.remove('is-invalid'));

      let ok = true;
      if (!isValidEmail(email.value.trim())) { email.classList.add('is-invalid'); ok = false; }
      if (!pass.value) { pass.classList.add('is-invalid'); ok = false; }

      if (ok) {
        localStorage.setItem('ac_gate_ok', '1');
        gateModal.hide();
        signinForm.reset();
        alert('✅ Signed in (demo).');
      }
    });

    // ===== Continue as Guest =====
    const guest1 = document.getElementById('continueGuestBtn');
    const guest2 = document.getElementById('continueGuestBtn2');
    [guest1, guest2].forEach(btn => btn?.addEventListener('click', () => {
      localStorage.setItem('ac_gate_ok', '1');
      gateModal.hide();
    }));
    // ===== Manual Sign In / Sign Up buttons at top =====
    document.querySelectorAll('[data-bs-target="#entryGateModal"]').forEach(btn => {
      btn.addEventListener('click', e => {
        const targetTab = btn.getAttribute('data-bs-tab');
        const tabEl = document.querySelector(`[data-bs-target="#${targetTab}"]`);
        if (tabEl) {
          new bootstrap.Tab(tabEl).show();
        }
      });
    });
    // ===== Task 2: Accordion for FAQs =====
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      item.addEventListener('click', () => {
          // close all other items (optional)
        faqItems.forEach(i => { 
          if (i !== item) i.classList.remove('active');
      });

          // toggle the clicked one
        item.classList.toggle('active');
      });
    });
    // ===== Task 3: Popup Subscription / Contact =====
  // helpers
  const openModal = (modalEl) => {
    modalEl.classList.add('show');
    document.body.style.overflow = 'hidden';  // prevent background scroll
  };
  const closeModal = (modalEl) => {
    modalEl.classList.remove('show');
    document.body.style.overflow = '';
  };

  // elements
  const modalSubscribe = document.getElementById('modalSubscribe');
  const modalContact   = document.getElementById('modalContact');
  const openSubscribe  = document.getElementById('openSubscribe');
  const openContact    = document.getElementById('openContact');

  // open handlers
  openSubscribe?.addEventListener('click', () => openModal(modalSubscribe));
  openContact?.addEventListener('click',   () => openModal(modalContact));

  // close buttons (× and Cancel)
  document.querySelectorAll('.popup-close, .popup-cancel').forEach(btn => {
    btn.addEventListener('click', () => {
      [modalSubscribe, modalContact].forEach(m => closeModal(m));
    });
  });

  // click outside to close
  [modalSubscribe, modalContact].forEach(modalEl => {
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) closeModal(modalEl);
    });
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [modalSubscribe, modalContact].forEach(m => closeModal(m));
    }
  });

  // -- simple validation for Subscribe form
    const subscribeForm = document.getElementById('subscribeForm');
    subscribeForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('subEmail');
      email.classList.remove('is-invalid');
      if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
        email.classList.add('is-invalid');
        return;
      }
      alert('✅ Subscribed successfully!');
      subscribeForm.reset();
      closeModal(modalSubscribe);
    });

    // -- simple validation for Contact form
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', (e) => {
      e.preventDefault();

      const name  = document.getElementById('contactName');
      const email = document.getElementById('contactEmail');
      const msg   = document.getElementById('contactMsg');

      [name, email, msg].forEach(el => el.classList.remove('is-invalid'));

      let ok = true;
      if (!name.value.trim())  { name.classList.add('is-invalid'); ok = false; }
      if (!/^\S+@\S+\.\S+$/.test(email.value)) { email.classList.add('is-invalid'); ok = false; }
      if (!msg.value.trim())   { msg.classList.add('is-invalid'); ok = false; }

      if (!ok) return;

      alert('📨 Your message has been sent. Thank you!');
      contactForm.reset();
      closeModal(modalContact);
    });
    
    const btn = document.getElementById("themeSwitcher");
    const saved = localStorage.getItem("theme") || "default";

    if (saved !== "default") document.body.classList.add(saved);

    btn.addEventListener("click", () => {
      if (document.body.classList.contains("neon-theme")) {
        document.body.classList.remove("neon-theme");
        document.body.classList.add("light-theme");
        localStorage.setItem("theme", "light-theme");
      } else if (document.body.classList.contains("light-theme")) {
        document.body.classList.remove("light-theme");
        localStorage.setItem("theme", "default");
      } else {
        document.body.classList.add("neon-theme");
        localStorage.setItem("theme", "neon-theme");
      }
    });
});
