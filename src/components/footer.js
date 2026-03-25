export function renderFooter() {
  const el = document.getElementById('footer');

  el.innerHTML = `
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
  `;
}
