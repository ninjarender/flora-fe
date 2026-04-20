(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){let e=document.getElementById(`navbar`);e.innerHTML=`
    <div class="navbar__inner">
      <div class="navbar__logo">
        <a href="#" aria-label="Flora home">
          <img src="/assets/logo-small.svg" alt="Flora" width="84" height="36" />
        </a>
      </div>
      <nav class="navbar__nav" aria-label="Main navigation">
        <a href="#about">About Us</a>
        <a href="#bestsellers">Bestsellers</a>
        <a href="#bouquets">Bouquets</a>
        <a href="#testimonials">Feedback</a>
        <a href="#contact">Contacts</a>
      </nav>
      <div class="navbar__actions">
        <a href="#bouquets" class="btn btn--sm navbar__cta">Explore Bouquets</a>
        <button class="navbar__hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
    <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation">
      <a href="#about">About Us</a>
      <a href="#bestsellers">Bestsellers</a>
      <a href="#bouquets">Bouquets</a>
      <a href="#testimonials">Feedback</a>
      <a href="#contact">Contacts</a>
    </nav>
  `;let t=e.querySelector(`.navbar__hamburger`),n=e.querySelector(`.mobile-menu`);t.addEventListener(`click`,()=>{let e=n.classList.toggle(`is-open`);t.setAttribute(`aria-expanded`,String(e))}),n.querySelectorAll(`a`).forEach(e=>{e.addEventListener(`click`,()=>{n.classList.remove(`is-open`),t.setAttribute(`aria-expanded`,`false`)})})}function t(){let e=document.getElementById(`hero`);e.innerHTML=`
    <img class="hero__bg" src="/assets/hero-bg.jpg" alt="" aria-hidden="true" />
    <div class="hero__container">
    <div class="hero__content">
      <h1 class="hero__title">Brighten Your Day with Our Stunning Bouquets</h1>
      <div>
        <p class="hero__text">
          At Flora, we believe that every occasion deserves a beautiful bouquet.
          Our expertly crafted arrangements are designed to bring joy and elegance
          to your celebrations.
        </p>
        <div style="margin-top: 32px;">
          <a href="#bestsellers" class="btn">Explore Our Bestsellers</a>
        </div>
      </div>
    </div>
    </div>
  `}function n(){let e=document.getElementById(`about`);e.className=`section`,e.innerHTML=`
    <div class="container about__inner">
      <div class="about__content">
        <img class="about__flower" src="/assets/flower-icon.svg" alt="" aria-hidden="true" width="96" height="85" />
        <div class="about__text-block">
          <h2 class="section-heading">Our Passion for Floral Artistry</h2>
          <p class="section-sub">
            At Flora, we believe that every bouquet tells a story. Our team
            meticulously crafts each arrangement, blending creativity with the
            freshest blooms to create stunning pieces for every occasion.
          </p>
        </div>
      </div>
      <img
        class="about__image"
        src="/assets/about-florist.jpg"
        alt="Female florist arranging white peony flowers in shop"
        loading="lazy"
      />
    </div>
  `}var r=`/api`;async function i(e,t={}){let n=await fetch(`${r}${e}`,{headers:{"Content-Type":`application/json`},...t}),i=await n.json();if(!n.ok)throw Error(i.error||`Request failed: ${n.status}`);return i}var a={get:e=>i(e),post:(e,t)=>i(e,{method:`POST`,body:JSON.stringify(t)})};function o(){return a.get(`/bestsellers`)}function s(e=1){return a.get(`/products?page=${e}`)}function c(e){return a.get(`/products/${e}`)}function l(e){let t=e/100;return t%1==0?`$${t}`:`$${t.toFixed(2)}`}function u({track:e,prevBtn:t,nextBtn:n,dotsEl:r}){let i=0;function a(){let t=e.children[0];return t?t.offsetWidth:0}function o(){return parseFloat(getComputedStyle(e).gap)||32}function s(){let t=a(),n=o(),r=e.parentElement.offsetWidth;return t?Math.max(1,Math.round((r+n)/(t+n))):1}function c(){return Math.max(0,e.children.length-s())}function l(t){i=Math.min(Math.max(t,0),c());let n=a(),r=o();e.style.transform=`translateX(-${i*(n+r)}px)`,u(),d()}function u(){r&&r.querySelectorAll(`.slider-dot`).forEach((e,t)=>{e.classList.toggle(`is-active`,t===i)})}function d(){t&&(t.disabled=i===0),n&&(n.disabled=i>=c())}function f(){if(!r)return;r.innerHTML=``;let e=c()+1;for(let t=0;t<e;t++){let e=document.createElement(`button`);e.className=`slider-dot`+(t===0?` is-active`:``),e.setAttribute(`aria-label`,`Go to slide ${t+1}`),e.addEventListener(`click`,()=>l(t)),r.appendChild(e)}}t?.addEventListener(`click`,()=>l(i-1)),n?.addEventListener(`click`,()=>l(i+1));let p=new ResizeObserver(()=>{f(),l(Math.min(i,c()))});return p.observe(e.parentElement),{init(){f(),l(0)},refresh(){f(),l(0)},destroy(){p.disconnect()}}}function d(e,t){let n=document.createElement(`div`);return n.className=`product-card`,n.setAttribute(`role`,`button`),n.setAttribute(`tabindex`,`0`),n.setAttribute(`aria-label`,e.name),n.innerHTML=`
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
      <p class="product-card__price">${l(e.price)}</p>
    </div>
  `,n.addEventListener(`click`,()=>t(e.id)),n.addEventListener(`keydown`,n=>{(n.key===`Enter`||n.key===` `)&&t(e.id)}),n}async function f(e){let t=document.getElementById(`bestsellers`);t.className=`section`,t.innerHTML=`
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
  `;let n=document.getElementById(`bestsellers-track`),r=document.createElement(`div`);r.className=`spinner`,n.appendChild(r);try{let{data:t}=await o();n.innerHTML=``,t.forEach(t=>{n.appendChild(d(t,e))}),u({track:n,prevBtn:document.getElementById(`bestsellers-prev`),nextBtn:document.getElementById(`bestsellers-next`),dotsEl:document.getElementById(`bestsellers-dots`)}).init()}catch(e){n.innerHTML=`<p style="color:#e53935;padding:16px;">Failed to load bestsellers.</p>`,console.error(e)}}function p(e,t){let n=document.createElement(`div`);return n.className=`product-card`,n.setAttribute(`role`,`button`),n.setAttribute(`tabindex`,`0`),n.setAttribute(`aria-label`,e.name),n.innerHTML=`
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
      <p class="product-card__price">${l(e.price)}</p>
    </div>
  `,n.addEventListener(`click`,()=>t(e.id)),n.addEventListener(`keydown`,n=>{(n.key===`Enter`||n.key===` `)&&t(e.id)}),n}async function m(e){let t=document.getElementById(`bouquets`);t.className=`section`,t.innerHTML=`
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
  `;let n=document.getElementById(`bouquets-grid`),r=document.getElementById(`bouquets-more`),i=1,a=1,o=!1;async function c(t){if(!o){o=!0,r.disabled=!0,r.textContent=`Loading…`;try{let{data:r,meta:o}=await s(t);a=o.totalPages,r.forEach(t=>{n.appendChild(p(t,e))}),i=o.page}catch(e){n.insertAdjacentHTML(`beforeend`,`<p style="color:#e53935;grid-column:1/-1;">Failed to load products.</p>`),console.error(e)}finally{o=!1,r.disabled=i>=a,r.textContent=i>=a?`All loaded`:`Show More`}}}r.addEventListener(`click`,()=>c(i+1)),await c(1)}function h(e=1,t=10){return a.get(`/reviews?page=${e}&limit=${t}`)}function g(e){let t=document.createElement(`div`);return t.className=`review-card`,t.innerHTML=`
    <p class="review-card__quote">"${e.review}"</p>
    <p class="review-card__author">${e.name}</p>
  `,t}async function _(){let e=document.getElementById(`testimonials`);e.className=`section`,e.innerHTML=`
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
  `;let t=document.getElementById(`testimonials-track`),n=document.createElement(`div`);n.className=`spinner`,t.appendChild(n);try{let{data:e}=await h(1,20);t.innerHTML=``,e.forEach(e=>{t.appendChild(g(e))}),u({track:t,prevBtn:document.getElementById(`testimonials-prev`),nextBtn:document.getElementById(`testimonials-next`)}).init()}catch(e){t.innerHTML=`<p style="color:#e53935;padding:16px;">Failed to load reviews.</p>`,console.error(e)}}function v(){let e=document.getElementById(`contact`);e.className=`section`,e.innerHTML=`
    <div class="container">
      <div class="contact__top">
        <div class="contact__info">
          <p class="contact__tagline">Connect</p>
          <div class="contact__text-block">
            <h2 class="section-heading">Get in Touch</h2>
            <p class="section-sub">We're here to assist you with all your floral needs and inquiries.</p>
          </div>
        </div>
        <div class="contact__details">
          <div class="contact__item">
            <img class="contact__item-icon" src="/assets/icon-phone.svg" alt="" aria-hidden="true" />
            <div>
              <p class="contact__item-label">Phone</p>
              <a href="tel:+15551234567" class="contact__item-value contact__item-value--link">
                +1 (555) 123-4567
              </a>
            </div>
          </div>
          <div class="contact__item">
            <img class="contact__item-icon" src="/assets/icon-map.svg" alt="" aria-hidden="true" />
            <div>
              <p class="contact__item-label">Store</p>
              <p class="contact__item-value">456 Floral Ave, Sydney NSW 2000 AU</p>
            </div>
          </div>
        </div>
      </div>
      <img
        class="contact__photo"
        src="/assets/contact-florist.jpg"
        alt="Florist holding beautiful flowers in flower shop"
        loading="lazy"
      />
    </div>
  `}function y(){let e=document.getElementById(`footer`);e.innerHTML=`
    <div class="section--md">
      <div class="container footer__inner">
        <div class="footer__top">
          <div class="footer__logo">
            <a href="#" aria-label="Flora home">
              <img src="/assets/logo-large.svg" alt="Flora" width="294" height="126" />
            </a>
          </div>
          <nav class="footer__nav" aria-label="Footer navigation">
            <a href="#about">About Us</a>
            <a href="#bestsellers">Bestsellers</a>
            <a href="#bouquets">Bouquets</a>
            <a href="#testimonials">Feedback</a>
            <a href="#contact">Contacts</a>
          </nav>
          <div class="footer__social">
            <a href="#" aria-label="Facebook">
              <img src="/assets/icon-facebook.svg" alt="Facebook" width="24" height="24" />
            </a>
            <a href="#" aria-label="Instagram">
              <img src="/assets/icon-instagram.svg" alt="Instagram" width="24" height="24" />
            </a>
            <a href="#" aria-label="X (Twitter)">
              <img src="/assets/icon-x.svg" alt="X" width="24" height="24" />
            </a>
          </div>
        </div>
        <div class="footer__bottom">
          <div class="footer__divider"></div>
          <p class="footer__copy">© 2025 Flora. All rights reserved.</p>
        </div>
      </div>
    </div>
  `}function b(e){return a.post(`/orders`,e)}var x=document.getElementById(`modal-overlay`);function S(){x.classList.add(`is-open`),x.setAttribute(`aria-hidden`,`false`),document.body.style.overflow=`hidden`}function C(){x.classList.remove(`is-open`),x.setAttribute(`aria-hidden`,`true`),x.innerHTML=``,document.body.style.overflow=``}x.addEventListener(`click`,e=>{e.target===x&&C()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&C()});function w(e,t){x.innerHTML=`
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
  `,x.querySelector(`.modal__close`).addEventListener(`click`,C),x.querySelector(`#order-form`).addEventListener(`submit`,async n=>{n.preventDefault();let r=x.querySelector(`#order-recipient`).value.trim(),i=x.querySelector(`#order-phone`).value.trim(),a=x.querySelector(`#order-address`).value.trim(),o=x.querySelector(`#order-notes`).value.trim(),s=x.querySelector(`#order-error`),c=[{el:x.querySelector(`#order-recipient`),val:r},{el:x.querySelector(`#order-phone`),val:i},{el:x.querySelector(`#order-address`),val:a}],l=!0;if(c.forEach(({el:e,val:t})=>{e.classList.toggle(`is-invalid`,!t),t||(l=!1)}),!l){s.textContent=`Please fill in all required fields.`;return}s.textContent=``;let u=x.querySelector(`#order-submit`);u.disabled=!0,u.textContent=`Sending…`;try{await b({recipient:r,phone:i,address:a,notes:o,quantity:t,productId:e.id}),C()}catch(e){s.textContent=e.message||`Something went wrong. Please try again.`,u.disabled=!1,u.textContent=`Go to Checkout`}})}async function T(e){x.innerHTML=`
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
  `,S(),x.querySelector(`.modal__close`).addEventListener(`click`,C);try{let{data:t}=await c(e),n=x.querySelector(`.modal`),r=1;n.innerHTML=`
      <button class="modal__close" aria-label="Close">&times;</button>
      <div class="modal__body">
        <img
          class="modal__image"
          src="${t.image||`/assets/hero-bg.jpg`}"
          alt="${t.name}"
        />
        <div class="modal__info">
          <h2 class="modal__name">${t.name}</h2>
          <p class="modal__price" id="pm-price">${l(t.price)}</p>
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
    `;let i=n.querySelector(`#pm-qty`);function a(e){r=Math.max(1,r+e),i.textContent=r}n.querySelector(`.modal__close`).addEventListener(`click`,C),n.querySelector(`#pm-dec`).addEventListener(`click`,()=>a(-1)),n.querySelector(`#pm-inc`).addEventListener(`click`,()=>a(1)),n.querySelector(`#pm-order`).addEventListener(`click`,()=>w(t,r))}catch(e){x.querySelector(`.modal`).innerHTML=`
      <button class="modal__close" aria-label="Close">&times;</button>
      <div style="padding:40px;text-align:center;color:#e53935;">
        Failed to load product. Please try again.
      </div>
    `,x.querySelector(`.modal__close`).addEventListener(`click`,C),console.error(e)}}e(),t(),n(),f(T),m(T),_(),v(),y();