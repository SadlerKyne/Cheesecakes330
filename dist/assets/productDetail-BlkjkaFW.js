import{l as s,h as u,g as d,a as l,s as p,u as y,b as m}from"./utils-BkkW3aVv.js";let o=[];const c="so-cart";function q(t){const e=document.querySelector("#product-detail-container");e.innerHTML=`
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
    `}function f(t){let e=l(c)||[];const n=parseInt(document.querySelector("#quantity-input").value),a=e.findIndex(i=>i.id===t);if(a>-1)e[a].quantity+=n;else{const i=o.find(r=>r.id===t);i&&e.push({id:i.id,name:i.name,image:i.image,price:i.price,quantity:n})}p(c,e),y(),m(`Added ${n} x ${o.find(i=>i.id===t).name} to cart!`)}function b(){const t=document.querySelector(".quantity-btn.minus"),e=document.querySelector(".quantity-btn.plus"),n=document.querySelector("#quantity-input");t.addEventListener("click",()=>{let a=parseInt(n.value);a>1&&(n.value=a-1)}),e.addEventListener("click",()=>{let a=parseInt(n.value);n.value=a+1})}async function g(){await s(),u();const t=d("id");try{const e=await fetch("/json/products.json");if(!e.ok)throw new Error("Failed to fetch products");o=await e.json();const n=o.find(a=>a.id===t);n?(q(n),b(),document.querySelector("#addToCartBtn").addEventListener("click",()=>f(t))):document.querySelector("#product-detail-container").innerHTML="<h2>Product not found.</h2>"}catch(e){console.error("Error initializing page:",e)}}g();
