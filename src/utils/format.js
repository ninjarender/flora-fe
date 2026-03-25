/**
 * Converts price from cents to a formatted dollar string.
 * @param {number} cents
 * @returns {string} e.g. "$35"
 */
export function formatPrice(cents) {
  const dollars = cents / 100;
  return dollars % 1 === 0
    ? `$${dollars}`
    : `$${dollars.toFixed(2)}`;
}
