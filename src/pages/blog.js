import { loadHeaderFooter, highlightActiveLink } from '../utils.js';

const API_URL = 'https://dev.to/api/articles?per_page=7';
let allPosts = [];

/**
 * Creates the HTML for a standard blog post card.
 * @param {object} post The post data from the API.
 * @returns {string} The HTML string for the post card.
 */
function postCardTemplate(post) {
  const category = post.tags[0] || 'Tech';
  const fallbackImage = `https://picsum.photos/seed/${post.id}/400/250`;
  return `
    <div class="post-card">
      <a href="${post.url}" target="_blank" rel="noopener noreferrer">
        <img src="${post.cover_image || fallbackImage}" alt="${post.title}" class="post-card-image">
      </a>
      <div class="post-card-content">
        <span class="post-card-category">${category}</span>
        <h4 class="post-card-title">${post.title}</h4>
        <p class="post-card-meta">By ${post.user.name} • ${post.reading_time_minutes} min read</p>
        <p class="post-card-excerpt">${post.description}</p>
        <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="read-more-link">Read More</a>
      </div>
    </div>
  `;
}

/**
 * Creates the HTML for the featured blog post.
 * @param {object} post The post data from the API.
 * @returns {string} The HTML string for the featured post.
 */
function featuredPostTemplate(post) {
  const category = post.tags[0] || 'Tech';
  const fallbackImage = `https://picsum.photos/seed/${post.id}/800/500`;
  return `
    <div class="featured-post">
      <div class="featured-post-image">
        <a href="${post.url}" target="_blank" rel="noopener noreferrer">
          <img src="${post.cover_image || fallbackImage}" alt="${post.title}">
        </a>
        <span class="featured-badge">Featured</span>
      </div>
      <div class="featured-post-content">
        <span class="post-card-category">${category}</span>
        <h2 class="featured-post-title">${post.title}</h2>
        <p class="featured-post-excerpt">${post.description}</p>
        <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="btn-primary">Read More</a>
      </div>
    </div>
  `;
}

/**
 * Renders the list of non-featured blog posts.
 * @param {Array} posts The list of posts to render.
 */
function renderBlogGrid(posts) {
  const gridContainer = document.getElementById('blog-grid');
  if (posts.length > 0) {
    gridContainer.innerHTML = posts.map(postCardTemplate).join('');
  } else {
    gridContainer.innerHTML = '<p>No posts found for this category.</p>';
  }
}

/**
 * Sets up the event listeners for the filter buttons.
 */
function setupFilters() {
  const filterButtons = document.querySelectorAll('.blog-filters .filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const tag = button.dataset.tag;
      const otherPosts = allPosts.slice(1);
      
      if (tag === 'all') {
        renderBlogGrid(otherPosts);
      } else {
        const filteredPosts = otherPosts.filter(post => post.tags.includes(tag));
        renderBlogGrid(filteredPosts);
      }
    });
  });
}

/**
 * Fetches and displays all blog posts from the dev.to API.
 */
async function loadAndRenderPosts() {
  const featuredPostContainer = document.getElementById('featured-post-container');
  const gridContainer = document.getElementById('blog-grid');
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch posts');
    
    allPosts = await response.json();

    if (allPosts && allPosts.length > 0) {
      const featuredPost = allPosts[0];
      const otherPosts = allPosts.slice(1);

      featuredPostContainer.innerHTML = featuredPostTemplate(featuredPost);
      renderBlogGrid(otherPosts);
      setupFilters();
    } else {
      gridContainer.innerHTML = '<p>No blog posts available at this time.</p>';
    }

  } catch (error) {
    console.error('Error loading blog posts:', error);
    gridContainer.innerHTML = '<p>Could not load blog posts.</p>';
    featuredPostContainer.innerHTML = '';
  }
}

/**
 * Initializes the Blog page.
 */
async function initializeBlogPage() {
  await loadHeaderFooter();
  highlightActiveLink();
  await loadAndRenderPosts();
}

initializeBlogPage();