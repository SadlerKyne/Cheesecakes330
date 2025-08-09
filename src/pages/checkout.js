import { loadHeaderFooter, highlightActiveLink, showToast } from '../utils.js';
import { getLocalStorage, setLocalStorage } from '../lib/localStorage.js';
import { getUpcomingEvents } from '../api/calendar-api.js';
import { checkDeliveryRange } from '../api/maps-api.js';
import { updateCartIcon } from '../components/ShoppingCart.js';

const CART_KEY = 'so-cart';
const TAX_RATE = 0.08;
const SHIPPING_BASE = 10;
const SHIPPING_PER_ITEM = 2;
const PICKUP_SHIPPING_FEE = 0;

let isDateSelected = false;
let isAddressValid = false;
let deliveryMethod = 'delivery';

/**
 * Updates the disabled state of the "Place Order" button based on validation status.
 */
function updatePlaceOrderButtonState() {
  const placeOrderBtn = document.getElementById('place-order-btn');
  if (deliveryMethod === 'pickup') {
    placeOrderBtn.disabled = !isDateSelected;
  } else {
    placeOrderBtn.disabled = !(isDateSelected && isAddressValid);
  }
}

/**
 * Calculates and displays the order summary details.
 * @param {Array} cartItems The list of items in the cart.
 * @param {string} method The delivery method ('delivery' or 'pickup').
 */
function renderOrderSummary(cartItems, method) {
  if (!cartItems || cartItems.length === 0) return;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  let shipping = 0;

  if (method === 'delivery') {
    shipping = SHIPPING_BASE + (cartItems.length > 1 ? (cartItems.length - 1) * SHIPPING_PER_ITEM : 0);
    document.getElementById('shipping-row').style.display = 'block';
  } else {
    shipping = PICKUP_SHIPPING_FEE;
    document.getElementById('shipping-row').style.display = 'none';
  }
  
  const total = subtotal + tax + shipping;

  document.getElementById('subtotal-display').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('tax-display').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('shipping-display').textContent = `$${shipping.toFixed(2)}`;
  document.getElementById('total-display').textContent = `$${total.toFixed(2)}`;
}

/**
 * Renders the calendar for pickup/delivery date selection.
 * @param {Array} bookedEvents List of Google Calendar event objects.
 */
function renderCalendar(bookedEvents) {
  const calendarContainer = document.getElementById('calendar-container');
  if (!calendarContainer) return;

  const bookedDates = (bookedEvents || []).map((event) => {
    const date = new Date(event.start.dateTime || event.start.date);
    return date.toISOString().split('T')[0];
  });

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 90);

  const interval = setInterval(() => {
    if (window.flatpickr) {
      clearInterval(interval);
      flatpickr(calendarContainer, {
        minDate: today,
        maxDate: maxDate,
        disable: bookedDates,
        inline: true,
        onChange: () => {
          isDateSelected = true;
          updatePlaceOrderButtonState();
        },
      });
    }
  }, 100);
}

/**
 * Handles the delivery check when the user updates the address.
 */
async function handleDeliveryCheck(cartItems) {
  const street = document.getElementById('street-address').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const zip = document.getElementById('zip').value;
  const fullAddress = `${street}, ${city}, ${state} ${zip}`;
  const deliveryMessageEl = document.getElementById('delivery-message');

  if (street && city && state && zip) {
    const isDeliverable = await checkDeliveryRange(fullAddress);
    isAddressValid = isDeliverable;

    if (isDeliverable) {
        deliveryMessageEl.textContent = '✅ Your address is within our delivery range!';
        deliveryMessageEl.classList.add('success-message');
        deliveryMessageEl.classList.remove('error-message');
    } else {
        deliveryMessageEl.textContent = '❌ Sorry, your address is outside our delivery range.';
        deliveryMessageEl.classList.add('error-message');
        deliveryMessageEl.classList.remove('success-message');
    }
  } else {
    isAddressValid = false;
    deliveryMessageEl.textContent = '';
  }
  updatePlaceOrderButtonState();
  renderOrderSummary(cartItems, 'delivery');
}

