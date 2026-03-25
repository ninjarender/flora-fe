export function renderNavbar() {
  const el = document.getElementById('navbar');

  el.innerHTML = `
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
  `;

  const hamburger = el.querySelector('.navbar__hamburger');
  const mobileMenu = el.querySelector('.mobile-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}
