//CONTACT FORM
// Get elements
const openFormBtn = document.getElementById('openContactForm');
const closeFormBtn = document.getElementById('closeContactForm');
const contactFormModal = document.getElementById('contactFormModal');

// Open the contact form modal when the button is clicked
openFormBtn.addEventListener('click', () => {
  contactFormModal.style.display = 'flex'; // Show the modal
});

// Close the modal when the close button is clicked
closeFormBtn.addEventListener('click', () => {
  contactFormModal.style.display = 'none'; // Hide the modal
});

// Close the modal if the user clicks outside of the modal content
window.addEventListener('click', (event) => {
  if (event.target === contactFormModal) {
    contactFormModal.style.display = 'none'; // Hide the modal if clicked outside
  }
});

// Handle form submission (this part is just for the demo)
document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent page refresh
  alert("Message sent! We will get back to you soon.");
  contactFormModal.style.display = 'none'; // Close the modal after submission
});


//FAQ
// Function to toggle the visibility of the answers
function toggleAnswer(answerId) {
  const answer = document.getElementById(answerId);
  const question = answer.previousElementSibling;

  // Toggle the display of the answer
  if (answer.style.display === "none" || answer.style.display === "") {
    answer.style.display = "block";
    question.classList.add('active'); // Add active class to change background color of the question
  } else {
    answer.style.display = "none";
    question.classList.remove('active'); // Remove active class when closed
  }
}

// Initialize: Make sure answers are hidden by default
document.querySelectorAll('.faq-answer').forEach(answer => {
  answer.style.display = 'none';
});


//VALIDATION
// Get elements
const signUpBtn = document.getElementById('signUpBtn');
const contactUsBtn = document.getElementById('contactUsBtn');
const signUpModal = document.getElementById('signUpModal');
const closeModalBtn = document.getElementById('closeContactForm');
const signUpForm = document.getElementById('signUpForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// Open the Sign Up modal when the "Sign Up" button is clicked
signUpBtn.addEventListener('click', () => {
  signUpModal.style.display = 'flex'; // Show the modal
});

// Close the modal when the "Close" button is clicked
closeModalBtn.addEventListener('click', () => {
  signUpModal.style.display = 'none'; // Hide the modal
});

// Close the modal if the user clicks outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === signUpModal) {
    signUpModal.style.display = 'none'; // Hide the modal if clicked outside
  }
});

// Form validation
signUpForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let valid = true;

  // Reset error messages
  emailError.textContent = '';
  passwordError.textContent = '';
  confirmPasswordError.textContent = '';

  // Validate email
  const emailValue = emailInput.value.trim();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(emailValue)) {
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  // Validate password
  const passwordValue = passwordInput.value.trim();
  if (passwordValue.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters long.';
    valid = false;
  }

  // Confirm password
  const confirmPasswordValue = confirmPasswordInput.value.trim();
  if (confirmPasswordValue !== passwordValue) {
    confirmPasswordError.textContent = 'Passwords do not match.';
    valid = false;
  }

  // If form is valid, show success message and close the modal
  if (valid) {
    alert('Sign Up Successful!');
    signUpModal.style.display = 'none'; // Close modal
  }
});




//MOVIE FILTER
(function () {
  const select = document.getElementById('genreFilter');
  const cards = Array.from(document.querySelectorAll('.movie-card'));

  function applyFilter() {
    const value = (select?.value || 'all').toLowerCase();
    cards.forEach(card => {
      const genres = (card.dataset.genres || '').toLowerCase();
      const list = genres.split(',').map(g => g.trim());
      const show = value === 'all' || list.includes(value);
      // hide/show the column that wraps the card (keeps grid gaps clean)
      const col = card.closest('.col') || card;
      col.style.display = show ? '' : 'none';
    });
  }

  if (select) {
    select.addEventListener('change', applyFilter);
    applyFilter(); // initial render
  }
})();

// ===== Minimal FAQ toggle (in case scripts.js doesn't have it) =====
function toggleAnswer(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('show');
}



