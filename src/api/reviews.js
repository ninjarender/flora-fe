import { api } from './client.js';

export function getReviews(page = 1, limit = 10) {
  return api.get(`/reviews?page=${page}&limit=${limit}`);
}
