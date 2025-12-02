export function renderDashboard() {
  return `
    <div style="max-width:1200px;margin:2rem auto;">
      <h1>Incident Dashboard</h1>
      
      <div style="display:flex;gap:1rem;margin-bottom:2rem;flex-wrap:wrap;">
        <select id="filterThreat" style="padding:0.5rem;border:1px solid #ccc;border-radius:4px;cursor:pointer;">
          <option value="">All Threat Levels</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        
        <select id="filterType" style="padding:0.5rem;border:1px solid #ccc;border-radius:4px;cursor:pointer;">
          <option value="">All Types</option>
          <option value="WEATHER">Weather</option>
          <option value="TRAFFIC">Traffic</option>
          <option value="CRIME">Crime</option>
        </select>
        
        <select id="filterStatus" style="padding:0.5rem;border:1px solid #ccc;border-radius:4px;cursor:pointer;">
          <option value="">All Status</option>
          <option value="ONGOING">Ongoing</option>
          <option value="RESOLVED">Resolved</option>
          <option value="PLANNED">Planned</option>
        </select>
        
        <button id="refreshBtn" style="padding:0.5rem 1rem;background:#28a745;color:white;border:none;border-radius:4px;cursor:pointer;font-weight:bold;">Refresh</button>
      </div>
      
      <div id="incidentsContainer" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(350px,1fr));gap:1rem;">
        <div style="grid-column:1/-1;text-align:center;padding:2rem;">Loading incidents...</div>
      </div>
    </div>

    <script>
      let allIncidents = [];
      
      async function loadIncidents() {
        try {
          const response = await fetch('/api/dashboard/incidents');
          if (response.ok) {
            allIncidents = await response.json();
            filterAndRender();
          } else {
            document.getElementById('incidentsContainer').innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#721c24;">Failed to load incidents</div>';
          }
        } catch (error) {
          document.getElementById('incidentsContainer').innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#721c24;">Error: ' + error.message + '</div>';
        }
      }
      
      function getThreatColor(threatLevel) {
        switch(threatLevel) {
          case 'LOW': return '#d4edda';
          case 'MEDIUM': return '#fff3cd';
          case 'HIGH': return '#f8d7da';
          default: return '#f0f0f0';
        }
      }
      
      function getThreatTextColor(threatLevel) {
        switch(threatLevel) {
          case 'LOW': return '#155724';
          case 'MEDIUM': return '#856404';
          case 'HIGH': return '#721c24';
          default: return '#333';
        }
      }
      
      function filterAndRender() {
        const threatFilter = document.getElementById('filterThreat').value;
        const typeFilter = document.getElementById('filterType').value;
        const statusFilter = document.getElementById('filterStatus').value;
        
        const filtered = allIncidents.filter(incident => {
          return (!threatFilter || incident.threatLevel === threatFilter) &&
                 (!typeFilter || incident.type === typeFilter) &&
                 (!statusFilter || incident.status === statusFilter);
        });
        
        if (filtered.length === 0) {
          document.getElementById('incidentsContainer').innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:2rem;color:#666;">No incidents found</div>';
          return;
        }
        
        const html = filtered.map(incident => {
          const bgColor = getThreatColor(incident.threatLevel);
          const textColor = getThreatTextColor(incident.threatLevel);
          return \`
            <div style="border:1px solid #ddd;border-radius:8px;padding:1rem;background:\${bgColor};color:\${textColor};">
              <h3 style="margin:0 0 0.5rem 0;">\${incident.name}</h3>
              <div style="font-size:0.9rem;line-height:1.6;">
                <p style="margin:0.25rem 0;"><strong>Type:</strong> \${incident.type}</p>
                <p style="margin:0.25rem 0;"><strong>Threat Level:</strong> \${incident.threatLevel}</p>
                <p style="margin:0.25rem 0;"><strong>Status:</strong> \${incident.status}</p>
                <p style="margin:0.25rem 0;"><strong>Date:</strong> \${incident.date}</p>
                <p style="margin:0.25rem 0;"><strong>Location:</strong> \${incident.gpsLocation}</p>
                <p style="margin:0.25rem 0;"><strong>Region:</strong> \${incident.safetyRegion.replace(/_/g, ' ')}</p>
              </div>
            </div>
          \`;
        }).join('');
        
        document.getElementById('incidentsContainer').innerHTML = html;
      }
      
      document.getElementById('filterThreat').addEventListener('change', filterAndRender);
      document.getElementById('filterType').addEventListener('change', filterAndRender);
      document.getElementById('filterStatus').addEventListener('change', filterAndRender);
      document.getElementById('refreshBtn').addEventListener('click', loadIncidents);
      
      loadIncidents();
    </script>
  `;
}