/* ========= Day/Night Theme Toggle ========= */
(function () {
  const body = document.body;
  const btn = document.getElementById('darkModeBtn');
  const icon = document.getElementById('darkModeIcon');

  // restore theme
  const saved = localStorage.getItem('theme'); // 'dark' | 'light'
  if (saved === 'light') body.classList.add('light');

  function setIcon() {
    const isLight = body.classList.contains('light');
    icon.src = isLight
      ? 'https://img.icons8.com/ios/452/sun--v1.png'
      : 'https://img.icons8.com/ios/452/moon.png';
    icon.alt = isLight ? 'Sun Icon' : 'Moon Icon';
  }
  setIcon();

  btn?.addEventListener('click', () => {
    body.classList.toggle('light');
    localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
    setIcon();
  });
})();

/* ========= Star Rating System =========
   - Adds 5 stars per .movie-card (gold for selected, gray otherwise)
   - Saves per-title rating in localStorage as ratings[title] = 1..5
*/
(function () {
  const cards = document.querySelectorAll('.movie-card');

  // read ratings map or initialize
  const ratings = JSON.parse(localStorage.getItem('movieRatings') || '{}');

  cards.forEach(card => {
    const title = card.dataset.title || card.querySelector('.card-title')?.textContent?.trim() || 'untitled';
    // create star container
    const starWrap = document.createElement('div');
    starWrap.className = 'star-wrap mt-2';
    starWrap.setAttribute('aria-label', `Rate ${title}`);

    const current = Number(ratings[title] || 0);

    for (let i = 1; i <= 5; i++) {
      const s = document.createElement('span');
      s.className = 'star' + (i <= current ? ' gold' : '');
      s.textContent = '★';
      s.dataset.value = String(i);

      // hover preview (gold up to hovered star)
      s.addEventListener('mouseenter', () => paint(i));
      starWrap.addEventListener('mouseleave', () => paint(Number(ratings[title] || 0)));

      // click to set rating
      s.addEventListener('click', () => {
        ratings[title] = i;
        localStorage.setItem('movieRatings', JSON.stringify(ratings));
        paint(i);
      });

      starWrap.appendChild(s);
    }

    // put stars at the end of card-body
    const body = card.querySelector('.card-body') || card;
    body.appendChild(starWrap);

    function paint(n) {
      starWrap.querySelectorAll('.star').forEach((el, idx) => {
        el.classList.toggle('gold', idx < n);
      });
    }
  });
})();

/* ===== Dynamic Content Update (in-card swap on hover) ===== */
(function () {
  const cards = document.querySelectorAll('.movie-card');

  cards.forEach(card => {
    const titleEl = card.querySelector('.card-title');
    const genresEl = card.querySelector('.card-text');
    const descEl = card.querySelector('.card-desc');
    const imgEl = card.querySelector('img');

    // store originals once
    card.dataset.origTitle = titleEl?.textContent?.trim() || '';
    card.dataset.origGenres = genresEl?.textContent?.trim() || '';
    card.dataset.origDesc = descEl?.textContent?.trim() || '';
    card.dataset.origPoster = imgEl?.getAttribute('src') || '';

    // prefer explicit data-*; fall back to current text
    const baseTitle = card.dataset.title || card.dataset.origTitle;
    const baseGenres = card.dataset.genres || card.dataset.origGenres;
    const baseDesc = card.dataset.desc || card.dataset.origDesc;
    const basePoster = card.dataset.poster || card.dataset.origPoster;

    // ensure DOM matches base (in case HTML drifted)
    if (titleEl) titleEl.textContent = baseTitle;
    if (genresEl) genresEl.textContent = baseGenres;
    if (descEl) descEl.textContent = baseDesc;
    if (imgEl && basePoster) imgEl.src = basePoster;

    card.addEventListener('mouseenter', () => {
      const hTitle = card.dataset.hoverTitle || baseTitle;
      const hGenres = card.dataset.hoverGenres || baseGenres;
      const hDesc = card.dataset.hoverDesc || (baseDesc ? "Preview: " + baseDesc : "");
      const hPoster = card.dataset.hoverPoster || basePoster;

      if (titleEl) titleEl.textContent = hTitle;
      if (genresEl) genresEl.textContent = hGenres;
      if (descEl) descEl.textContent = hDesc;
      if (imgEl && hPoster) imgEl.src = hPoster;
    });

    card.addEventListener('mouseleave', () => {
      if (titleEl) titleEl.textContent = baseTitle;
      if (genresEl) genresEl.textContent = baseGenres;
      if (descEl) descEl.textContent = baseDesc;
      if (imgEl && basePoster) imgEl.src = basePoster;
    });
  });
})();




