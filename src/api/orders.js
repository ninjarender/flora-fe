import { api } from './client.js';

export function createOrder(payload) {
  return api.post('/orders', payload);
}
