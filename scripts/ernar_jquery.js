$(document).ready(function () {
  console.log("jQuery is ready!");

  // -------------------------
  // Task 1 + Task 2: Live Search + Autocomplete
  // -------------------------
  const cinemaNames = [
    "Kinopark 8 IMAX Saryarka",
    "Kinopark 7 IMAX 3D",
    "Chaplin MEGA Silk Way",
    "Chaplin Khan Shatyr"
  ];

  $("#cinemaSearch").on("keyup", function () {
    const searchValue = $(this).val().toLowerCase().trim();

    // filter cinema cards
    $(".cinema-card").each(function () {
      const cinemaName = $(this).data("name").toLowerCase();
      const cinemaCity = $(this).data("city").toLowerCase();

      if (
        cinemaName.includes(searchValue) ||
        cinemaCity.includes(searchValue)
      ) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });

    // autocomplete dropdown
    const list = $("#searchSuggestions");
    list.empty(); // remove old suggestions

    if (searchValue.length === 0) {
      return; // nothing typed = nothing to show
    }

    const matches = cinemaNames.filter(name =>
      name.toLowerCase().includes(searchValue)
    );

    matches.forEach(name => {
      const item = $("<li></li>")
        .addClass("list-group-item list-group-item-action")
        .text(name);

      list.append(item);
    });

    // click suggestion
    $("#searchSuggestions li").on("click", function () {
      const picked = $(this).text();
      $("#cinemaSearch").val(picked);
      list.empty();
      $("#cinemaSearch").trigger("keyup"); // filter again using chosen suggestion
    });
  });

  // -------------------------
  // Task 3: Highlight FAQ matches
  // -------------------------

  // 1. Save original FAQ answers (so we can reset)
  const originalAnswers = {};
  $(".faq-answer").each(function (index) {
    originalAnswers[index] = $(this).html();
    $(this).attr("data-ans-id", index);
  });

  // 2. When typing in #faqSearch -> highlight
  $("#faqSearch").on("keyup", function () {
    let query = $(this).val().trim();

    if (query === "") {
      // reset FAQ text
      $(".faq-answer").each(function () {
        const id = $(this).attr("data-ans-id");
        $(this).html(originalAnswers[id]);
      });
      return;
    }

    // escape regex symbols
    const safe = escapeRegex(query);
    const reg = new RegExp("(" + safe + ")", "gi");

    $(".faq-answer").each(function () {
      const id = $(this).attr("data-ans-id");
      let cleanHtml = originalAnswers[id];

      // wrap matches in <mark>
      const newHtml = cleanHtml.replace(reg, '<mark class="highlighted">$1</mark>');
      $(this).html(newHtml);
    });
  });

  function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // -------------------------
  // Task 4: Scroll progress bar
  // -------------------------
  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrolled = (scrollTop / docHeight) * 100;
    $("#scrollProgress").css("width", scrolled + "%");
  });

  // -------------------------
  // Task 5: Animated number counter
  // -------------------------
  $(".counter").each(function () {
    const $this = $(this);
    const countTo = parseInt($this.attr("data-count"));

    $({ countNum: 0 }).animate(
      { countNum: countTo },
      {
        duration: 2000,
        easing: "swing",
        step: function () {
          $this.text(Math.floor(this.countNum));
        },
        complete: function () {
          $this.text(this.countNum + "+");
        }
      }
    );
  });

  // -------------------------
  // Task 6: Loading spinner on submit
  // - Subscribe Form
  // - Contact Form
  // -------------------------

  $("#subscribeForm").on("submit", function (e) {
    e.preventDefault();

    const btn = $("#subscribeBtn");
    btn.prop("disabled", true);
    btn.html('<span class="spinner-border spinner-border-sm"></span> Please wait…');

    setTimeout(function () {
      btn.prop("disabled", false);
      btn.text("Subscribe");

      showToast("✅ Subscribed successfully!");

      // close popup
      $("#modalSubscribe").removeClass("show");
      $("body").css("overflow", "");
    }, 1500);
  });

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    const btn = $("#contactBtn");
    btn.prop("disabled", true);
    btn.html('<span class="spinner-border spinner-border-sm"></span> Please wait…');

    setTimeout(function () {
      btn.prop("disabled", false);
      btn.text("Send");

      showToast("📨 Message sent. Thank you!");

      // close popup
      $("#modalContact").removeClass("show");
      $("body").css("overflow", "");
    }, 1500);
  });

  // -------------------------
  // Popup open/close logic
  // -------------------------

  $("#openSubscribe").on("click", function () {
    $("#modalSubscribe").addClass("show");
    $("body").css("overflow", "hidden");
  });

  $("#openContact").on("click", function () {
    $("#modalContact").addClass("show");
    $("body").css("overflow", "hidden");
  });

  $(".popup-close, .popup-cancel").on("click", function () {
    $("#modalSubscribe, #modalContact").removeClass("show");
    $("body").css("overflow", "");
  });

  // click outside to close
  $(".modal-overlay").on("click", function (e) {
    if ($(e.target).is(".modal-overlay")) {
      $(this).removeClass("show");
      $("body").css("overflow", "");
    }
  });
  function showToast(message) {
  const toast = $("#toast");
  toast.text(message).fadeIn(300);
  setTimeout(() => toast.fadeOut(600), 2000);
  }
  // === Task 8: Copy to Clipboard ===
  $("#copyBtn").on("click", function () {
  const textToCopy = $("#copyText").text().trim();

  // 1. Copy text programmatically
  // Option A: modern way (navigator.clipboard)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy);
  } else {
    // Fallback for older browsers
    const tempInput = $("<input>");
    $("body").append(tempInput);
    tempInput.val(textToCopy).select();
    document.execCommand("copy");
    tempInput.remove();
  }

  // 2. Change button to "Copied"
  const btn = $("#copyBtn");
  btn.prop("disabled", true);
  btn.text("✅ Copied!");

  // 3. Show tooltip
  const tip = $("#copyTooltip");
  tip.addClass("show"); // tooltip becomes visible

  // 4. After 1.5 seconds, go back to normal
  setTimeout(function () {
    btn.prop("disabled", false);
    btn.text("📋 Copy");
    tip.removeClass("show"); // hide tooltip again
  }, 1500);
 });
 // ===== Task 9: Lazy Loading Images =====

// function to check which images are visible
function loadVisibleImages() {
  const windowBottom = $(window).scrollTop() + $(window).height();

  $(".lazy-img").each(function () {
    const $img = $(this);

    // already loaded? skip
    if ($img.attr("data-loaded") === "true") {
      return;
    }

    // find this img position on the page
    const imgTop = $img.offset().top;

    // if image top is inside the viewport (or a bit above bottom)
    if (imgTop < windowBottom + 100) {
      // get real image URL from data-src
      const realSrc = $img.attr("data-src");

      // change src to real image
      $img.attr("src", realSrc);

      // mark as loaded
      $img.attr("data-loaded", "true");

      // remove blur style after load
      $img.addClass("lazy-loaded");
    }
  });
}

// run on page load
loadVisibleImages();

// run on scroll
$(window).on("scroll", function () {
  loadVisibleImages();
});

// also run on resize (in case of screen resize / rotation)
$(window).on("resize", function () {
  loadVisibleImages();
});
});