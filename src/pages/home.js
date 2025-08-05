import { loadHeaderFooter, highlightActiveLink } from '../utils.js';

// Renders a list of products to a element
function renderProducts(productList, containerElement) {
  if (containerElement) {
    const productsHTML = productList.map(product => createProductCard(product)).join('');
    containerElement.innerHTML = productsHTML;
  } else {
    console.error('Render container not found for products.');
  }
}

// filtering functionality
function setupFiltering(allProducts, containerElement) {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      if (category === 'all') {
        renderProducts(allProducts, containerElement);
      } else {
        const filteredProducts = allProducts.filter(product => product.category === category);
        renderProducts(filteredProducts, containerElement);
      }
    });
  });
}

// HTML for a single product card
function createProductCard(product) {
  return `
    <div class="product-card">
      <a href="/order/" class="product-card-link-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-card-image">
        <div class="product-card-category">${product.category}</div>
        <h3 class="product-card-title">${product.name}</h3>
        <p class="product-card-description">${product.description}</p>
      </a>
      <div class="product-card-action">
        <a href="/order/" class="btn-secondary">Order Now</a>
      </div>
    </div>
  `;
}

// Main initialization 
async function initHomePage() {
  // Load header and footer 
  await loadHeaderFooter();
  // highlight the active link
  highlightActiveLink();

  try {
    const response = await fetch('/json/products.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const allProducts = await response.json();

    const featuredProductsContainer = document.querySelector('.featured-flavors .products-grid');
    const featuredProducts = allProducts.slice(0, 3);
    renderProducts(featuredProducts, featuredProductsContainer);
    
    const allProductsContainer = document.querySelector('#all-products-grid');
    renderProducts(allProducts, allProductsContainer);
    setupFiltering(allProducts, allProductsContainer);

  } catch (error) {
    console.error('Failed to initialize home page:', error);
  }
}

// Run the initialization
initHomePage();