// Sample data for our featured products
const featuredProducts = [
  {
    id: 'classic-ny',
    name: 'Classic New York',
    image: '/images/NewYorkStyle.webp',
    description:
      'The timeless, rich and creamy New York cheesecake made with the finest ingredients.',
    category: 'Classic',
  },
  {
    id: 'strawberry-swirl',
    name: 'Strawberry Swirl',
    image: '/images/StrawberrySwirl.webp',
    description:
      'Our classic cheesecake swirled with a sweet, vibrant strawberry puree.',
    category: 'Fruit',
  },
  {
    id: 'chocolate-fudge',
    name: 'Triple Chocolate',
    image: '/images/ChocolateSunday.webp',
    description:
      'A decadent chocolate cheesecake with chocolate chips and chocolate ganache.',
    category: 'Chocolate',
  },
];

// Function to create the HTML for a single product card
function createProductCard(product) {
  return `
    <div class="product-card">
      <a href="/order/" class="product-card-link-wrapper">
        <div style="position: relative;">
          <img src="${product.image}" alt="${product.name}" class="product-card-image">
          <div class="product-card-category">${product.category}</div>
        </div>
        <h3 class="product-card-title">${product.name}</h3>
        <p class="product-card-description">${product.description}</p>
      </a>
      <div class="product-card-action">
        <a href="/order/" class="btn-secondary">Order Now</a>
      </div>
    </div>
  `;
}

// --- Renders a list of products to a given element ---
function renderProducts(productList, containerElement) {
  if (containerElement) {
    const productsHTML = productList
      .map((product) => createProductCard(product))
      .join('');
    containerElement.innerHTML = productsHTML;
  }
}

// --- Main function to initialize the page ---
async function initializeHomePage() {
  // Fetch all product data from the JSON file
  const response = await fetch('/json/products.json');
  const allProducts = await response.json();

  // --- Handle Featured Products ---
  const featuredProductsContainer = document.querySelector(
    '.featured-flavors .products-grid'
  );
  // For now, we'll feature the first 3 products from our data source
  const featuredProducts = allProducts.slice(0, 3);
  renderProducts(featuredProducts, featuredProductsContainer);

  // --- Handle All Products ---
  const allProductsContainer = document.querySelector('#all-products-grid');
  renderProducts(allProducts, allProductsContainer);
}

// Run the initialize function once the page's DOM is fully loaded
initializeHomePage();
