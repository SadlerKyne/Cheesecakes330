import { loadHeaderFooter, highlightActiveLink } from '../utils.js';

const API_URL = 'https://dummyjson.com/comments?limit=10'; // Get 10 comments

/**
 * Creates the HTML for a single review card.
 * @param {object} review The review object from the API.
 * @returns {string} The HTML string for the review card.
 */
function reviewCardTemplate(review) {
  // Since the API doesn't provide a rating, we'll generate a random one for display
  const rating = (Math.random() * (5 - 4) + 4).toFixed(1);
  return `
    <div class="review-card carousel-slide">
      <div class="review-header">
        <h4>${review.user.username}</h4>
        <div class="review-rating">
          <div class="stars" style="--rating: ${rating};" aria-label="Rating of ${rating} out of 5 stars"></div>
          <span class="verified">Verified Purchase</span>
        </div>
      </div>
      <p class="review-text">"${review.body}"</p>
    </div>
  `;
}

/**
 * Renders a summary block based on the reviews data.
 * @param {Array} reviews The array of review objects.
 */
function renderReviewSummary(reviews) {
  const summaryContainer = document.querySelector('.review-summary-section');
  if (!reviews || reviews.length === 0) {
    summaryContainer.innerHTML = '<p>No review data available.</p>';
    return;
  }
  
  // For demonstration, we'll use a fixed average rating.
  const averageRating = 4.8;
  const totalReviews = reviews.length;

  summaryContainer.innerHTML = `
    <div class="rating-display">
      <p class="average-rating">${averageRating}</p>
      <div class="stars" style="--rating: ${averageRating};"></div>
      <p class="total-reviews">Based on ${totalReviews} reviews</p>
    </div>
    <div class="rating-breakdown">
      <div class="rating-bar-container"><span class="label">5 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 90%;"></div></div></div>
      <div class="rating-bar-container"><span class="label">4 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 5%;"></div></div></div>
      <div class="rating-bar-container"><span class="label">3 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 3%;"></div></div></div>
      <div class="rating-bar-container"><span class="label">2 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 1%;"></div></div></div>
      <div class="rating-bar-container"><span class="label">1 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 1%;"></div></div></div>
    </div>
  `;
}

/**
 * Sets up the functionality for the review carousel.
 */
function setupCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-btn.next');
  const prevButton = document.querySelector('.carousel-btn.prev');
  
  if (!slides || slides.length === 0) return;

  const slideWidth = slides[0].getBoundingClientRect().width;
  let currentIndex = 0;

  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };
  slides.forEach(setSlidePosition);

  const moveToSlide = (targetIndex) => {
    track.style.transform = 'translateX(-' + slides[targetIndex].style.left + ')';
    currentIndex = targetIndex;
    updateNavButtons();
  };
  
  const updateNavButtons = () => {
    prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
    nextButton.style.display = currentIndex === slides.length - 1 ? 'none' : 'block';
  };

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) moveToSlide(currentIndex - 1);
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) moveToSlide(currentIndex + 1);
  });
  
  updateNavButtons();
}

/**
 * Fetches and renders reviews, then initializes the carousel.
 */
async function renderReviews() {
  const reviewsContainer = document.querySelector('#reviews-list');
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const data = await response.json();
    const reviews = data.comments;

    if (reviews && Array.isArray(reviews)) {
      renderReviewSummary(reviews); // Render the summary
      reviewsContainer.innerHTML = reviews.map(review => reviewCardTemplate(review)).join('');
      setupCarousel(); // Set up the carousel after reviews are loaded
    } else {
      reviewsContainer.innerHTML = '<p>No reviews found.</p>';
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    reviewsContainer.innerHTML = '<p>Failed to load reviews.</p>';
  }
}

/**
 * Initializes the reviews page.
 */
async function initializeReviewsPage() {
  await loadHeaderFooter();
  highlightActiveLink();
  await renderReviews();
}

initializeReviewsPage();