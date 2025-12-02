export function renderDashboard() {
  return `
    <div style="max-width:1200px;margin:2rem auto;">
      <h1>Incident Dashboard</h1>
      
      <div">
        <select id="filterThreat">
          <option value="">All Threat Levels</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        
        <select id="filterType">
          <option value="">All Types</option>
          <option value="WEATHER">Weather</option>
          <option value="TRAFFIC">Traffic</option>
          <option value="CRIME">Crime</option>
        </select>
        
        <select id="filterStatus">
          <option value="">All Status</option>
          <option value="ONGOING">Ongoing</option>
          <option value="RESOLVED">Resolved</option>
          <option value="PLANNED">Planned</option>
        </select>
        
        <button id="refreshBtn">Refresh</button>
      </div>
      
      <div id="incidentsContainer">
        <div>Loading inchident...</div>
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
            document.getElementById('incidentsContainer').innerHTML =>Failed to load inchident</div>';
          }
        } catch (error) {
          document.getElementById('incidentsContainer').innerHTML =>Error: ' + error.message + '</div>';
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
          document.getElementById('incidentsContainer').innerHTML = '<div>No inchidents found</div>';
          return;
        }
        
        const html = filtered.map(incident => {
          return \`
            <div>
              <h3>\${incident.name}</h3>
              <div>
                <p><strong>Type:</strong> \${incident.type}</p>
                <p><strong>Threat Level:</strong> \${incident.threatLevel}</p>
                <p><strong>Status:</strong> \${incident.status}</p>
                <p><strong>Date:</strong> \${incident.date}</p>
                <p><strong>Location:</strong> \${incident.gpsLocation}</p>
                <p><strong>Region:</strong> \${incident.safetyRegion.replace(/_/g, ' ')}</p>
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