/* ===================== Utilities (reused) ===================== */
function initStarsOnCard(card) {
  const ratings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
  const title = card.dataset.title || card.querySelector('.card-title')?.textContent?.trim() || 'untitled';
  const body = card.querySelector('.card-body') || card;
  // avoid duplicating when appending more cards
  if (body.querySelector('.star-wrap')) return;

  const wrap = document.createElement('div');
  wrap.className = 'star-wrap mt-2';
  wrap.setAttribute('aria-label', `Rate ${title}`);

  const current = Number(ratings[title] || 0);
  for (let i = 1; i <= 5; i++) {
    const s = document.createElement('span');
    s.className = 'star' + (i <= current ? ' gold' : '');
    s.textContent = '★';
    s.dataset.value = String(i);

    s.addEventListener('mouseenter', () => paint(i));
    wrap.addEventListener('mouseleave', () => paint(Number(ratings[title] || 0)));
    s.addEventListener('click', () => {
      ratings[title] = i;
      localStorage.setItem('movieRatings', JSON.stringify(ratings));
      paint(i);
    });

    wrap.appendChild(s);
  }
  body.appendChild(wrap);

  function paint(n) {
    wrap.querySelectorAll('.star').forEach((el, idx) => el.classList.toggle('gold', idx < n));
  }
}

function initInCardHoverSwap(card) {
  const titleEl = card.querySelector('.card-title');
  const genresEl = card.querySelector('.card-text');
  const descEl = card.querySelector('.card-desc') || card.querySelector('.card-text + .card-desc');
  const imgEl = card.querySelector('img');

  card.dataset.origTitle = titleEl?.textContent?.trim() || '';
  card.dataset.origGenres = genresEl?.textContent?.trim() || '';
  card.dataset.origDesc = descEl?.textContent?.trim() || '';
  card.dataset.origPoster = imgEl?.getAttribute('src') || '';

  const baseTitle = card.dataset.title || card.dataset.origTitle;
  const baseGenres = card.dataset.genres || card.dataset.origGenres;
  const baseDesc = card.dataset.desc || card.dataset.origDesc;
  const basePoster = card.dataset.poster || card.dataset.origPoster;

  if (titleEl) titleEl.textContent = baseTitle;
  if (genresEl) genresEl.textContent = baseGenres;
  if (descEl) descEl.textContent = baseDesc;
  if (imgEl && basePoster) imgEl.src = basePoster;

  card.addEventListener('mouseenter', () => {
    const hTitle = card.dataset.hoverTitle || baseTitle;
    const hGenres = card.dataset.hoverGenres || baseGenres;
    const hDesc = card.dataset.hoverDesc || (baseDesc ? "Preview: " + baseDesc : "");
    const hPoster = card.dataset.hoverPoster || basePoster;
    if (titleEl) titleEl.textContent = hTitle;
    if (genresEl) genresEl.textContent = hGenres;
    if (descEl) descEl.textContent = hDesc;
    if (imgEl && hPoster) imgEl.src = hPoster;
  });
  card.addEventListener('mouseleave', () => {
    if (titleEl) titleEl.textContent = baseTitle;
    if (genresEl) genresEl.textContent = baseGenres;
    if (descEl) descEl.textContent = baseDesc;
    if (imgEl && basePoster) imgEl.src = basePoster;
  });
}

/* ensure each movie card has a .showtimes container */
function ensureShowtimesArea(card) {
  if (!card.querySelector('.showtimes')) {
    const body = card.querySelector('.card-body') || card;
    const div = document.createElement('div');
    div.className = 'showtimes';
    body.appendChild(div);
  }
}

