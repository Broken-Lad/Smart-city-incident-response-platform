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
    const response = await fetch('/api/dashboard/incidents');

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

  const html = filtered.map(i => `
    <div>
      <h3>${i.name}</h3>
      <p><strong>Type:</strong> ${i.type}</p>
      <p><strong>Threat Level:</strong> ${i.threatLevel}</p>
      <p><strong>Status:</strong> ${i.status}</p>
      <p><strong>Date:</strong> ${i.date}</p>
      <p><strong>Location:</strong> ${i.gpsLocation}</p>
      <p><strong>Region:</strong> ${i.safetyRegion.replace(/_/g, ' ')}</p>
    </div>
  `).join('');

  document.getElementById('incidentsContainer').innerHTML = html;
}
