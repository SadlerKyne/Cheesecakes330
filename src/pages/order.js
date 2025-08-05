import { loadHeaderFooter, highlightActiveLink } from '../utils.js';

async function initializePage() {
  await loadHeaderFooter();
  highlightActiveLink();
  // Future code for the order page will go here
}

initializePage();