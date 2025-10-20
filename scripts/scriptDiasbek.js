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
    document.getElementById('contactForm').addEventListener('submit', function(event) {
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
        signUpForm.addEventListener('submit', function(event) {
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


        // Dark Mode Toggle
        darkModeBtn.addEventListener('click', () => {
            const isDarkMode = document.body.style.backgroundColor === 'rgb(18, 18, 18)';
            
            if (isDarkMode) {
                // Switch to light mode
                document.body.style.backgroundColor = '#f8f9fa';
                document.body.style.color = '#333';
                darkModeIcon.src = "https://img.icons8.com/ios/452/sun.png"; // Sun icon for light mode
                //document.body.getElementById('modal-content').style.backgroundColor = #333;
            } else {
                // Switch to dark mode
                document.body.style.backgroundColor = '#121212';
                document.body.style.color = '#f8f9fa';
                darkModeIcon.src = "https://img.icons8.com/ios/452/moon.png"; // Moon icon for dark mode
            }
        });

//MOVIE FILTER
        (function () {
    const select = document.getElementById('genreFilter');
    const cards  = Array.from(document.querySelectorAll('.movie-card'));

    function applyFilter() {
      const value = (select?.value || 'all').toLowerCase();
      cards.forEach(card => {
        const genres = (card.dataset.genres || '').toLowerCase();
        const list   = genres.split(',').map(g => g.trim());
        const show   = value === 'all' || list.includes(value);
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
  const btn  = document.getElementById('darkModeBtn');
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

/* ========= Dynamic Content Update =========
   - Hover a .movie-card to update the Featured panel (poster, title, genres, desc)
*/
(function () {
  const featPoster = document.getElementById('featPoster');
  const featTitle  = document.getElementById('featTitle');
  const featGenres = document.getElementById('featGenres');
  const featDesc   = document.getElementById('featDesc');

  function updateFrom(card) {
    const t = card.dataset.title  || card.querySelector('.card-title')?.textContent?.trim() || '';
    const g = card.dataset.genres || card.querySelector('.card-text')?.textContent?.trim() || '';
    const p = card.dataset.poster || card.querySelector('img')?.getAttribute('src') || '';
    const d = card.dataset.desc   || '';
    if (p) featPoster.src = p;
    if (t) featTitle.textContent = t;
    if (g) featGenres.textContent = g;
    if (d) featDesc.textContent   = d;
  }

  document.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('mouseenter', () => updateFrom(card));
    // optional: click to lock selection (remove if not needed)
    card.addEventListener('click', (e) => {
      // don’t hijack “Book Now” link
      if ((e.target.closest('a') && e.target.closest('a').href) || e.target.tagName === 'A') return;
      updateFrom(card);
    });
  });
})();

