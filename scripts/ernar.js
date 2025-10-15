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
    const seatPrice = 2000;
      const seatRows = ['A','B','C','D','E','F'];
      const seatCols = 12;
      const modalEl = document.getElementById('bookTicketModal');
      const modal = new bootstrap.Modal(modalEl);
      let selectedMovie = '';
      let selectedSeats = new Set();

      const elMovie = document.getElementById('modalMovieName');
      const elCinema = document.getElementById('modalCinema');
      const elDate = document.getElementById('modalDate');
      const elTime = document.getElementById('modalTime');
      const seatMap = document.getElementById('seatMap');
      const selSeatsText = document.getElementById('selectedSeatsText');
      const totalPrice = document.getElementById('totalPrice');

      const sumMovie = document.getElementById('sumMovie');
      const sumCinema = document.getElementById('sumCinema');
      const sumDateTime = document.getElementById('sumDateTime');
      const sumSeats = document.getElementById('sumSeats');
      const sumTotal = document.getElementById('sumTotal');

      // Open modal with movie name
      document.querySelectorAll('.book-open').forEach(btn => {
        btn.addEventListener('click', () => {
          selectedMovie = btn.dataset.movie || '—';
          elMovie.value = selectedMovie;
          selectedSeats.clear();
          updateSeatSummary();
          buildSeatMap();
          // Default date today
          elDate.value = new Date().toISOString().split('T')[0];
          // Go to step 1
          new bootstrap.Tab(document.querySelector('[data-bs-target="#stepDetails"]')).show();
          modal.show();
        });
      });

      function buildSeatMap() {
        seatMap.innerHTML = '';
        seatRows.forEach(row => {
          for (let col = 1; col <= seatCols; col++) {
            const seatId = `${row}${col}`;
            const div = document.createElement('div');
            div.className = 'seat';
            div.dataset.seat = seatId;
            // Randomly mark some as occupied
            if (Math.random() < 0.12) div.classList.add('occupied');
            div.addEventListener('click', () => {
              if (div.classList.contains('occupied')) return;
              if (selectedSeats.has(seatId)) {
                selectedSeats.delete(seatId);
                div.classList.remove('selected');
              } else {
                selectedSeats.add(seatId);
                div.classList.add('selected');
              }
              updateSeatSummary();
            });
            seatMap.appendChild(div);
          }
        });
      }

      function updateSeatSummary() {
        const list = [...selectedSeats].sort((a,b) => {
          if (a[0] === b[0]) return parseInt(a.slice(1)) - parseInt(b.slice(1));
          return a[0].localeCompare(b[0]);
        });
        selSeatsText.textContent = list.length ? list.join(', ') : '—';
        totalPrice.textContent = (list.length * seatPrice) + ' ₸';
      }

      // Step navigation
      document.getElementById('goSeats').addEventListener('click', () => {
        new bootstrap.Tab(document.querySelector('[data-bs-target="#stepSeats"]')).show();
      });
      document.getElementById('backDetails').addEventListener('click', () => {
        new bootstrap.Tab(document.querySelector('[data-bs-target="#stepDetails"]')).show();
      });
      document.getElementById('goPayment').addEventListener('click', () => {
        if (selectedSeats.size === 0) {
          alert('Please select at least one seat.');
          return;
        }
        // Fill summary
        sumMovie.textContent = selectedMovie || '—';
        sumCinema.textContent = elCinema.value || '—';
        sumDateTime.textContent = `${elDate.value || '—'} ${elTime.value || ''}`;
        sumSeats.textContent = [...selectedSeats].join(', ');
        sumTotal.textContent = (selectedSeats.size * seatPrice) + ' ₸';

        new bootstrap.Tab(document.querySelector('[data-bs-target="#stepPayment"]')).show();
      });
      document.getElementById('backSeats').addEventListener('click', () => {
        new bootstrap.Tab(document.querySelector('[data-bs-target="#stepSeats"]')).show();
      });

      // Payment handling
      document.getElementById('confirmPay').addEventListener('click', () => {
        const name  = document.getElementById('payName').value.trim();
        const num   = document.getElementById('payNumber').value.trim();
        const exp   = document.getElementById('payExpiry').value.trim();
        const cvv   = document.getElementById('payCVV').value.trim();

        if (!name || !num || !exp || !cvv) {
          alert('Please fill all payment fields.');
          return;
        }
        alert('✅ Payment successful! Your booking is confirmed.');
        modal.hide();
      });

      // Format card number
      document.getElementById('payNumber').addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').slice(0,16);
        val = val.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = val;
      });
      document.getElementById('payExpiry').addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').slice(0,4);
        if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
        e.target.value = v;
      });
    });     
  
    
