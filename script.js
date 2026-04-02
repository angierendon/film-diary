// ============================================================
// script.js — My Film Diary
// Handles two things:
//   1. Page navigation (switching between intro and gallery)
//   2. Slideshow logic (prev/next, dots, film strip holes)
// ============================================================


// ── PAGE NAVIGATION ──────────────────────────────────────────
// These two functions switch between the intro page and the
// gallery page by adding/removing the "active" CSS class.
// The buttons in index.html call these functions with onclick.
// ─────────────────────────────────────────────────────────────

// Called when the user clicks "View the Gallery →"
function showGallery() {
  document.getElementById('intro-page').classList.remove('active');
  document.getElementById('gallery-page').classList.add('active');
}

// Called when the user clicks "← Back to intro"
function showIntro() {
  document.getElementById('gallery-page').classList.remove('active');
  document.getElementById('intro-page').classList.add('active');
}


// ── SLIDESHOW SETUP ───────────────────────────────────────────
// Runs when the page first loads to set up the slideshow.
// ─────────────────────────────────────────────────────────────

// Track which slide is currently showing (0 = first slide)
let current = 0;

// Get all slide elements from the HTML
const slides = document.querySelectorAll('.slide');

// Total number of slides
const total = slides.length;


// ── FILM STRIP HOLES ──────────────────────────────────────────
// The film strip bars are empty divs in the HTML.
// This loop fills them with <span> elements that look like
// the rectangular holes on the edge of real film.
// ─────────────────────────────────────────────────────────────
['stripTop', 'stripBottom'].forEach(function(id) {
  const strip = document.getElementById(id);
  for (let i = 0; i < 24; i++) {
    strip.innerHTML += '<span></span>'; // each span = one film hole
  }
});


// ── DOT INDICATORS ───────────────────────────────────────────
// Creates one clickable dot per slide and adds them to the
// #dots container in the HTML. Clicking a dot jumps to
// that slide by calling goTo().
// ─────────────────────────────────────────────────────────────
const dotsContainer = document.getElementById('dots');

slides.forEach(function(_, i) {
  // Create a new div element for each dot
  const dot = document.createElement('div');
  dot.classList.add('dot');

  // The first dot starts as active (matches the first slide)
  if (i === 0) dot.classList.add('active');

  // Clicking a dot calls goTo() with that dot's index number
  dot.addEventListener('click', function() {
    goTo(i);
  });

  // Add the dot to the dots container in the HTML
  dotsContainer.appendChild(dot);
});


// ── goTo(index) ───────────────────────────────────────────────
// Jumps directly to a specific slide by its index number.
// Updates the visible slide, the active dot, and the
// enabled/disabled state of the prev/next buttons.
// ─────────────────────────────────────────────────────────────
function goTo(index) {
  // Hide the current slide and deactivate its dot
  slides[current].classList.remove('active');
  dotsContainer.children[current].classList.remove('active');

  // Update the current index to the new slide
  current = index;

  // Show the new slide and activate its dot
  slides[current].classList.add('active');
  dotsContainer.children[current].classList.add('active');

  // Disable the Prev button if we're on the first slide
  document.getElementById('prevBtn').disabled = (current === 0);

  // Disable the Next button if we're on the last slide
  document.getElementById('nextBtn').disabled = (current === total - 1);
}


// ── changeSlide(direction) ────────────────────────────────────
// Called by the Prev and Next buttons in index.html.
// direction = -1 for Prev, +1 for Next.
// Calculates the next slide index and calls goTo() if valid.
// ─────────────────────────────────────────────────────────────
function changeSlide(direction) {
  const next = current + direction;

  // Only move if the next index is within range (0 to total-1)
  if (next >= 0 && next < total) {
    goTo(next);
  }
}
