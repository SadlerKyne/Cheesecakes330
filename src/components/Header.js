// src/components/Header.js
export function createHeader() {
    return `
      <div class="header-logo">
        <a href="/">
        <img src="/images/SATXlogo.png" alt="Mr. Cheesecake Logo" class="site-logo">
        </a>
      </div>
      <nav>
        <a href="/" class="nav-link">Home</a>
        <a href="/order.html" class="nav-link">Order</a>
        <a href="/about.html" class="nav-link">About</a>
        <a href="/reviews.html" class="nav-link">Reviews</a>
        <a href="/blog.html" class="nav-link">Blog</a>
        <a href="/contact.html" class="nav-link">Contact</a>
      </nav>
    `;
  }