/* Render showtime chips for a card and dateKey */
function renderShowtimesForCard(card, dateKey, mapping) {
  ensureShowtimesArea(card);
  const zone = card.querySelector('.showtimes');
  zone.innerHTML = '';
  (mapping[dateKey] || []).forEach(t => {
    const chip = document.createElement('span');
    chip.className = 'showtime-chip';
    chip.textContent = t;
    zone.appendChild(chip);
  });
}

/* ===================== 1) Load More Movies ===================== */
(function () {
  const loadBtn = document.getElementById('loadMoreBtn');
  if (!loadBtn) return;

  // Sample payload you could replace with a real fetch
  const moreMovies = [
    {
      title: 'Interstellar', genres: 'Adventure, Drama, Sci-Fi', poster: 'images/Dune_poster.jpg',  // put your own image
      desc: 'A team travels through a wormhole in space in an attempt to ensure humanity\'s survival.',
      hoverDesc: 'Hover: time dilation, black holes, and love across dimensions.'
    },
    {
      title: 'The Batman', genres: 'Action, Crime, Drama', poster: 'images/Black_Widow.jpg',
      desc: 'Batman investigates a series of crimes in Gotham.',
      hoverTitle: 'The Batman — Vengeance'
    },
    {
      title: 'Your Name', genres: 'Anime, Romance, Drama', poster: 'images/20250901_jjkS3_poster.jpg.webp',
      desc: 'Two teenagers share a profound, magical connection.'
    }
  ];

  const grid = document.querySelector('.movies-list .row');
  function cardHTML(m) {
    return `
      <div class="col">
        <div class="card movie-card"
             data-title="${m.title}"
             data-genres="${m.genres}"
             data-poster="${m.poster}"
             data-desc="${m.desc}"
             ${m.hoverTitle ? `data-hover-title="${m.hoverTitle}"` : ''}
             ${m.hoverDesc ? `data-hover-desc="${m.hoverDesc}"` : ''}>
          <img src="${m.poster}" class="card-img-top" alt="${m.title}">
          <div class="card-body">
            <h5 class="card-title">${m.title}</h5>
            <p class="card-text">${m.genres}</p>
            <p class="card-desc small text-muted">${m.desc}</p>
            <a href="seat-selection.html" class="btn btn-pink">Book Now</a>
          </div>
        </div>
      </div>`;
  }

  loadBtn.addEventListener('click', () => {
    const tmp = document.createElement('div');
    tmp.innerHTML = moreMovies.map(cardHTML).join('');
    // append & initialize behavior for each new card
    Array.from(tmp.children).forEach(col => {
      const card = col.querySelector('.movie-card');
      grid.appendChild(col);
      attachSwooshAudio(card);

      initStarsOnCard(card);
      initInCardHoverSwap(card);
      ensureShowtimesArea(card);
    });
    // optional: disable after first click
    loadBtn.disabled = true;
    loadBtn.textContent = 'All movies loaded';
    refreshKeyboardIndex(); // include new cards in keyboard nav
    // also refresh showtimes for the chosen date (if any)
    applyShowtimesToAll();
  });
})();

/* ===================== 2) Keyboard Navigation ===================== */
(function () {
  const mq3 = window.matchMedia('(min-width: 768px)'); // md breakpoint ~ 3 columns
  let columns = mq3.matches ? 3 : 1;
  mq3.addEventListener?.('change', e => { columns = e.matches ? 3 : 1; });

  let cards = [];
  function collectCards() {
    cards = Array.from(document.querySelectorAll('.movie-card'))
      .filter(c => c.closest('.col')?.style.display !== 'none'); // skip hidden
    // tabbing support
    cards.forEach(c => c.setAttribute('tabindex', '0'));
  }
  collectCards();

  function focusCard(idx) {
    cards.forEach(c => c.classList.remove('card-focus'));
    const clamped = Math.max(0, Math.min(idx, cards.length - 1));
    const card = cards[clamped];
    if (card) {
      card.classList.add('card-focus');
      card.focus({ preventScroll: false });
      currentIndex = clamped;
    }
  }
  let currentIndex = 0;
  focusCard(0);

  document.addEventListener('keydown', (e) => {
    if (cards.length === 0) return;
    let next = currentIndex;
    if (e.key === 'ArrowRight') { next = currentIndex + 1; }
    else if (e.key === 'ArrowLeft') { next = currentIndex - 1; }
    else if (e.key === 'ArrowDown') { next = currentIndex + columns; }
    else if (e.key === 'ArrowUp') { next = currentIndex - columns; }
    else if (e.key === 'Enter') {
      // open the "Book Now" of focused card
      const a = cards[currentIndex].querySelector('a.btn');
      if (a) a.click();
      return;
    } else return;

    e.preventDefault();
    focusCard(next);
  });

  // expose refresh when cards list changes (load more / filter)
  window.refreshKeyboardIndex = function () {
    collectCards();
    focusCard(Math.min(currentIndex, cards.length - 1));
  };
})();

