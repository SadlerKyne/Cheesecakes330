// src/app.js
import { createHeader } from './components/Header.js';
import { createFooter } from './components/Footer.js';

function initializeCommonComponents() {
  const headerElement = document.querySelector('header');
  const footerElement = document.querySelector('footer');

  if (headerElement) {
    const tempHeaderDiv = document.createElement('div');
    tempHeaderDiv.innerHTML = createHeader();
    while (tempHeaderDiv.firstChild) {
      headerElement.appendChild(tempHeaderDiv.firstChild);
    }
  }

  if (footerElement) {
    const tempFooterDiv = document.createElement('div');
    tempFooterDiv.innerHTML = createFooter();
    while (tempFooterDiv.firstChild) {
      footerElement.appendChild(tempFooterDiv.firstChild);
    }
  }

  // Bonus: Highlight the active navigation link
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', initializeCommonComponents);