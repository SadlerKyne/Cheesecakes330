import{l,h as u,g as p,a as m,s as y,u as g,b as v}from"./utils-CmrDYecs.js";const d="AIzaSyB47vwIoirKBJJswju0h4pvq6OBA_ifFSg",w="297099279801-k0jup4vr7lon225uvsc58p4t1h2s6ba0.apps.googleusercontent.com",f="6104e981d3230c7d8aea53d366808e33133b935518757d65c3329a09713515e8@group.calendar.google.com",h="https://www.googleapis.com/auth/calendar",b=["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];async function I(){const t=new Date().toISOString(),a=new Date(Date.now()+2160*60*60*1e3).toISOString(),n=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(f)}/events?key=${d}&timeMin=${t}&timeMax=${a}&showDeleted=false&singleEvents=true&maxResults=100&orderBy=startTime`;try{const e=await fetch(n);if(!e.ok){const r=await e.text();throw console.error("Google API Response Error:",r),new Error(`Google API error! Status: ${e.status}`)}return(await e.json()).items||[]}catch(e){return console.error("Error fetching calendar events:",e),null}}window.gapiLoaded=()=>gapi.load("client",S);window.gisLoaded=()=>{google.accounts.oauth2.initTokenClient({client_id:w,scope:h,callback:()=>{}})};async function S(){await gapi.client.init({apiKey:d,discoveryDocs:b})}let c=[];const s="so-cart";function q(t){const a=document.querySelector("#product-detail-container");a.innerHTML=`
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
  
          <div id="availability-section">
            <h4>Baker's Availability</h4>
            <p class="availability-subtitle">Booked days are disabled.</p>
            <div id="calendar-container"></div>
          </div>
        </div>
      </section>
    `}function D(t){const a=document.querySelector("#calendar-container");if(!a)return;const i=(t||[]).map(r=>new Date(r.start.dateTime||r.start.date).toISOString().split("T")[0]),n=new Date,e=new Date;e.setDate(n.getDate()+90);const o=setInterval(()=>{window.flatpickr&&(clearInterval(o),flatpickr(a,{minDate:n,maxDate:e,disable:i,inline:!0}))},100)}function C(t){let a=m(s)||[];const i=parseInt(document.querySelector("#quantity-input").value),n=a.findIndex(e=>e.id===t);if(n>-1)a[n].quantity+=i;else{const e=c.find(o=>o.id===t);e&&a.push({id:e.id,name:e.name,image:e.image,price:e.price,quantity:i})}y(s,a),g(),v(`Added ${i} x ${c.find(e=>e.id===t).name} to cart!`)}function k(){const t=document.querySelector(".quantity-btn.minus"),a=document.querySelector(".quantity-btn.plus"),i=document.querySelector("#quantity-input");t.addEventListener("click",()=>{let n=parseInt(i.value);n>1&&(i.value=n-1)}),a.addEventListener("click",()=>{let n=parseInt(i.value);i.value=n+1})}async function E(){await l(),u();const t=p("id");try{const a=await fetch("/json/products.json");if(!a.ok)throw new Error("Failed to fetch products");c=await a.json();const i=c.find(n=>n.id===t);if(i){document.title=`${i.name} | Sweet Dreams Bakery`,q(i),k(),document.querySelector("#addToCartBtn").addEventListener("click",()=>C(t));const n=await I();D(n)}else document.querySelector("#product-detail-container").innerHTML="<h2>Product not found.</h2>"}catch(a){console.error("Error initializing page:",a)}}E();
