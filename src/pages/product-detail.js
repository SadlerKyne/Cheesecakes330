import { loadHeaderFooter, highlightActiveLink, getParam } from '../utils.js';
import { setLocalStorage, getLocalStorage } from '../lib/localStorage.js';

let allProducts = [];
const CART_KEY = 'so-cart';


function renderProductDetails(product) {
  const container = document.querySelector('#product-detail-container');
  container.innerHTML = `
    <section class="product-detail">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-detail-image">
      </div>
      <div class="product-info-container">
        <h2 class="product-title">${product.name}</h2>
        <p class="product-description">${product.description}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        
        <div class="quantity-selector">
          <button type="button" class="quantity-btn minus" aria-label="Decrease quantity">-</button>
          <input type="number" id="quantity-input" class="quantity-input" value="1" min="1">
          <button type="button" class="quantity-btn plus" aria-label="Increase quantity">+</button>
        </div>

        <button class="btn-primary" id="addToCartBtn" data-id="${product.id}">Add to Cart</button>
      </div>
    </section>
  `;
}

// Handles adding a product to the cart with quantity
function addToCart(productId) {
  let cart = getLocalStorage(CART_KEY) || [];
  const quantity = parseInt(document.querySelector('#quantity-input').value);
  
  // Find if the item is already in the cart
  const existingItemIndex = cart.findIndex(item => item.id === productId);

  if (existingItemIndex > -1) {
    // If it exists, update the quantity
    cart[existingItemIndex].quantity += quantity;
  } else {
    // If it's a new item, find its details and add it to the cart
    const productToAdd = allProducts.find(item => item.id === productId);
    if (productToAdd) {
      // Add only necessary info to the cart to keep it light
      cart.push({
        id: productToAdd.id,
        name: productToAdd.name,
        image: productToAdd.image,
        price: productToAdd.price,
        quantity: quantity
      });
    }
  }
  
  setLocalStorage(CART_KEY, cart);
  alert(`Added ${quantity} x ${allProducts.find(p => p.id === productId).name} to cart!`);
}

// Sets up event listeners for quantity buttons
function setupQuantitySelector() {
  const minusBtn = document.querySelector('.quantity-btn.minus');
  const plusBtn = document.querySelector('.quantity-btn.plus');
  const quantityInput = document.querySelector('#quantity-input');

  minusBtn.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  plusBtn.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  });
}

// Main initialization function
async function initializeProductDetailPage() {
  await loadHeaderFooter();
  highlightActiveLink();

  const productId = getParam('id');

  try {
    const response = await fetch('/json/products.json');
    if (!response.ok) throw new Error('Failed to fetch products');
    allProducts = await response.json();

    const product = allProducts.find(p => p.id === productId);
    if (product) {
      renderProductDetails(product);
      setupQuantitySelector(); // Set up the + and - buttons
      document.querySelector('#addToCartBtn').addEventListener('click', () => addToCart(productId));
    } else {
      document.querySelector('#product-detail-container').innerHTML = '<h2>Product not found.</h2>';
    }
  } catch (error) {
    console.error('Error initializing page:', error);
  }
}

initializeProductDetailPage();