/**
 * Handles the delivery/pickup toggle and updates the UI accordingly.
 */
function setupDeliveryToggle(cartItems) {
    const deliveryToggle = document.getElementById('delivery-toggle');
    const pickupToggle = document.getElementById('pickup-toggle');
    const addressSection = document.getElementById('address-section');
    const mapContainer = document.getElementById('map-container');
    const pickupInfoCard = document.getElementById('pickup-info-card');

    const toggle = (method) => {
        deliveryMethod = method;
        if (method === 'delivery') {
            addressSection.style.display = 'block';
            mapContainer.style.display = 'block';
            pickupInfoCard.style.display = 'none';
            deliveryToggle.classList.add('active');
            pickupToggle.classList.remove('active');
            handleDeliveryCheck(cartItems);
        } else {
            addressSection.style.display = 'none';
            mapContainer.style.display = 'none';
            pickupInfoCard.style.display = 'block';
            deliveryToggle.classList.remove('active');
            pickupToggle.classList.add('active');
            renderOrderSummary(cartItems, 'pickup');
            updatePlaceOrderButtonState();
        }
    };

    deliveryToggle.addEventListener('click', () => toggle('delivery'));
    pickupToggle.addEventListener('click', () => toggle('pickup'));
    toggle('delivery');
}

/**
 * Adds a listener to the Place Order button to show alerts if it's disabled.
 */
function setupPlaceOrderButtonListener() {
  const placeOrderBtn = document.getElementById('place-order-btn');
  placeOrderBtn.addEventListener('click', () => {
    if (placeOrderBtn.disabled) {
      if (!isDateSelected) {
        showToast('Please select a pickup or delivery date from the calendar.');
      } else if (!isAddressValid && deliveryMethod === 'delivery') {
        showToast('Please enter a valid address within our delivery zone.');
      }
    }
  });
}

/**
 * Handles the final form submission.
 */
async function handleFormSubmission(event) {
    event.preventDefault();
    const form = document.getElementById('checkout-form');
    
    if (form.checkValidity()) {
        const formData = new FormData(form);
        const orderData = Object.fromEntries(formData.entries());
        console.log('Form data submitted:', orderData);
        
        setLocalStorage(CART_KEY, []);
        updateCartIcon();
        
        showToast('Placing your order...', 3000);
        setTimeout(() => {
            form.reset();
            document.querySelector('main.page-container').innerHTML = '<h1>Thank You!</h1><p>Your order has been placed successfully.</p><a href="/order/" class="btn-primary">Continue Shopping</a>';
        }, 3000);
    } else {
        form.reportValidity();
        showToast('Please fill out all required fields.');
    }
}

/**
 * Initializes the checkout page.
 */
async function initializeCheckoutPage() {
    await loadHeaderFooter();
    highlightActiveLink();
    
    const cartItems = getLocalStorage(CART_KEY);
    if (!cartItems || cartItems.length === 0) {
        document.querySelector('main.page-container').innerHTML = '<h1>Your Cart is Empty</h1><p>There are no items in your cart to check out.</p><a href="/order/" class="btn-primary">Shop Our Cheesecakes</a>';
        return;
    }
    
    const events = await getUpcomingEvents();
    renderCalendar(events);
    
    renderOrderSummary(cartItems, 'delivery');
    setupDeliveryToggle(cartItems);
    setupPlaceOrderButtonListener();
    
    document.getElementById('checkout-form').addEventListener('submit', handleFormSubmission);
    const addressFields = ['street-address', 'city', 'state', 'zip'];
    addressFields.forEach(fieldId => {
        document.getElementById(fieldId).addEventListener('blur', () => handleDeliveryCheck(cartItems));
    });
}

initializeCheckoutPage();