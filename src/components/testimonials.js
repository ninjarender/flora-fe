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

    createSlider({
      track,
      prevBtn: document.getElementById('testimonials-prev'),
      nextBtn: document.getElementById('testimonials-next'),
    }).init();
  } catch (err) {
    track.innerHTML = `<p style="color:#e53935;padding:16px;">Failed to load reviews.</p>`;
    console.error(err);
  }
}
