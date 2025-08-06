import { loadHeaderFooter, highlightActiveLink } from '../utils.js';
import { renderProductList } from '../components/ProductList.js';

let allProducts = []; // To store all products from JSON
let currentTypeFilter = 'all'; // To track selected type (Cheesecake/Cake)
let currentCategoryFilter = 'all'; // To track selected category (Classic/Fruit)

// --- Applies the current filters and re-renders the product list ---
function applyFilters() {
  const container = document.querySelector('#all-products-grid');
  let filteredProducts = allProducts;

  // 1. Filter by type (Cheesecake/Cake)
  if (currentTypeFilter !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.type === currentTypeFilter);
  }

  // 2. Filter by category (Classic/Fruit)
  if (currentCategoryFilter !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === currentCategoryFilter);
  }

  renderProductList(filteredProducts, container);
}

// --- Sets up all filtering functionality ---
function setupFiltering() {
  const typeButtons = document.querySelectorAll('.type-btn');
  const categoryButtons = document.querySelectorAll('.filter-btn');

  // Add event listeners for Type buttons (Cheesecake/Cake)
  typeButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentTypeFilter = button.dataset.type;
      typeButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      applyFilters(); // Re-render the list
    });
  });

  // Add event listeners for Category buttons (Classic/Fruit)
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentCategoryFilter = button.dataset.category;
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      applyFilters(); // Re-render the list
    });
  });
}

// --- Main initialization function for the home page ---
async function initHomePage() {
  await loadHeaderFooter();
  highlightActiveLink();

  try {
    const response = await fetch('/json/products.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    allProducts = await response.json(); // Store products globally for this script

    // Handle Featured Products
    const featuredProductsContainer = document.querySelector('.featured-flavors .products-grid');
    const featuredProducts = allProducts.slice(0, 3);
    renderProductList(featuredProducts, featuredProductsContainer);
    
    // Initial render of all products and setup filtering
    applyFilters(); 
    setupFiltering();

  } catch (error) {
    console.error('Failed to initialize home page:', error);
  }
}

// Run the initialization
initHomePage();