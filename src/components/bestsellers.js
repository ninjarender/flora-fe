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

    createSlider({
      track,
      prevBtn: document.getElementById('bestsellers-prev'),
      nextBtn: document.getElementById('bestsellers-next'),
      dotsEl: document.getElementById('bestsellers-dots'),
    }).init();
  } catch (err) {
    track.innerHTML = `<p style="color:#e53935;padding:16px;">Failed to load bestsellers.</p>`;
    console.error(err);
  }
}
