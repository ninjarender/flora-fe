import './styles/main.css';

import { renderNavbar } from './components/navbar.js';
import { renderHero } from './components/hero.js';
import { renderAbout } from './components/about.js';
import { renderBestsellers } from './components/bestsellers.js';
import { renderBouquets } from './components/bouquets.js';
import { renderTestimonials } from './components/testimonials.js';
import { renderContact } from './components/contact.js';
import { renderFooter } from './components/footer.js';
import { openProductModal } from './components/modal.js';

renderNavbar();
renderHero();
renderAbout();

renderBestsellers(openProductModal);
renderBouquets(openProductModal);
renderTestimonials();

renderContact();
renderFooter();
