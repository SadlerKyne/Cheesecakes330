import{l as v,h as u}from"./utils-C06FxFqR.js";const p="https://dummyjson.com/comments?limit=10";function g(e){const a=(Math.random()*1+4).toFixed(1);return`
    <div class="review-card carousel-slide">
      <div class="review-header">
        <h4>${e.user.username}</h4>
        <div class="review-rating">
          <div class="stars" style="--rating: ${a};" aria-label="Rating of ${a} out of 5 stars"></div>
          <span class="verified">Verified Purchase</span>
        </div>
      </div>
      <p class="review-text">"${e.body}"</p>
    </div>
  `}function y(e){const a=document.querySelector(".review-summary-section");if(!e||e.length===0){a.innerHTML="<p>No review data available.</p>";return}const i=4.8,s=e.length;a.innerHTML=`
    <div class="rating-display">
      <p class="average-rating">${i}</p>
      <div class="stars" style="--rating: ${i};"></div>
      <p class="total-reviews">Based on ${s} reviews</p>
    </div>
    <div class="rating-breakdown">
      <div class="rating-bar-container"><span class="label">5 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 90%;"></div></div></div>
      <div class="rating-bar-container"><span class="label">4 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 5%;"></div></div></div>
      <div class="rating-bar-container"><span class="label">3 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 3%;"></div></div></div>
      <div class="rating-bar-container"><span class="label">2 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 1%;"></div></div></div>
      <div class="rating-bar-container"><span class="label">1 star</span><div class="rating-bar"><div class="rating-bar-fill" style="width: 1%;"></div></div></div>
    </div>
  `}function f(){const e=document.querySelector(".carousel-track"),a=Array.from(e.children),i=document.querySelector(".carousel-btn.next"),s=document.querySelector(".carousel-btn.prev");if(!a||a.length===0)return;const n=a[0].getBoundingClientRect().width;let t=0;const o=(r,d)=>{r.style.left=n*d+"px"};a.forEach(o);const l=r=>{e.style.transform="translateX(-"+a[r].style.left+")",t=r,c()},c=()=>{s.style.display=t===0?"none":"block",i.style.display=t===a.length-1?"none":"block"};s.addEventListener("click",()=>{t>0&&l(t-1)}),i.addEventListener("click",()=>{t<a.length-1&&l(t+1)}),c()}async function w(){const e=document.querySelector("#reviews-list");try{const a=await fetch(p);if(!a.ok)throw new Error(`HTTP error! Status: ${a.status}`);const s=(await a.json()).comments;s&&Array.isArray(s)?(y(s),e.innerHTML=s.map(n=>g(n)).join(""),f()):e.innerHTML="<p>No reviews found.</p>"}catch(a){console.error("Error fetching reviews:",a),e.innerHTML="<p>Failed to load reviews.</p>"}}async function b(){await v(),u(),await w()}b();