/* ===================== 3) Multi-step Date Selector ===================== */
(function () {
  // Showtimes map per dateKey
  const showtimesMap = {
    today: ['10:00', '12:30', '15:00', '18:30', '21:00'],
    tomorrow: ['09:45', '13:15', '16:45', '20:15'],
    custom: ['11:00', '14:00', '17:00', '19:30']
  };

  const timeStep = document.getElementById('timeStep');
  const timeButtonsZone = document.getElementById('timeButtons');
  const summaryStep = document.getElementById('summaryStep');
  const summary = document.getElementById('selectionSummary');
  const customDate = document.getElementById('customDate');

  let chosenDateKey = 'today';
  let chosenDateLabel = new Date().toLocaleDateString();
  let chosenTime = '';

  // wire existing buttons in your date bar
  document.querySelectorAll('.date-selector .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent.trim().toLowerCase();
      if (text.includes('today')) {
        chosenDateKey = 'today';
        chosenDateLabel = new Date().toLocaleDateString();
      } else if (text.includes('tomorrow')) {
        chosenDateKey = 'tomorrow';
        const t = new Date(); t.setDate(t.getDate() + 1);
        chosenDateLabel = t.toLocaleDateString();
      } else { // "Choose day"
        chosenDateKey = 'custom';
        customDate.showPicker?.(); // open native picker when supported
      }
      buildTimes();
    });
  });

  customDate.addEventListener('change', () => {
    chosenDateKey = 'custom';
    chosenDateLabel = customDate.value || chosenDateLabel;
    buildTimes();
  });

  function buildTimes() {
    // Step 2 visible
    timeStep.hidden = false;
    timeButtonsZone.innerHTML = '';
    (showtimesMap[chosenDateKey] || []).forEach(t => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn btn-sm btn-outline-light me-2 mb-2';
      b.textContent = t;
      b.addEventListener('click', () => {
        chosenTime = t;
        // Step 3
        summaryStep.hidden = false;
        summary.textContent = `Selected: ${chosenDateLabel} at ${chosenTime}`;
      });
      timeButtonsZone.appendChild(b);
    });
    // Update all cards’ showtimes for the chosen date
    applyShowtimesToAll();
  }

  // called after load more or filter, and on date changes
  window.applyShowtimesToAll = function () {
    const key = chosenDateKey;
    document.querySelectorAll('.movie-card').forEach(card => {
      renderShowtimesForCard(card, key, showtimesMap);
    });
  };

  // initialize on first paint
  buildTimes();
})();

/* ========== bootstrapping existing cards (stars + hover + showtimes) ========== */
(function () {
  document.querySelectorAll('.movie-card').forEach(card => {
    initStarsOnCard(card);
    initInCardHoverSwap(card);
    ensureShowtimesArea(card);
  });
  // initial showtimes render
  window.applyShowtimesToAll?.();
})();




