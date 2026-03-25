import { getReviews } from '../api/reviews.js';
import { createSlider } from '../utils/slider.js';

function createReviewCard(review) {
  const card = document.createElement('div');
  card.className = 'review-card';
  card.innerHTML = `
    <p class="review-card__quote">"${review.review}"</p>
    <p class="review-card__author">${review.name}</p>
  `;
  return card;
}

export async function renderTestimonials() {
  const el = document.getElementById('testimonials');
  el.className = 'section';

  el.innerHTML = `
    <div class="container">
      <div class="testimonials__header">
        <h2 class="section-heading">What our clients say</h2>
      </div>
      <div class="testimonials__track-wrap">
        <div class="testimonials__track" id="testimonials-track"></div>
      </div>
      <div class="testimonials__controls">
        <div style="display:flex;gap:16px;">
          <button class="slider-arrow" id="testimonials-prev" aria-label="Previous">
            <img src="/assets/icon-arrow-left.svg" alt="" width="24" height="24" />
          </button>
          <button class="slider-arrow" id="testimonials-next" aria-label="Next">
            <img src="/assets/icon-arrow-right.svg" alt="" width="24" height="24" />
          </button>
        </div>
      </div>
    </div>
  `;

  const track = document.getElementById('testimonials-track');
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  track.appendChild(spinner);

  try {
    const { data: reviews } = await getReviews(1, 20);
    track.innerHTML = '';

    reviews.forEach((r) => {
      track.appendChild(createReviewCard(r));
    });

    const slider = createSlider({
      track,
      prevBtn: document.getElementById('testimonials-prev'),
      nextBtn: document.getElementById('testimonials-next'),
    });

    slider.init();
  } catch (err) {
    track.innerHTML = `<p style="color:#e53935;padding:16px;">Failed to load reviews.</p>`;
    console.error(err);
  }
}
