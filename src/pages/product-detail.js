import {
    loadHeaderFooter,
    highlightActiveLink,
    getParam,
    showToast,
  } from '../utils.js';
  import { setLocalStorage, getLocalStorage } from '../lib/localStorage.js';
  import { updateCartIcon } from '../components/ShoppingCart.js';
  import { getUpcomingEvents } from '../api/calendar-api.js';
  
  let allProducts = [];
  const CART_KEY = 'so-cart';
  
  /**
   * Renders the product's details into the page, including the calendar placeholder.
   * @param {object} product The product object to display.
   */
  function renderProductDetails(product) {
    const container = document.querySelector('#product-detail-container');
    container.innerHTML = `
      <section class="product-detail">
        <div class="product-image-container">
          <img src="${product.image}" alt="${
            product.name
          }" class="product-detail-image">
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
  
          <button class="btn-primary" id="addToCartBtn" data-id="${
            product.id
          }">Add to Cart</button>
  
          <div id="availability-section">
            <h4>Baker's Availability</h4>
            <p class="availability-subtitle">Days in gray are booked.</p>
            <div id="calendar-container"></div>
          </div>
        </div>
      </section>
    `;
  }
  
  /**
   * Initializes a calendar and disables days that are already booked.
   * @param {Array} bookedEvents List of Google Calendar event objects.
   */
  function renderCalendar(bookedEvents) {
    const calendarContainer = document.querySelector('#calendar-container');
    if (!calendarContainer) {
      console.error('Calendar container element not found!');
      return;
    }
  
    // This function will run once the calendar library is confirmed to be loaded.
    function initializeCalendar() {
      const bookedDates = (bookedEvents || []).map((event) => {
        const date = new Date(event.start.dateTime || event.start.date);
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      });
  
      const today = new Date();
      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 90);
  
      const options = {
        settings: {
          range: {
            min: today.toISOString().split('T')[0],
            max: maxDate.toISOString().split('T')[0],
            disabled: bookedDates,
          },
          selection: {
            day: false,
          },
          visibility: {
            theme: 'light',
            daysOutside: false,
          },
        },
      };
      
      calendarContainer.innerHTML = ''; // Clear loading message
      const calendar = new VanillaCalendar(calendarContainer, options);
      calendar.init();
    }
  
    // Poll to check if the VanillaCalendar library is loaded.
    const interval = setInterval(() => {
      if (window.VanillaCalendar) {
        clearInterval(interval);
        initializeCalendar();
      }
    }, 100);
  
    // Fallback timeout in case the script fails to load
    setTimeout(() => {
      clearInterval(interval);
      if (!window.VanillaCalendar && calendarContainer.innerHTML === '') {
         calendarContainer.innerHTML = '<p>Could not load the calendar component.</p>';
      }
    }, 5000);
  }
  
  
  /**
   * Adds an item with the selected quantity to the cart in localStorage.
   * @param {string} productId The ID of the product to add.
   */
  function addToCart(productId) {
    let cart = getLocalStorage(CART_KEY) || [];
    const quantity = parseInt(document.querySelector('#quantity-input').value);
    const existingItemIndex = cart.findIndex((item) => item.id === productId);
  
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      const productToAdd = allProducts.find((item) => item.id === productId);
      if (productToAdd) {
        cart.push({
          id: productToAdd.id,
          name: productToAdd.name,
          image: productToAdd.image,
          price: productToAdd.price,
          quantity: quantity,
        });
      }
    }
  
    setLocalStorage(CART_KEY, cart);
    updateCartIcon();
    showToast(
      `Added ${quantity} x ${
        allProducts.find((p) => p.id === productId).name
      } to cart!`
    );
  }
  
  /**
   * Sets up the event listeners for the quantity +/- buttons.
   */
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
  
  /**
   * Main initialization function for the page.
   */
  async function initializeProductDetailPage() {
    await loadHeaderFooter();
    highlightActiveLink();
  
    const productId = getParam('id');
  
    try {
      const response = await fetch('/json/products.json');
      if (!response.ok) throw new Error('Failed to fetch products');
      allProducts = await response.json();
  
      const product = allProducts.find((p) => p.id === productId);
      if (product) {
        document.title = `${product.name} | Sweet Dreams Bakery`;
        renderProductDetails(product);
        setupQuantitySelector();
        document
          .querySelector('#addToCartBtn')
          .addEventListener('click', () => addToCart(productId));
  
        // Fetch events and render the new calendar
        const events = await getUpcomingEvents();
        renderCalendar(events);
      } else {
        document.querySelector('#product-detail-container').innerHTML =
          '<h2>Product not found.</h2>';
      }
    } catch (error) {
      console.error('Error initializing page:', error);
      const calendarContainer = document.querySelector('#calendar-container');
      if(calendarContainer) {
        calendarContainer.innerHTML = '<p>Could not load availability.</p>';
      }
    }
  }
  
  initializeProductDetailPage();