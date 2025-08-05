import{l as d,h as n}from"./utils-FFoUEriw.js";function a(r,e){if(e){const o=r.map(t=>u(t)).join("");e.innerHTML=o}else console.error("Render container not found for products.")}function l(r,e){const o=document.querySelectorAll(".filter-btn");o.forEach(t=>{t.addEventListener("click",()=>{const c=t.dataset.category;if(o.forEach(s=>s.classList.remove("active")),t.classList.add("active"),c==="all")a(r,e);else{const s=r.filter(i=>i.category===c);a(s,e)}})})}function u(r){return`
    <div class="product-card">
      <a href="/order/" class="product-card-link-wrapper">
        <img src="${r.image}" alt="${r.name}" class="product-card-image">
        <div class="product-card-category">${r.category}</div>
        <h3 class="product-card-title">${r.name}</h3>
        <p class="product-card-description">${r.description}</p>
      </a>
      <div class="product-card-action">
        <a href="/order/" class="btn-secondary">Order Now</a>
      </div>
    </div>
  `}async function f(){await d(),n();try{const r=await fetch("/json/products.json");if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);const e=await r.json(),o=document.querySelector(".featured-flavors .products-grid"),t=e.slice(0,3);a(t,o);const c=document.querySelector("#all-products-grid");a(e,c),l(e,c)}catch(r){console.error("Failed to initialize home page:",r)}}f();
