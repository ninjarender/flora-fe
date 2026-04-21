(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){let e=document.querySelector(`.navbar__hamburger`),t=document.getElementById(`mobile-menu`);e.addEventListener(`click`,()=>{let n=t.classList.toggle(`is-open`);e.setAttribute(`aria-expanded`,String(n))}),t.querySelectorAll(`a`).forEach(n=>{n.addEventListener(`click`,()=>{t.classList.remove(`is-open`),e.setAttribute(`aria-expanded`,`false`)})})}var t=`/api`;async function n(e,n={}){let r=await fetch(`${t}${e}`,{headers:{"Content-Type":`application/json`},...n}),i=await r.json();if(!r.ok)throw Error(i.error||`Request failed: ${r.status}`);return i}var r={get:e=>n(e),post:(e,t)=>n(e,{method:`POST`,body:JSON.stringify(t)})};function i(){return r.get(`/bestsellers`)}function a(e=1){return r.get(`/products?page=${e}`)}function o(e){return r.get(`/products/${e}`)}function s(e){let t=e/100;return t%1==0?`$${t}`:`$${t.toFixed(2)}`}function c({track:e,prevBtn:t,nextBtn:n,dotsEl:r}){let i=0;function a(){let t=e.children[0];return t?t.offsetWidth:0}function o(){return parseFloat(getComputedStyle(e).gap)||32}function s(){let t=a(),n=o(),r=e.parentElement.offsetWidth;return t?Math.max(1,Math.round((r+n)/(t+n))):1}function c(){return Math.max(0,e.children.length-s())}function l(t){i=Math.min(Math.max(t,0),c());let n=a(),r=o();e.style.transform=`translateX(-${i*(n+r)}px)`,u(),d()}function u(){r&&r.querySelectorAll(`.slider-dot`).forEach((e,t)=>{e.classList.toggle(`is-active`,t===i)})}function d(){t&&(t.disabled=i===0),n&&(n.disabled=i>=c())}function f(){if(!r)return;r.innerHTML=``;let e=c()+1;for(let t=0;t<e;t++){let e=document.createElement(`button`);e.className=`slider-dot`+(t===0?` is-active`:``),e.setAttribute(`aria-label`,`Go to slide ${t+1}`),e.addEventListener(`click`,()=>l(t)),r.appendChild(e)}}t?.addEventListener(`click`,()=>l(i-1)),n?.addEventListener(`click`,()=>l(i+1));let p=new ResizeObserver(()=>{f(),l(Math.min(i,c()))});return p.observe(e.parentElement),{init(){f(),l(0)},refresh(){f(),l(0)},destroy(){p.disconnect()}}}function l(e,t){let n=document.createElement(`div`);return n.className=`product-card`,n.setAttribute(`role`,`button`),n.setAttribute(`tabindex`,`0`),n.setAttribute(`aria-label`,e.name),n.innerHTML=`
    <img
      class="product-card__image"
      src="${e.image||`/assets/hero-bg.jpg`}"
      alt="${e.name}"
      loading="lazy"
    />
    <div class="product-card__body">
      <div>
        <p class="product-card__name">${e.name}</p>
        <p class="product-card__desc">${e.description}</p>
      </div>
      <p class="product-card__price">${s(e.price)}</p>
    </div>
  `,n.addEventListener(`click`,()=>t(e.id)),n.addEventListener(`keydown`,n=>{(n.key===`Enter`||n.key===` `)&&t(e.id)}),n}async function u(e){let t=document.getElementById(`bestsellers-track`),n=document.createElement(`div`);n.className=`spinner`,t.appendChild(n);try{let{data:n}=await i();t.innerHTML=``,n.forEach(n=>{t.appendChild(l(n,e))}),c({track:t,prevBtn:document.getElementById(`bestsellers-prev`),nextBtn:document.getElementById(`bestsellers-next`),dotsEl:document.getElementById(`bestsellers-dots`)}).init()}catch(e){t.innerHTML=`<p style="color:#e53935;padding:16px;">Failed to load bestsellers.</p>`,console.error(e)}}function d(e,t){let n=document.createElement(`div`);return n.className=`product-card`,n.setAttribute(`role`,`button`),n.setAttribute(`tabindex`,`0`),n.setAttribute(`aria-label`,e.name),n.innerHTML=`
    <img
      class="product-card__image"
      src="${e.image||`/assets/hero-bg.jpg`}"
      alt="${e.name}"
      loading="lazy"
    />
    <div class="product-card__body">
      <div>
        <p class="product-card__name">${e.name}</p>
        <p class="product-card__desc">${e.description}</p>
      </div>
      <p class="product-card__price">${s(e.price)}</p>
    </div>
  `,n.addEventListener(`click`,()=>t(e.id)),n.addEventListener(`keydown`,n=>{(n.key===`Enter`||n.key===` `)&&t(e.id)}),n}async function f(e){let t=document.getElementById(`bouquets-grid`),n=document.getElementById(`bouquets-more`),r=1,i=1,o=!1;async function s(s){if(!o){o=!0,n.disabled=!0,n.textContent=`Loading…`;try{let{data:n,meta:o}=await a(s);i=o.totalPages,n.forEach(n=>{t.appendChild(d(n,e))}),r=o.page}catch(e){t.insertAdjacentHTML(`beforeend`,`<p style="color:#e53935;grid-column:1/-1;">Failed to load products.</p>`),console.error(e)}finally{o=!1,n.disabled=r>=i,n.textContent=r>=i?`All loaded`:`Show More`}}}n.addEventListener(`click`,()=>s(r+1)),await s(1)}function p(e=1,t=10){return r.get(`/reviews?page=${e}&limit=${t}`)}function m(e){let t=document.createElement(`div`);return t.className=`review-card`,t.innerHTML=`
    <p class="review-card__quote">"${e.review}"</p>
    <p class="review-card__author">${e.name}</p>
  `,t}async function h(){let e=document.getElementById(`testimonials-track`),t=document.createElement(`div`);t.className=`spinner`,e.appendChild(t);try{let{data:t}=await p(1,20);e.innerHTML=``,t.forEach(t=>{e.appendChild(m(t))}),c({track:e,prevBtn:document.getElementById(`testimonials-prev`),nextBtn:document.getElementById(`testimonials-next`)}).init()}catch(t){e.innerHTML=`<p style="color:#e53935;padding:16px;">Failed to load reviews.</p>`,console.error(t)}}function g(e){return r.post(`/orders`,e)}var _=document.getElementById(`modal-overlay`);function v(){_.classList.add(`is-open`),_.setAttribute(`aria-hidden`,`false`),document.body.style.overflow=`hidden`}function y(){_.classList.remove(`is-open`),_.setAttribute(`aria-hidden`,`true`),_.innerHTML=``,document.body.style.overflow=``}_.addEventListener(`click`,e=>{e.target===_&&y()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&y()});function b(e,t){_.innerHTML=`
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
  `,_.querySelector(`.modal__close`).addEventListener(`click`,y),_.querySelector(`#order-form`).addEventListener(`submit`,async n=>{n.preventDefault();let r=_.querySelector(`#order-recipient`).value.trim(),i=_.querySelector(`#order-phone`).value.trim(),a=_.querySelector(`#order-address`).value.trim(),o=_.querySelector(`#order-notes`).value.trim(),s=_.querySelector(`#order-error`),c=[{el:_.querySelector(`#order-recipient`),val:r},{el:_.querySelector(`#order-phone`),val:i},{el:_.querySelector(`#order-address`),val:a}],l=!0;if(c.forEach(({el:e,val:t})=>{e.classList.toggle(`is-invalid`,!t),t||(l=!1)}),!l){s.textContent=`Please fill in all required fields.`;return}s.textContent=``;let u=_.querySelector(`#order-submit`);u.disabled=!0,u.textContent=`Sending…`;try{await g({recipient:r,phone:i,address:a,notes:o,quantity:t,productId:e.id}),y()}catch(e){s.textContent=e.message||`Something went wrong. Please try again.`,u.disabled=!1,u.textContent=`Go to Checkout`}})}async function x(e){_.innerHTML=`
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
  `,v(),_.querySelector(`.modal__close`).addEventListener(`click`,y);try{let{data:t}=await o(e),n=_.querySelector(`.modal`),r=1;n.innerHTML=`
      <button class="modal__close" aria-label="Close">&times;</button>
      <div class="modal__body">
        <img
          class="modal__image"
          src="${t.image||`/assets/hero-bg.jpg`}"
          alt="${t.name}"
        />
        <div class="modal__info">
          <h2 class="modal__name">${t.name}</h2>
          <p class="modal__price" id="pm-price">${s(t.price)}</p>
          <p class="modal__desc">${t.description}</p>

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
    `;let i=n.querySelector(`#pm-qty`);function a(e){r=Math.max(1,r+e),i.textContent=r}n.querySelector(`.modal__close`).addEventListener(`click`,y),n.querySelector(`#pm-dec`).addEventListener(`click`,()=>a(-1)),n.querySelector(`#pm-inc`).addEventListener(`click`,()=>a(1)),n.querySelector(`#pm-order`).addEventListener(`click`,()=>b(t,r))}catch(e){_.querySelector(`.modal`).innerHTML=`
      <button class="modal__close" aria-label="Close">&times;</button>
      <div style="padding:40px;text-align:center;color:#e53935;">
        Failed to load product. Please try again.
      </div>
    `,_.querySelector(`.modal__close`).addEventListener(`click`,y),console.error(e)}}e(),u(x),f(x),h();