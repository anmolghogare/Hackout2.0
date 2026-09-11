import { App } from './App.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app');
  if (root) {
    root.innerHTML = App();
  }
});
