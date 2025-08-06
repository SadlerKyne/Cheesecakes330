import{l as u,h as m,a as n,s as p,u as _}from"./utils-BkkW3aVv.js";const o="so-cart";function v(t){return`
    <li class="cart-card">
      <img src="${t.image}" alt="${t.name}" class="cart-card__image">
      <div class="cart-card__details">
        <h2 class="card__name">${t.name}</h2>
        <p class="cart-card__price">$${t.price.toFixed(2)}</p>
        <p class="cart-card__quantity">qty: ${t.quantity}</p>
      </div>
      <button class="cart-card__remove" data-id="${t.id}" aria-label="Remove ${t.name}">&times;</button>
    </li>
  `}function i(){const t=n(o)||[],e=document.querySelector(".product-list"),a=document.querySelector(".cart-footer"),r=document.querySelector(".cart-total");if(t.length>0){const d=t.map(c=>v(c));e.innerHTML=`<ul>${d.join("")}</ul>`;const l=t.reduce((c,s)=>c+s.price*s.quantity,0);r.textContent=`Total: $${l.toFixed(2)}`,a.classList.remove("hide"),g()}else e.innerHTML="<p>Your cart is empty.</p>",a.classList.add("hide")}function g(){document.querySelectorAll(".cart-card__remove").forEach(e=>{e.addEventListener("click",a=>{const r=a.target.dataset.id;h(r)})})}function h(t){const a=(n(o)||[]).filter(r=>r.id!==t);p(o,a),i(),_()}async function $(){await u(),m(),i()}$();