/* =====================  A) Movie Object Array  ===================== */
const movies = [
  {
    title: "Spider-Man: No Way Home",
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 0,
    price: 1800,
    poster: "images/spidermannowayhome.jpeg",
    desc: "Peter Parker seeks help from Doctor Strange, causing the multiverse to break open.",
    hoverTitle: "Spider-Man: Multiverse Mayhem",
    hoverDesc: "Preview: portals open, classic villains return, and choices have consequences."
  },
  {
    title: "Jujutsu Kaisen S3",
    genre: ["Anime", "Adventure", "Drama"],
    rating: 0,
    price: 1500,
    poster: "images/20250901_jjkS3_poster.jpg.webp",
    desc: "Sorcerers face new threats while uncovering secrets of cursed energy.",
    hoverTitle: "JJK S3 — New Arc",
    hoverDesc: "Hover preview: intense duels, deeper lore, higher stakes."
  },
  {
    title: "Black Widow",
    genre: ["Action", "Adventure"],
    rating: 0,
    price: 1600,
    poster: "images/Black_Widow.jpg",
    desc: "Natasha confronts her past while on the run after Civil War."
  },
  {
    title: "Dune",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: 0,
    price: 1900,
    poster: "images/Dune_poster.jpg",
    desc: "Paul Atreides travels to Arrakis where destiny and spice collide.",
    hoverDesc: "Hover preview: sandworms, prophecy, and power on Arrakis."
  }
];

/* Render helper: returns one card column */
function cardColHTML(m) {
  const genresTxt = m.genre.join(", ");
  // data-* are used by your existing hover-swap / stars scripts if present
  return `
  <div class="col reveal">
    <div class="card movie-card"
         data-title="${m.title}"
         data-genres="${genresTxt}"
         data-poster="${m.poster}"
         data-desc="${m.desc}"
         ${m.hoverTitle ? `data-hover-title="${m.hoverTitle}"` : ''}
         ${m.hoverDesc ? `data-hover-desc="${m.hoverDesc}"` : ''}>
      <img src="${m.poster}" class="card-img-top" alt="${m.title}">
      <div class="card-body">
        <h5 class="card-title">${m.title}</h5>
        <p class="card-text">${genresTxt}</p>
        <p class="card-desc small text-muted">${m.desc}</p>
        <div class="small text-muted mt-1">Price: ${m.price} ₸</div>
        <a href="seat-selection.html" class="btn btn-pink mt-2">Book Now</a>
      </div>
    </div>
  </div>`;
}

/* Render all cards, optionally filtered by genre */
function renderMovies(arr) {
  const grid = document.getElementById('moviesGrid');
  if (!grid) return;
  grid.innerHTML = arr.map(cardColHTML).join('');

  // attach behaviors to the newly rendered cards
  Array.from(grid.querySelectorAll('.movie-card')).forEach(card => {
    attachSwooshOnHover(card);         // sound effect
    observeReveal(card.closest('.col'));// slide-in animation
    // If you added these earlier, they’ll be picked up:
    window.initStarsOnCard?.(card);    // star rating
    window.initInCardHoverSwap?.(card);// hover swap inside card
    window.ensureShowtimesArea?.(card);// showtimes zone for date selector
  });

  // reflect date selection & keyboard nav for new set
  window.applyShowtimesToAll?.();
  window.refreshKeyboardIndex?.();
}

/* Initial render (no filter) */
renderMovies(movies);

/* Optional integration with your genre <select id="genreFilter"> if present */
(function () {
  const select = document.getElementById('genreFilter');
  if (!select) return;
  function apply() {
    const val = select.value.toLowerCase();
    const filtered = val === 'all' ? movies
      : movies.filter(m => m.genre.map(g => g.toLowerCase()).includes(val));
    renderMovies(filtered);
  }
  select.addEventListener('change', apply);
  apply();
})();

/* =====================  B) Swoosh Sound on Hover  ===================== */
/* Plays a short whoosh using Web Audio API (no mp3 needed) */
const audioCtx = typeof AudioContext !== 'undefined' ? new AudioContext() :
  typeof webkitAudioContext !== 'undefined' ? new webkitAudioContext() : null;

function playSwoosh() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(800, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.25); // downward sweep
  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.5, audioCtx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.30);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.32);
}

/* attach once per card with a small cooldown to avoid spam */
/* Plays swoosh on hover AND when the card receives keyboard focus */
function attachSwooshAudio(card) {
  let cooling = false;

  function trigger() {
    if (cooling) return;
    // ensure audio context is active (some browsers start it suspended)
    audioCtx?.resume?.();
    playSwoosh();
    cooling = true;
    setTimeout(() => (cooling = false), 180);
  }

  card.addEventListener('mouseenter', trigger); // mouse/trackpad hover
  card.addEventListener('focus', trigger);      // keyboard focus (Tab / arrows)
  // nice-to-have for pen/trackpad: fires before mouseenter on many devices
  card.addEventListener('pointerenter', trigger, { passive: true });
}


