import { loadHeaderFooter } from './utils.js';

async function initializeApp() {
  await loadHeaderFooter();

  // Highlight the active navigation link after the header is loaded
  const currentPage = window.location.pathname;
  // If on the root path, consider it the same as index.html
  const activePage = currentPage === '/' ? '/index.html' : currentPage;

  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach((link) => {
    // Use getAttribute to get the exact href value
    if (link.getAttribute('href') === activePage) {
      link.classList.add('active');
    }
  });
}

initializeApp();
