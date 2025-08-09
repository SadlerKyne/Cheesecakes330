import{l as c,h as l}from"./utils-C06FxFqR.js";const d="https://dev.to/api/articles?per_page=7";let r=[];function g(e){const t=e.tags[0]||"Tech",a=`https://picsum.photos/seed/${e.id}/400/250`;return`
    <div class="post-card">
      <a href="${e.url}" target="_blank" rel="noopener noreferrer">
        <img src="${e.cover_image||a}" alt="${e.title}" class="post-card-image">
      </a>
      <div class="post-card-content">
        <span class="post-card-category">${t}</span>
        <h4 class="post-card-title">${e.title}</h4>
        <p class="post-card-meta">By ${e.user.name} • ${e.reading_time_minutes} min read</p>
        <p class="post-card-excerpt">${e.description}</p>
        <a href="${e.url}" target="_blank" rel="noopener noreferrer" class="read-more-link">Read More</a>
      </div>
    </div>
  `}function p(e){const t=e.tags[0]||"Tech",a=`https://picsum.photos/seed/${e.id}/800/500`;return`
    <div class="featured-post">
      <div class="featured-post-image">
        <a href="${e.url}" target="_blank" rel="noopener noreferrer">
          <img src="${e.cover_image||a}" alt="${e.title}">
        </a>
        <span class="featured-badge">Featured</span>
      </div>
      <div class="featured-post-content">
        <span class="post-card-category">${t}</span>
        <h2 class="featured-post-title">${e.title}</h2>
        <p class="featured-post-excerpt">${e.description}</p>
        <a href="${e.url}" target="_blank" rel="noopener noreferrer" class="btn-primary">Read More</a>
      </div>
    </div>
  `}function o(e){const t=document.getElementById("blog-grid");e.length>0?t.innerHTML=e.map(g).join(""):t.innerHTML="<p>No posts found for this category.</p>"}function f(){const e=document.querySelectorAll(".blog-filters .filter-btn");e.forEach(t=>{t.addEventListener("click",()=>{e.forEach(s=>s.classList.remove("active")),t.classList.add("active");const a=t.dataset.tag,n=r.slice(1);if(a==="all")o(n);else{const s=n.filter(i=>i.tags.includes(a));o(s)}})})}async function u(){const e=document.getElementById("featured-post-container"),t=document.getElementById("blog-grid");try{const a=await fetch(d);if(!a.ok)throw new Error("Failed to fetch posts");if(r=await a.json(),r&&r.length>0){const n=r[0],s=r.slice(1);e.innerHTML=p(n),o(s),f()}else t.innerHTML="<p>No blog posts available at this time.</p>"}catch(a){console.error("Error loading blog posts:",a),t.innerHTML="<p>Could not load blog posts.</p>",e.innerHTML=""}}async function h(){await c(),l(),await u()}h();