/* =====================  C) Slide-in Animation on Scroll  ===================== */
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('reveal-visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

function observeReveal(el) { if (el) io.observe(el); }

/* In case content size/layout changes (load more, filtering) */
window.addEventListener('resize', () => {
  document.querySelectorAll('.reveal:not(.reveal-visible)').forEach(el => observeReveal(el));
});


/////////

$(function () {
  const $search = $('#siteSearch');
  const $suggest = $('#searchSuggest');
  const $cards = $('.movie-card');                     // movie cards
  const $faqItems = $('.faq-item');                    // FAQ rows
  const HIGHLIGHT_TARGETS = '.card-title, .card-text, .card-desc, .faq-question, .faq-answer';

  // ---------- helpers ----------
  function norm(s) { return (s || '').toString().toLowerCase().trim(); }

  // cache originals (for safe unhighlight)
  $(HIGHLIGHT_TARGETS).each(function () {
    const $el = $(this);
    if (!$el.data('orig')) $el.data('orig', $el.html());
  });

  function clearHighlight() {
    $(HIGHLIGHT_TARGETS).each(function () {
      const $el = $(this);
      const orig = $el.data('orig');
      if (orig) $el.html(orig);
    });
  }

  function escRegex(str) { return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function highlightTerm(term) {
    if (!term) return;
    const rx = new RegExp('(' + escRegex(term) + ')', 'ig');
    $(HIGHLIGHT_TARGETS).each(function () {
      const $el = $(this);
      const orig = $el.data('orig');
      if (!orig) return;
      $el.html(orig.replace(rx, '<mark class="hl">$1</mark>'));
    });
  }

  // Build suggestion source (movie titles + FAQ questions)
  function buildIndex() {
    const titles = $cards.map((_, c) => $(c).data('title') || '').get();
    const faqQs = $('.faq-question').map((_, q) => $(q).text()).get();
    // dedupe
    return [...new Set([...titles, ...faqQs].filter(Boolean))];
  }
  const SUGGEST_SOURCE = buildIndex();

  // Apply combined filters (text + genre)
  function applyFilters() {
    const q = norm($search.val());
    const genre = norm($('#genreFilter').val());

    // Movies filter
    $cards.each(function () {
      const $c = $(this);
      const title = norm($c.data('title'));
      const genres = norm($c.data('genres'));
      const desc = norm($c.data('desc'));
      const matchesText = !q || title.includes(q) || genres.includes(q) || desc.includes(q);
      const matchesGenre = !genre || genre === 'all' || genres.includes(genre);
      $c.closest('.col').toggle(matchesText && matchesGenre);
    });

    // FAQ filter
    $faqItems.each(function () {
      const $it = $(this);
      const txt = norm($it.find('.faq-question').text() + ' ' + $it.find('.faq-answer').text());
      const matches = !q || txt.includes(q);
      $it.toggle(matches);
    });

    // Highlight
    clearHighlight();
    if (q) highlightTerm(q);
  }

  // ---------- real-time search ----------
  $search.on('keyup input', function () {
    const q = norm(this.value);

    // suggestions
    if (q) {
      const items = SUGGEST_SOURCE
        .filter(s => s.toLowerCase().includes(q))
        .slice(0, 8);
      if (items.length) {
        $suggest.html(items.map(s => `<li class="list-group-item">${s}</li>`).join('')).show();
      } else {
        $suggest.hide().empty();
      }
    } else {
      $suggest.hide().empty();
    }

    // filter + highlight
    applyFilters();
  });

  // pick a suggestion
  $suggest.on('click', '.list-group-item', function () {
    $search.val($(this).text());
    $suggest.hide().empty();
    applyFilters();
  });

  // hide suggestions on blur (with slight delay for click)
  $search.on('blur', function () { setTimeout(() => $suggest.hide(), 150); });

  // keep genre filter working with search
  $('#genreFilter').on('change', applyFilters);

  // Initial run
  applyFilters();
});

