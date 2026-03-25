import { getProducts } from '../api/products.js';
import { formatPrice } from '../utils/format.js';

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

export async function renderBouquets(onProductOpen) {
  const el = document.getElementById('bouquets');
  el.className = 'section';

  el.innerHTML = `
    <div class="container">
      <div class="bouquets__header">
        <h2 class="section-heading">Bouquets</h2>
        <p class="section-sub">Explore our stunning selection of fresh flower bouquets.</p>
      </div>
      <div class="bouquets__grid" id="bouquets-grid"></div>
      <div class="bouquets__footer">
        <button class="btn btn--wide" id="bouquets-more">Show More</button>
      </div>
    </div>
  `;

  const grid = document.getElementById('bouquets-grid');
  const moreBtn = document.getElementById('bouquets-more');

  let currentPage = 1;
  let totalPages = 1;
  let loading = false;

  async function loadPage(page) {
    if (loading) return;
    loading = true;
    moreBtn.disabled = true;
    moreBtn.textContent = 'Loading…';

    try {
      const { data: products, meta } = await getProducts(page);
      totalPages = meta.totalPages;

      products.forEach((p) => {
        grid.appendChild(createProductCard(p, onProductOpen));
      });

      currentPage = meta.page;
    } catch (err) {
      grid.insertAdjacentHTML(
        'beforeend',
        `<p style="color:#e53935;grid-column:1/-1;">Failed to load products.</p>`
      );
      console.error(err);
    } finally {
      loading = false;
      moreBtn.disabled = currentPage >= totalPages;
      moreBtn.textContent = currentPage >= totalPages ? 'All loaded' : 'Show More';
    }
  }

  moreBtn.addEventListener('click', () => loadPage(currentPage + 1));

  await loadPage(1);
}
