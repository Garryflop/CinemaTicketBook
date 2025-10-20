document.addEventListener('DOMContentLoaded', () => {
  // ===== Entry Modal =====
  const appContent = document.getElementById('appContent');
  const gateModalEl = document.getElementById('entryGateModal');
  const gateModal = gateModalEl ? new bootstrap.Modal(gateModalEl, { backdrop: 'static', keyboard: false }) : null;

  if (gateModal && !localStorage.getItem('ac_gate_ok')) {
    appContent?.classList.add('gate-blur');
    gateModal.show();
    gateModalEl.addEventListener('hidden.bs.modal', () => appContent?.classList.remove('gate-blur'));
  }

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  // ===== Sign Up / Sign In =====
  const signupForm = document.getElementById('gateSignupForm');
  signupForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('gateFullName');
    const email = document.getElementById('gateEmail');
    const pw = document.getElementById('gatePassword');
    const confirm = document.getElementById('gateConfirm');
    const terms = document.getElementById('gateTerms');

    [fullName, email, pw, confirm, terms].forEach(el => el.classList.remove('is-invalid'));
    let ok = true;
    if (!fullName.value.trim()) { fullName.classList.add('is-invalid'); ok = false; }
    if (!isValidEmail(email.value.trim())) { email.classList.add('is-invalid'); ok = false; }
    if (pw.value.length < 6) { pw.classList.add('is-invalid'); ok = false; }
    if (confirm.value !== pw.value) { confirm.classList.add('is-invalid'); ok = false; }
    if (!terms.checked) { terms.classList.add('is-invalid'); ok = false; }

    if (ok) {
      localStorage.setItem('ac_gate_ok', '1');
      gateModal?.hide();
      signupForm.reset();
      alert('✅ Account created (demo). Welcome!');
    }
  });

  const signinForm = document.getElementById('gateSigninForm');
  signinForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('gateLoginEmail');
    const pass = document.getElementById('gateLoginPassword');
    [email, pass].forEach(el => el.classList.remove('is-invalid'));
    let ok = true;
    if (!isValidEmail(email.value.trim())) { email.classList.add('is-invalid'); ok = false; }
    if (!pass.value) { pass.classList.add('is-invalid'); ok = false; }
    if (ok) {
      localStorage.setItem('ac_gate_ok', '1');
      gateModal?.hide();
      signinForm.reset();
      alert('✅ Signed in (demo).');
    }
  });

  // ===== Guest Buttons =====
  document.querySelectorAll('#continueGuestBtn,#continueGuestBtn2').forEach(btn => {
    btn?.addEventListener('click', () => {
      localStorage.setItem('ac_gate_ok', '1');
      gateModal?.hide();
    });
  });

  // ===== FAQ Accordion =====
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.faq-item').forEach(i => i !== item && i.classList.remove('active'));
      item.classList.toggle('active');
    });
  });

  // ===== Subscribe / Contact Popups =====
  const modalSubscribe = document.getElementById('modalSubscribe');
  const modalContact = document.getElementById('modalContact');
  const openModal = (m) => { m?.classList.add('show'); document.body.style.overflow = 'hidden'; };
  const closeModal = (m) => { m?.classList.remove('show'); document.body.style.overflow = ''; };

  document.getElementById('openSubscribe')?.addEventListener('click', () => openModal(modalSubscribe));
  document.getElementById('openContact')?.addEventListener('click', () => openModal(modalContact));
  document.querySelectorAll('.popup-close,.popup-cancel').forEach(b => b.addEventListener('click', () => {
    closeModal(modalSubscribe); closeModal(modalContact);
  }));
  [modalSubscribe, modalContact].forEach(m => m?.addEventListener('click', e => { if (e.target === m) closeModal(m); }));

  // ===== Keyboard Shortcuts =====
  document.addEventListener('keydown', (e) => {
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;

    switch (e.key.toLowerCase()) {
      case 's': openModal(modalSubscribe); break;
      case 'c': openModal(modalContact); break;
      case 't': document.getElementById('themeSwitcher')?.click(); break;
      case 'escape':
        closeModal(modalSubscribe);
        closeModal(modalContact);
        break;
    }
  });

  // ===== Subscribe / Contact Forms =====
  document.getElementById('subscribeForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('subEmail');
    email.classList.remove('is-invalid');
    if (!isValidEmail(email.value)) { email.classList.add('is-invalid'); return; }
    alert('✅ Subscribed successfully!');
    e.target.reset(); closeModal(modalSubscribe);
  });

  document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const msg = document.getElementById('contactMsg');
    [name, email, msg].forEach(el => el.classList.remove('is-invalid'));
    let ok = true;
    if (!name.value.trim()) { name.classList.add('is-invalid'); ok = false; }
    if (!isValidEmail(email.value)) { email.classList.add('is-invalid'); ok = false; }
    if (!msg.value.trim()) { msg.classList.add('is-invalid'); ok = false; }
    if (!ok) return;
    alert('📨 Message sent. Thank you!');
    e.target.reset(); closeModal(modalContact);
  });

  // ===== Theme Switch =====
  const themeBtn = document.getElementById('themeSwitcher');
  const saved = localStorage.getItem('theme') || 'default';
  if (saved !== 'default') document.body.classList.add(saved);

  themeBtn?.addEventListener('click', () => {
    if (document.body.classList.contains('neon-theme')) {
      document.body.classList.remove('neon-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light-theme');
    } else if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'default');
    } else {
      document.body.classList.add('neon-theme');
      localStorage.setItem('theme', 'neon-theme');
    }
  });

  // ===== Seat Selection & Payment =====
  const seatPrice = 2000, seatRows = ['A','B','C','D','E','F'], seatCols = 12;
  const modalEl = document.getElementById('bookTicketModal');
  const modal = modalEl ? new bootstrap.Modal(modalEl) : null;
  let selectedMovie = '', selectedSeats = new Set();
  const elMovie = document.getElementById('modalMovieName'),
        elCinema = document.getElementById('modalCinema'),
        elDate = document.getElementById('modalDate'),
        elTime = document.getElementById('modalTime'),
        seatMap = document.getElementById('seatMap'),
        selSeatsText = document.getElementById('selectedSeatsText'),
        totalPrice = document.getElementById('totalPrice'),
        sumMovie = document.getElementById('sumMovie'),
        sumCinema = document.getElementById('sumCinema'),
        sumDateTime = document.getElementById('sumDateTime'),
        sumSeats = document.getElementById('sumSeats'),
        sumTotal = document.getElementById('sumTotal');

  document.querySelectorAll('.book-open').forEach(btn => btn.addEventListener('click', () => {
    selectedMovie = btn.dataset.movie || '—';
    elMovie.value = selectedMovie; selectedSeats.clear();
    updateSeatSummary(); buildSeatMap();
    elDate.value = new Date().toISOString().split('T')[0];
    new bootstrap.Tab(document.querySelector('[data-bs-target="#stepDetails"]')).show();
    modal?.show();
  }));

  function buildSeatMap() {
    seatMap.innerHTML = '';
    seatRows.forEach(row => {
      for (let col = 1; col <= seatCols; col++) {
        const seatId = `${row}${col}`;
        const div = document.createElement('div');
        div.className = 'seat';
        div.dataset.seat = seatId;
        if (Math.random() < 0.12) div.classList.add('occupied');
        div.addEventListener('click', () => {
          if (div.classList.contains('occupied')) return;
          div.classList.toggle('selected');
          div.classList.contains('selected') ? selectedSeats.add(seatId) : selectedSeats.delete(seatId);
          updateSeatSummary();
        });
        seatMap.appendChild(div);
      }
    });
  }

  function updateSeatSummary() {
    const list = [...selectedSeats].sort();
    selSeatsText.textContent = list.length ? list.join(', ') : '—';
    totalPrice.textContent = (list.length * seatPrice) + ' ₸';
  }

  document.getElementById('goSeats')?.addEventListener('click', () =>
    new bootstrap.Tab(document.querySelector('[data-bs-target="#stepSeats"]')).show());
  document.getElementById('backDetails')?.addEventListener('click', () =>
    new bootstrap.Tab(document.querySelector('[data-bs-target="#stepDetails"]')).show());
  document.getElementById('goPayment')?.addEventListener('click', () => {
    if (!selectedSeats.size) return alert('Please select at least one seat.');
    sumMovie.textContent = selectedMovie;
    sumCinema.textContent = elCinema.value || '—';
    sumDateTime.textContent = `${elDate.value || '—'} ${elTime.value || ''}`;
    sumSeats.textContent = [...selectedSeats].join(', ');
    sumTotal.textContent = (selectedSeats.size * seatPrice) + ' ₸';
    new bootstrap.Tab(document.querySelector('[data-bs-target="#stepPayment"]')).show();
  });
  document.getElementById('backSeats')?.addEventListener('click', () =>
    new bootstrap.Tab(document.querySelector('[data-bs-target="#stepSeats"]')).show());

  document.getElementById('confirmPay')?.addEventListener('click', () => {
    const name = document.getElementById('payName').value.trim(),
          num = document.getElementById('payNumber').value.trim(),
          exp = document.getElementById('payExpiry').value.trim(),
          cvv = document.getElementById('payCVV').value.trim();
    if (!name || !num || !exp || !cvv) return alert('Please fill all payment fields.');
    alert('✅ Payment successful! Booking confirmed.');
    modal?.hide();
  });

  document.getElementById('payNumber')?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0,16);
    e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
  });
  document.getElementById('payExpiry')?.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0,4);
    if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
    e.target.value = v;
  });

  // ===== Ratings =====
  document.querySelectorAll('.rating').forEach(block => {
    const stars = block.querySelectorAll('.star');
    const result = block.parentElement.querySelector('.rating-result');
    let savedValue = 0;
    stars.forEach((star, i) => {
      star.addEventListener('mouseover', () => stars.forEach((s,j)=>s.style.color=j<=i?'var(--accent)':'#666'));
      star.addEventListener('mouseout', () => stars.forEach((s,j)=>s.style.color=j<savedValue?'var(--accent)':'#666'));
      star.addEventListener('click', () => {
        savedValue = i + 1;
        stars.forEach((s,j)=>s.style.color=j<savedValue?'var(--accent)':'#666');
        const movie = block.dataset.movie || 'This film';
        result.textContent = `You rated "${movie}" ${savedValue}/5 ⭐`;
        localStorage.setItem(`rating_${block.dataset.movie}`, savedValue);
      });
    });
    const stored = localStorage.getItem(`rating_${block.dataset.movie}`);
    if (stored) {
      savedValue = parseInt(stored,10);
      stars.forEach((s,j)=>s.style.color=j<savedValue?'var(--accent)':'#666');
      const movie = block.dataset.movie || 'This film';
      result.textContent = `You rated "${movie}" ${savedValue}/5 ⭐`;
    }
  });

  // ===== Show Time Button =====
  document.getElementById('showTimeBtn')?.addEventListener('click', () => {
    document.getElementById('timeDisplay').textContent = new Date().toLocaleTimeString();
  });

  // ===== Switch Statement: Greeting =====
  function showGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting;
    switch (true) {
      case (hour < 12):
        greeting = '☀️ Good morning!';
        break;
      case (hour < 18):
        greeting = '🌤️ Good afternoon!';
        break;
      case (hour < 22):
        greeting = '🌆 Good evening!';
        break;
      default:
        greeting = '🌙 Good night!';
    }
    document.getElementById('greeting').textContent = greeting;
  }
  showGreeting();
  const featuredMovie = {
  title: "Dune: Part Two",
  genre: "Sci-Fi",
  duration: 165,
  rating: 4.8,
  info() {
    return `${this.title} — ${this.genre} (${this.duration} min, ★${this.rating})`;
  }
};
  document.getElementById("movieDetails").textContent = featuredMovie.info();
  const cinemas = ["Kinopark 8", "Chaplin Silkway", "Chaplin KhanShatyr","KInopark 7"];
  const list = document.getElementById("cinemaList");
  cinemas.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
  });
  const prices = [2000, 2500, 3000];
  const withVat = prices.map(p => p * 1.12);
  console.log("Prices + VAT :", withVat);
    // === Play Sound ===
  document.getElementById("soundBtn").addEventListener("click", () => {
    document.getElementById("clickSound").play();
  });

  // === Animation ===
  document.getElementById("animateBtn").addEventListener("click", () => {
    document.getElementById("animBox").classList.toggle("move");
  });
  

});
