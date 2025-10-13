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
  });