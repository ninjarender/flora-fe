import { getBestsellers } from '../api/products.js';
import { formatPrice } from '../utils/format.js';
import { createSlider } from '../utils/slider.js';

function createProductCard(product, onOpen) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', product.name);

  const imgSrc = product.image || '/assets/hero-bg.jpg';

  card.innerHTML = `
    <img
      class="product-card__image"
      src="${imgSrc}"
      alt="${product.name}"
      loading="lazy"
    />
    <div class="product-card__body">
      <div>
        <p class="product-card__name">${product.name}</p>
        <p class="product-card__desc">${product.description}</p>
      </div>
      <p class="product-card__price">${formatPrice(product.price)}</p>
    </div>
  `;

  card.addEventListener('click', () => onOpen(product.id));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') onOpen(product.id);
  });

  return card;
}

export async function renderBestsellers(onProductOpen) {
  const el = document.getElementById('bestsellers');
  el.className = 'section';

  el.innerHTML = `
    <div class="container">
      <div class="bestsellers__header">
        <h2 class="section-heading">Top-Selling Bouquets</h2>
      </div>
      <div class="bestsellers__track-wrap">
        <div class="bestsellers__track" id="bestsellers-track"></div>
      </div>
      <div class="bestsellers__controls">
        <div class="slider-dots" id="bestsellers-dots"></div>
        <div style="display:flex;gap:16px;">
          <button class="slider-arrow" id="bestsellers-prev" aria-label="Previous">
            <img src="/assets/icon-arrow-left.svg" alt="" width="24" height="24" />
          </button>
          <button class="slider-arrow" id="bestsellers-next" aria-label="Next">
            <img src="/assets/icon-arrow-right.svg" alt="" width="24" height="24" />
          </button>
        </div>
      </div>
    </div>
  `;

  const track = document.getElementById('bestsellers-track');
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  track.appendChild(spinner);

  try {
    const { data: products } = await getBestsellers();
    track.innerHTML = '';

    products.forEach((p) => {
      track.appendChild(createProductCard(p, onProductOpen));
    });

    const slider = createSlider({
      track,
      prevBtn: document.getElementById('bestsellers-prev'),
      nextBtn: document.getElementById('bestsellers-next'),
      dotsEl: document.getElementById('bestsellers-dots'),
    });

    slider.init();
  } catch (err) {
    track.innerHTML = `<p style="color:#e53935;padding:16px;">Failed to load bestsellers.</p>`;
    console.error(err);
  }
}
