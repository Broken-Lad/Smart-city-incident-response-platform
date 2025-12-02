export function renderDashboard() {
  return `
    <div style="max-width:1200px;margin:2rem auto;">
      <h1>Incident Dashboard</h1>
      
      <div>
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
  `;
}
