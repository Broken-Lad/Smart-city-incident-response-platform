
import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';

function renderHome() {
  return `
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
        <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
      </a>
      <h1>Hello Vite!</h1>
      <div class="card">
        <button id="counter" type="button"></button>
      </div>
      <p class="read-the-docs">
        Click on the Vite logo to learn more
      </p>
    </div>
  `;
}

function renderAbout() {
  return `
    <div>
      <h1>About</h1>
      <p>This is a smart city incident response platform demo.</p>
    </div>
  `;
}

function setActiveNav(page) {
  document.querySelectorAll('.top-nav a').forEach(a => {
    a.classList.remove('active');
  });
  const nav = document.getElementById('nav-' + page);
  if (nav) nav.classList.add('active');
}

function renderPage(page) {
  const app = document.getElementById('app');
  if (page === 'about') {
    app.innerHTML = renderAbout();
  } else {
    app.innerHTML = renderHome();
    setupCounter(document.querySelector('#counter'));
  }
  setActiveNav(page);
}

function handleNav(e) {
  if (e.target.matches('.top-nav a')) {
    e.preventDefault();
    const page = e.target.id.replace('nav-', '');
    window.location.hash = page;
    renderPage(page);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', handleNav);
  const page = window.location.hash.replace('#', '') || 'home';
  renderPage(page);
});

window.addEventListener('hashchange', () => {
  const page = window.location.hash.replace('#', '') || 'home';
  renderPage(page);
});
