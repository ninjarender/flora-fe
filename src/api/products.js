import { api } from './client.js';

export function getBestsellers() {
  return api.get('/bestsellers');
}

export function getProducts(page = 1) {
  return api.get(`/products?page=${page}`);
}

export function getProduct(id) {
  return api.get(`/products/${id}`);
}
