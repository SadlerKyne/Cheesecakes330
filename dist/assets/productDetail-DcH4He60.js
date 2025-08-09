import{l,h as u,b as m,s as d,g as y,a as p,u as v}from"./utils-C06FxFqR.js";import{g as f,c as g}from"./maps-api-BPrFoTXr.js";let r=[];const c="so-cart";function b(t){const a=document.querySelector("#product-detail-container");a.innerHTML=`
    <section class="product-detail">
      <div class="product-image-container">
        <img src="${t.image}" alt="${t.name}" class="product-detail-image">
      </div>
      <div class="product-info-container">
        <h2 class="product-title">${t.name}</h2>
        <p class="product-description">${t.description}</p>
        <p class="product-price">$${t.price.toFixed(2)}</p>
        
        <div class="quantity-selector">
          <button type="button" class="quantity-btn minus" aria-label="Decrease quantity">-</button>
          <input type="number" id="quantity-input" class="quantity-input" value="1" min="1">
          <button type="button" class="quantity-btn plus" aria-label="Increase quantity">+</button>
        </div>

        <button class="btn-primary" id="addToCartBtn" data-id="${t.id}">Add to Cart</button>

        <div class="availability-delivery-wrapper">
          <div id="availability-section">
            <h4>Baker's Availability</h4>
            <p class="availability-subtitle">Booked days are disabled.</p>
            <div id="calendar-container"></div>
          </div>

          <div class="delivery-column">
            <div id="map-container">
              <h4>Delivery Area</h4>
              <div class="map-embed">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49911.07020643049!2d-109.58877604869663!3d38.569670799299445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8747e12036982e45%3A0x78d903d8c5ef8acb!2sMorning%20Glory%20Arch!5e0!3m2!1sen!2sus!4v1754711051123!5m2!1sen!2sus" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
            <div id="delivery-check-section">
              <h4>Check Delivery</h4>
              <form id="delivery-check-form">
                <input type="text" id="delivery-address" name="delivery-address" placeholder="Enter address or zip" required />
                <button type="submit" class="btn-secondary">Check</button>
              </form>
              <p id="delivery-message"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `}function h(t){const a=document.querySelector("#calendar-container");if(!a)return;const i=(t||[]).map(o=>new Date(o.start.dateTime||o.start.date).toISOString().split("T")[0]),e=new Date,n=new Date;n.setDate(e.getDate()+90);const s=setInterval(()=>{window.flatpickr&&(clearInterval(s),flatpickr(a,{minDate:e,maxDate:n,disable:i,inline:!0}))},100)}function q(){const t=document.querySelector("#delivery-check-form");t&&t.addEventListener("submit",async a=>{a.preventDefault();const i=document.querySelector("#delivery-address").value,e=document.querySelector("#delivery-message");if(!i){d("Please enter an address or zip code.");return}e.textContent="Checking...",await g(i)?(e.textContent="Great news! We can deliver to you.",e.classList.add("success-message"),e.classList.remove("error-message")):(e.textContent="Sorry, you are outside our delivery range.",e.classList.add("error-message"),e.classList.remove("success-message"))})}function w(t){let a=y(c)||[];const i=parseInt(document.querySelector("#quantity-input").value),e=a.findIndex(n=>n.id===t);if(e>-1)a[e].quantity+=i;else{const n=r.find(s=>s.id===t);n&&a.push({id:n.id,name:n.name,image:n.image,price:n.price,quantity:i})}p(c,a),v(),d(`Added ${i} x ${r.find(n=>n.id===t).name} to cart!`)}function D(){const t=document.querySelector(".quantity-btn.minus"),a=document.querySelector(".quantity-btn.plus"),i=document.querySelector("#quantity-input");t.addEventListener("click",()=>{let e=parseInt(i.value);e>1&&(i.value=e-1)}),a.addEventListener("click",()=>{let e=parseInt(i.value);i.value=e+1})}async function k(){await l(),u();const t=m("id");try{const a=await fetch("/json/products.json");if(!a.ok)throw new Error("Failed to fetch products");r=await a.json();const i=r.find(e=>e.id===t);if(i){document.title=`${i.name} | Sweet Dreams Bakery`,b(i),D(),q(),document.querySelector("#addToCartBtn").addEventListener("click",()=>w(t));const e=await f();h(e)}else document.querySelector("#product-detail-container").innerHTML="<h2>Product not found.</h2>"}catch(a){console.error("Error initializing page:",a)}}k();
