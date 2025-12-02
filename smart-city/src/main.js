

import './style.css';
import viteLogo from '/vite.svg';
import javascriptLogo from './javascript.svg';
import { renderHome } from './pages/home.js';
import { renderAbout } from './pages/about.js';
import { renderForm } from './pages/form.js';

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
    } else if (page === 'form') {
      app.innerHTML = renderForm(viteLogo, javascriptLogo);
    } else if (page === 'threatmodel') {
      app.innerHTML = renderThreatModel();
  } else {
    app.innerHTML = renderHome(viteLogo, javascriptLogo);
  }
  setActiveNav(page);
}
import { renderThreatModel } from './pages/threatmodel.js';

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
