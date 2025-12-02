
import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';

function renderHome() {
  return `
    <div>
      <h1>Smart City Incident Response Platform</h1>
      <p>Welkom bij het prototype voor de hackathon opdracht: <strong>Smart City Incident Response Platform</strong>.</p>
      <div class="card" style="text-align:left; max-width:700px; margin:2rem auto;">
        <h2>Thema & Challenge</h2>
        <p>Ontwikkel in één dag een platform dat incidenten in een slimme stad detecteert, analyseert en oplost. Denk aan verkeersproblemen, cyberaanvallen, storingen in IoT-apparaten, etc.</p>
        <h3>Disciplines & Taken</h3>
        <ul>
          <li><strong>Software Development:</strong> Kernapplicatie, API’s, dashboard</li>
          <li><strong>Business IT & Management:</strong> Business requirements, BPMN, KPI’s, stakeholder pitch</li>
          <li><strong>Technische Informatica:</strong> Architectuur, hardware-integratie, IoT-simulatie</li>
          <li><strong>Cyber Security & Cloud:</strong> Veilige cloud, security checks (authenticatie, encryptie)</li>
          <li><strong>Artificial Intelligence:</strong> AI-module voor incidentdetectie/classificatie</li>
        </ul>
        <h3>Deliverables</h3>
        <ul>
          <li>Modelcomponenten: BPMN, UML, ERD, Threat model (STRIDE)</li>
          <li>Prototype: Werkende demo (mag mock data gebruiken)</li>
          <li>Test & Validatie: Unit/integratie/security tests, AI-model evaluatie</li>
        </ul>
        <h3>Kwaliteitscriteria</h3>
        <ul>
          <li>Toepassing van kennis uit eerdere hackathons</li>
          <li>Correctheid en volledigheid van modellen</li>
          <li>Integratie van alle disciplines</li>
          <li>Werkende demo bij review</li>
          <li>Bedrijfsbelangen & SDG’s meegenomen</li>
          <li>Proces voor kwaliteitscontrole</li>
          <li>Aantoonbare security</li>
          <li>Feedback gevraagd, verwerkt en gedeeld</li>
        </ul>
      </div>
      <div style="margin-top:2rem;">
        <button id="counter" type="button"></button>
      </div>
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
