import"./style-DWKnuZtZ.js";async function s(e){return await(await fetch(e)).text()}async function d(){const e=await s("/partials/header.html"),t=document.querySelector("header");t.innerHTML=e;const a=await s("/partials/footer.html"),r=document.querySelector("footer");r.innerHTML=a}function l(){const e=window.location.pathname,t=e==="/"?"/index.html":e.replace("index.html","");document.querySelectorAll("nav a").forEach(r=>{r.getAttribute("href")===t&&r.classList.add("active")})}function c(e,t){if(t){const a=e.map(r=>f(r)).join("");t.innerHTML=a}else console.error("Render container not found for products.")}function u(e,t){const a=document.querySelectorAll(".filter-btn");a.forEach(r=>{r.addEventListener("click",()=>{const o=r.dataset.category;if(a.forEach(n=>n.classList.remove("active")),r.classList.add("active"),o==="all")c(e,t);else{const n=e.filter(i=>i.category===o);c(n,t)}})})}function f(e){return`
    <div class="product-card">
      <a href="/order/" class="product-card-link-wrapper">
        <img src="${e.image}" alt="${e.name}" class="product-card-image">
        <div class="product-card-category">${e.category}</div>
        <h3 class="product-card-title">${e.name}</h3>
        <p class="product-card-description">${e.description}</p>
      </a>
      <div class="product-card-action">
        <a href="/order/" class="btn-secondary">Order Now</a>
      </div>
    </div>
  `}async function p(){await d(),l();try{const e=await fetch("/json/products.json");if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);const t=await e.json(),a=document.querySelector(".featured-flavors .products-grid"),r=t.slice(0,3);c(r,a);const o=document.querySelector("#all-products-grid");c(t,o),u(t,o)}catch(e){console.error("Failed to initialize home page:",e)}}p();
