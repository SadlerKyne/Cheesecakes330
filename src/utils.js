// function to load a template file
async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

// / Sets up the mobile navigation toggle.
function setupMobileMenu() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navContainer = document.querySelector('.nav-container');

  if (hamburgerBtn && navContainer) {
    hamburgerBtn.addEventListener('click', () => {
      navContainer.classList.toggle('nav-open');
      hamburgerBtn.setAttribute(
        'aria-expanded',
        navContainer.classList.contains('nav-open')
      );
    });
  }
}

// function to load the header and footer
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('/partials/header.html');
  const headerElement = document.querySelector('header');
  headerElement.innerHTML = headerTemplate;

  const footerTemplate = await loadTemplate('/partials/footer.html');
  const footerElement = document.querySelector('footer');
  footerElement.innerHTML = footerElement.innerHTML + footerTemplate;

  // Set up the mobile menu after the header is loaded
  setupMobileMenu();
}

// Loads an HTML template from a given path.
export function highlightActiveLink() {
  const currentPage = window.location.pathname;
  const activePage =
    currentPage === '/' ? '/' : currentPage.replace('index.html', '');

  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === activePage) {
      link.classList.add('active');
    }
  });
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
  }

