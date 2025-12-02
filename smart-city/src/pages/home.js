export function renderHome(viteLogo, javascriptLogo) {
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
    </div>
  `;
}
