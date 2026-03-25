export function renderHero() {
  const el = document.getElementById('hero');

  el.innerHTML = `
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
  `;
}
