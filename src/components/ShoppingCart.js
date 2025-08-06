import { getLocalStorage } from '../lib/localStorage.js';

const CART_KEY = 'so-cart';

/**
 * Reads the cart from localStorage and updates the cart icon in the header
 * to show the total number of items.
 */
export function updateCartIcon() {
  const cart = getLocalStorage(CART_KEY) || [];
  const countElement = document.querySelector('.cart-count');
  
  // Calculate total quantity of all items, not just the number of unique items.
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (countElement) {
    if (totalQuantity > 0) {
      countElement.textContent = totalQuantity;
      countElement.classList.remove('hide');
    } else {
      countElement.classList.add('hide');
    }
  }
}