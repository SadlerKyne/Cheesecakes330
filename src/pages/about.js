import { loadHeaderFooter, highlightActiveLink } from '../utils.js';

async function initializePage() {
  await loadHeaderFooter();
  highlightActiveLink();
  // Future code for the about page will go here
  /*This **WAS** being rendered by an API to save time just for the project. Will be finalized at a later date*/
}

initializePage();
