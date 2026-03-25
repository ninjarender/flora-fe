import { getProduct } from '../api/products.js';
import { createOrder } from '../api/orders.js';
import { formatPrice } from '../utils/format.js';

const overlay = document.getElementById('modal-overlay');

function openOverlay() {
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = '';
  document.body.style.overflow = '';
}

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ─── Modal 2: Order form ─── */
function openOrderModal(product, qty) {
  overlay.innerHTML = `
    <div class="modal modal--order" role="dialog" aria-modal="true" aria-label="Place an order">
      <button class="modal__close" aria-label="Close">&times;</button>
      <h2 class="order-modal__title">Order</h2>
      <form class="order-form" id="order-form" novalidate>
        <div class="order-form__field">
          <label class="order-form__label" for="order-recipient">Name*</label>
          <input type="text" id="order-recipient" placeholder="Ann" autocomplete="name" />
        </div>
        <div class="order-form__field">
          <label class="order-form__label" for="order-phone">Phone*</label>
          <input type="tel" id="order-phone" placeholder="+1 (555) 123-4567" autocomplete="tel" />
        </div>
        <div class="order-form__field">
          <label class="order-form__label" for="order-address">Adress</label>
          <input type="text" id="order-address" placeholder="456 Floral Ave, Sydney NSW 2000 AU" autocomplete="street-address" />
        </div>
        <div class="order-form__field">
          <label class="order-form__label" for="order-notes">Message</label>
          <textarea id="order-notes" placeholder="Type your message..." rows="5"></textarea>
        </div>
        <div id="order-error" class="error-msg" role="alert"></div>
        <div class="order-form__footer">
          <button type="submit" class="btn" id="order-submit">Go to Checkout</button>
        </div>
      </form>
    </div>
  `;

  overlay.querySelector('.modal__close').addEventListener('click', closeModal);

  overlay.querySelector('#order-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const recipient = overlay.querySelector('#order-recipient').value.trim();
    const phone     = overlay.querySelector('#order-phone').value.trim();
    const address   = overlay.querySelector('#order-address').value.trim();
    const notes     = overlay.querySelector('#order-notes').value.trim();
    const errorEl   = overlay.querySelector('#order-error');

    const fields = [
      { el: overlay.querySelector('#order-recipient'), val: recipient },
      { el: overlay.querySelector('#order-phone'),     val: phone    },
      { el: overlay.querySelector('#order-address'),   val: address  },
    ];

    let valid = true;
    fields.forEach(({ el, val }) => {
      el.classList.toggle('is-invalid', !val);
      if (!val) valid = false;
    });

    if (!valid) {
      errorEl.textContent = 'Please fill in all required fields.';
      return;
    }

    errorEl.textContent = '';
    const submitBtn = overlay.querySelector('#order-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      await createOrder({ recipient, phone, address, notes, quantity: qty, productId: product.id });
      closeModal();
    } catch (err) {
      errorEl.textContent = err.message || 'Something went wrong. Please try again.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Go to Checkout';
    }
  });
}

/* ─── Modal 1: Product details ─── */
export async function openProductModal(productId) {
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="Product details">
      <button class="modal__close" aria-label="Close">&times;</button>
      <div class="modal__body">
        <div class="skeleton" style="min-height:380px;border-radius:16px;"></div>
        <div class="modal__info">
          <div class="skeleton" style="height:36px;width:70%;margin-bottom:8px;"></div>
          <div class="skeleton" style="height:24px;width:30%;margin-bottom:16px;"></div>
          <div class="skeleton" style="height:80px;width:100%;"></div>
        </div>
      </div>
    </div>
  `;

  openOverlay();
  overlay.querySelector('.modal__close').addEventListener('click', closeModal);

  try {
    const { data: product } = await getProduct(productId);
    const modal = overlay.querySelector('.modal');

    let qty = 1;

    modal.innerHTML = `
      <button class="modal__close" aria-label="Close">&times;</button>
      <div class="modal__body">
        <img
          class="modal__image"
          src="${product.image || '/assets/hero-bg.jpg'}"
          alt="${product.name}"
        />
        <div class="modal__info">
          <h2 class="modal__name">${product.name}</h2>
          <p class="modal__price" id="pm-price">${formatPrice(product.price)}</p>
          <p class="modal__desc">${product.description}</p>

          <div class="pm-actions">
            <button class="btn pm-order-btn" id="pm-order">Buy now</button>
            <div class="pm-qty">
              <button class="qty-btn" id="pm-dec" aria-label="Decrease quantity">−</button>
              <span class="qty-value" id="pm-qty">1</span>
              <button class="qty-btn" id="pm-inc" aria-label="Increase quantity">+</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const qtyEl = modal.querySelector('#pm-qty');

    function updateQty(delta) {
      qty = Math.max(1, qty + delta);
      qtyEl.textContent = qty;
    }

    modal.querySelector('.modal__close').addEventListener('click', closeModal);
    modal.querySelector('#pm-dec').addEventListener('click', () => updateQty(-1));
    modal.querySelector('#pm-inc').addEventListener('click', () => updateQty(1));
    modal.querySelector('#pm-order').addEventListener('click', () => openOrderModal(product, qty));
  } catch (err) {
    overlay.querySelector('.modal').innerHTML = `
      <button class="modal__close" aria-label="Close">&times;</button>
      <div style="padding:40px;text-align:center;color:#e53935;">
        Failed to load product. Please try again.
      </div>
    `;
    overlay.querySelector('.modal__close').addEventListener('click', closeModal);
    console.error(err);
  }
}
