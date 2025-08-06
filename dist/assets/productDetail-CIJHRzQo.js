import{l as u,h as s,g as d}from"./utils-B7NacW0D.js";function l(t){return JSON.parse(localStorage.getItem(t))}function p(t,e){localStorage.setItem(t,JSON.stringify(e))}let o=[];const r="so-cart";function m(t){const e=document.querySelector("#product-detail-container");e.innerHTML=`
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
      </div>
    </section>
  `}function y(t){let e=l(r)||[];const n=parseInt(document.querySelector("#quantity-input").value),i=e.findIndex(a=>a.id===t);if(i>-1)e[i].quantity+=n;else{const a=o.find(c=>c.id===t);a&&e.push({id:a.id,name:a.name,image:a.image,price:a.price,quantity:n})}p(r,e),alert(`Added ${n} x ${o.find(a=>a.id===t).name} to cart!`)}function q(){const t=document.querySelector(".quantity-btn.minus"),e=document.querySelector(".quantity-btn.plus"),n=document.querySelector("#quantity-input");t.addEventListener("click",()=>{let i=parseInt(n.value);i>1&&(n.value=i-1)}),e.addEventListener("click",()=>{let i=parseInt(n.value);n.value=i+1})}async function f(){await u(),s();const t=d("id");try{const e=await fetch("/json/products.json");if(!e.ok)throw new Error("Failed to fetch products");o=await e.json();const n=o.find(i=>i.id===t);n?(m(n),q(),document.querySelector("#addToCartBtn").addEventListener("click",()=>y(t))):document.querySelector("#product-detail-container").innerHTML="<h2>Product not found.</h2>"}catch(e){console.error("Error initializing page:",e)}}f();
