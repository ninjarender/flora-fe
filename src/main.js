import './styles/main.css';

import { initNavbar } from './components/navbar.js';
import { renderBestsellers } from './components/bestsellers.js';
import { renderBouquets } from './components/bouquets.js';
import { renderTestimonials } from './components/testimonials.js';
import { openProductModal } from './components/modal.js';

initNavbar();

renderBestsellers(openProductModal);
renderBouquets(openProductModal);
renderTestimonials();
