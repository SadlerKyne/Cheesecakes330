// Gets and parses an item from localStorage.
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  
  // Stringifies and saves an item to localStorage.
  export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }