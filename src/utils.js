// function to load a template file
async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

// function to load the header and footer
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('/src/partials/header.html');
  const headerElement = document.querySelector('header');
  headerElement.innerHTML = headerTemplate;

  const footerTemplate = await loadTemplate('/src/partials/footer.html');
  const footerElement = document.querySelector('footer');
  footerElement.innerHTML = footerTemplate;
}
