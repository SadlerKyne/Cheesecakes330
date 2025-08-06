import{l as p,h as m,g as y,a as g,s as v,u as w,b as f}from"./utils-CmrDYecs.js";const d="AIzaSyB47vwIoirKBJJswju0h4pvq6OBA_ifFSg",h="297099279801-k0jup4vr7lon225uvsc58p4t1h2s6ba0.apps.googleusercontent.com",S="6104e981d3230c7d8aea53d366808e33133b935518757d65c3329a09713515e8@group.calendar.google.com",b="https://www.googleapis.com/auth/calendar",I=["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];async function C(){const e=new Date().toISOString(),t=new Date(Date.now()+2160*60*60*1e3).toISOString(),i=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(S)}/events?key=${d}&timeMin=${e}&timeMax=${t}&showDeleted=false&singleEvents=true&maxResults=100&orderBy=startTime`;try{const a=await fetch(i);if(!a.ok){const r=await a.text();throw console.error("Google API Response Error:",r),new Error(`Google API error! Status: ${a.status}`)}return(await a.json()).items||[]}catch(a){return console.error("Error fetching calendar events:",a),null}}window.gapiLoaded=()=>gapi.load("client",q);window.gisLoaded=()=>{google.accounts.oauth2.initTokenClient({client_id:h,scope:b,callback:()=>{}})};async function q(){await gapi.client.init({apiKey:d,discoveryDocs:I})}let c=[];const l="so-cart";function D(e){const t=document.querySelector("#product-detail-container");t.innerHTML=`
      <section class="product-detail">
        <div class="product-image-container">
          <img src="${e.image}" alt="${e.name}" class="product-detail-image">
        </div>
        <div class="product-info-container">
          <h2 class="product-title">${e.name}</h2>
          <p class="product-description">${e.description}</p>
          <p class="product-price">$${e.price.toFixed(2)}</p>
          
          <div class="quantity-selector">
            <button type="button" class="quantity-btn minus" aria-label="Decrease quantity">-</button>
            <input type="number" id="quantity-input" class="quantity-input" value="1" min="1">
            <button type="button" class="quantity-btn plus" aria-label="Increase quantity">+</button>
          </div>
  
          <button class="btn-primary" id="addToCartBtn" data-id="${e.id}">Add to Cart</button>
  
          <div id="availability-section">
            <h4>Baker's Availability</h4>
            <p class="availability-subtitle">Days in gray are booked.</p>
            <div id="calendar-container"></div>
          </div>
        </div>
      </section>
    `}function T(e){const t=document.querySelector("#calendar-container");if(!t){console.error("Calendar container element not found!");return}function n(){const a=(e||[]).map(s=>new Date(s.start.dateTime||s.start.date).toISOString().split("T")[0]),o=new Date,r=new Date;r.setDate(o.getDate()+90);const u={settings:{range:{min:o.toISOString().split("T")[0],max:r.toISOString().split("T")[0],disabled:a},selection:{day:!1},visibility:{theme:"light",daysOutside:!1}}};t.innerHTML="",new VanillaCalendar(t,u).init()}const i=setInterval(()=>{window.VanillaCalendar&&(clearInterval(i),n())},100);setTimeout(()=>{clearInterval(i),!window.VanillaCalendar&&t.innerHTML===""&&(t.innerHTML="<p>Could not load the calendar component.</p>")},5e3)}function E(e){let t=g(l)||[];const n=parseInt(document.querySelector("#quantity-input").value),i=t.findIndex(a=>a.id===e);if(i>-1)t[i].quantity+=n;else{const a=c.find(o=>o.id===e);a&&t.push({id:a.id,name:a.name,image:a.image,price:a.price,quantity:n})}v(l,t),w(),f(`Added ${n} x ${c.find(a=>a.id===e).name} to cart!`)}function L(){const e=document.querySelector(".quantity-btn.minus"),t=document.querySelector(".quantity-btn.plus"),n=document.querySelector("#quantity-input");e.addEventListener("click",()=>{let i=parseInt(n.value);i>1&&(n.value=i-1)}),t.addEventListener("click",()=>{let i=parseInt(n.value);n.value=i+1})}async function $(){await p(),m();const e=y("id");try{const t=await fetch("/json/products.json");if(!t.ok)throw new Error("Failed to fetch products");c=await t.json();const n=c.find(i=>i.id===e);if(n){document.title=`${n.name} | Sweet Dreams Bakery`,D(n),L(),document.querySelector("#addToCartBtn").addEventListener("click",()=>E(e));const i=await C();T(i)}else document.querySelector("#product-detail-container").innerHTML="<h2>Product not found.</h2>"}catch(t){console.error("Error initializing page:",t);const n=document.querySelector("#calendar-container");n&&(n.innerHTML="<p>Could not load availability.</p>")}}$();
