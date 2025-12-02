const API_BASE_URL = import.meta.env.VITE_SERVER_URI || 'http://localhost:8080';
let allIncidents = [];

export function initDashboardHandler() {
  const threat = document.getElementById('filterThreat');
  const type = document.getElementById('filterType');
  const status = document.getElementById('filterStatus');
  const refresh = document.getElementById('refreshBtn');

  if (!threat || !type || !status || !refresh) {
    console.warn("Dashboard elements not found");
    return;
  }

  threat.addEventListener('change', filterAndRender);
  type.addEventListener('change', filterAndRender);
  status.addEventListener('change', filterAndRender);
  refresh.addEventListener('click', loadIncidents);

  loadIncidents();
}

async function loadIncidents() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/incidents`);

    if (!response.ok) {
      document.getElementById('incidentsContainer').innerHTML =
        '<div>Failed to load incidents</div>';
      return;
    }

    allIncidents = await response.json();
    filterAndRender();

  } catch (error) {
    document.getElementById('incidentsContainer').innerHTML =
      '<div>Error: ' + error.message + '</div>';
  }
}

function filterAndRender() {
  const threat = document.getElementById('filterThreat').value;
  const type = document.getElementById('filterType').value;
  const status = document.getElementById('filterStatus').value;

  const filtered = allIncidents.filter(i =>
    (!threat || i.threatLevel === threat) &&
    (!type || i.type === type) &&
    (!status || i.status === status)
  );

  if (!filtered.length) {
    document.getElementById('incidentsContainer').innerHTML =
      '<div>No incidents found</div>';
    return;
  }

  // Render as a table
  const tableHeader = `
    <table class="incident-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Threat Level</th>
          <th>Status</th>
          <th>Date</th>
          <th>Location</th>
          <th>Region</th>
        </tr>
      </thead>
      <tbody>
  `;
  const tableRows = filtered.map(i => `
    <tr>
      <td>${i.name}</td>
      <td>${i.type}</td>
      <td>${i.threatLevel}</td>
      <td>${i.status}</td>
      <td>${i.date}</td>
      <td>${i.gpsLocation}</td>
      <td>${i.safetyRegion.replace(/_/g, ' ')}</td>
    </tr>
  `).join('');
  const tableFooter = '</tbody></table>';
  document.getElementById('incidentsContainer').innerHTML = tableHeader + tableRows + tableFooter;
}
