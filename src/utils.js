// function to load a template file
async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

// function to load the header and footer
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('/partials/header.html');
  const headerElement = document.querySelector('header');
  headerElement.innerHTML = headerTemplate;

  const footerTemplate = await loadTemplate('/partials/footer.html');
  const footerElement = document.querySelector('footer');
  footerElement.innerHTML = footerTemplate;
}

// function to highlight the active nav link
export function highlightActiveLink() {
  const currentPage = window.location.pathname;
  // If on the root path, consider it the same as index.html
  const activePage = currentPage === '/' ? '/index.html' : currentPage.replace('index.html', '');

  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    // Use getAttribute to get the exact href value
    if (link.getAttribute('href') === activePage) {
      link.classList.add('active');
    }
  });
}