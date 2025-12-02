export function renderForm(viteLogo, javascriptLogo) {
  return `
    <div style="max-width:600px;margin:2rem auto;">
      <h1>Report New Incident</h1>
      <form id="incidentForm" style="display:flex;flex-direction:column;gap:1rem;">
        <div>
          <label for="name">Incident Name:</label>
          <input type="text" id="name" name="name" required style="width:100%;padding:0.5rem;border:1px solid #ccc;border-radius:4px;" />
        </div>
        
        <div>
          <label for="date">Date:</label>
          <input type="date" id="date" name="date" required style="width:100%;padding:0.5rem;border:1px solid #ccc;border-radius:4px;" />
        </div>
        
        <div>
          <label for="gpsLocation">GPS Location:</label>
          <input type="text" id="gpsLocation" name="gpsLocation" placeholder="e.g., 52.5200,13.4050" required style="width:100%;padding:0.5rem;border:1px solid #ccc;border-radius:4px;" />
        </div>
        
        <div>
          <label for="threatLevel">Threat Level:</label>
          <select id="threatLevel" name="threatLevel" required style="width:100%;padding:0.5rem;border:1px solid #ccc;border-radius:4px;">
            <option value="">-- Select --</option>
            <option value="EMPTY">Empty</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        
        <div>
          <label for="type">Incident Type:</label>
          <select id="type" name="type" required style="width:100%;padding:0.5rem;border:1px solid #ccc;border-radius:4px;">
            <option value="">-- Select --</option>
            <option value="EMPTY">Empty</option>
            <option value="WEATHER">Weather</option>
            <option value="TRAFFIC">Traffic</option>
            <option value="CRIME">Crime</option>
          </select>
        </div>
        
        <div>
          <label for="status">Status:</label>
          <select id="status" name="status" required style="width:100%;padding:0.5rem;border:1px solid #ccc;border-radius:4px;">
            <option value="">-- Select --</option>
            <option value="EMPTY">Empty</option>
            <option value="ONGOING">Ongoing</option>
            <option value="RESOLVED">Resolved</option>
            <option value="PLANNED">Planned</option>
          </select>
        </div>
        
        <div>
          <label for="safetyRegion">Safety Region:</label>
          <select id="safetyRegion" name="safetyRegion" required style="width:100%;padding:0.5rem;border:1px solid #ccc;border-radius:4px;">
            <option value="">-- Select --</option>
            <option value="EMPTY">Empty</option>
            <option value="GRONINGEN">Groningen</option>
            <option value="FRIESLAND">Friesland</option>
            <option value="DRENTHE">Drenthe</option>
            <option value="IJSSSELLAND">IJssselland</option>
            <option value="TWENTE">Twente</option>
            <option value="NOORD_EN_OOST_GELDERLAND">Noord en Oost Gelderland</option>
            <option value="GELDERLAND_MIDDEN">Gelderland Midden</option>
            <option value="GELDERLAND_ZUID">Gelderland Zuid</option>
            <option value="UTRECHT">Utrecht</option>
            <option value="NOORD_HOLLAND_NOORD">Noord Holland Noord</option>
            <option value="ZAANSTREEK_WATERLAND">Zaanstreek Waterland</option>
            <option value="KENNEMERLAND">Kennemerland</option>
            <option value="AMSTERDAM_AMSTELLAND">Amsterdam Amstelland</option>
            <option value="GOOI_EN_VECHTSTREEK">Gooi en Vechtstreek</option>
            <option value="HAAGLANDEN">Haaglanden</option>
            <option value="HOLLANDS_MIDDEN">Hollands Midden</option>
            <option value="ROTTERDAM_RIJNMOND">Rotterdam Rijnmond</option>
            <option value="ZUID_HOLLAND_ZUID">Zuid Holland Zuid</option>
            <option value="ZEELAND">Zeeland</option>
            <option value="MIDDEN_EN_WEST_BRABANT">Midden en West Brabant</option>
            <option value="BRABANT_NOORD">Brabant Noord</option>
            <option value="BRABANT_ZUIDOOST">Brabant Zuidoost</option>
            <option value="LIMBURG_NOORD">Limburg Noord</option>
            <option value="ZUID_LIMBURG">Zuid Limburg</option>
            <option value="FLEVOLAND">Flevoland</option>
          </select>
        </div>
        
        <button type="submit" style="padding:0.75rem;background:#007bff;color:white;border:none;border-radius:4px;cursor:pointer;font-weight:bold;">Submit Incident Report</button>
      </form>
      <div id="message" style="margin-top:1rem;padding:0.75rem;border-radius:4px;display:none;"></div>
    </div>

    <script>
      document.getElementById('incidentForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const messageDiv = document.getElementById('message');
        
        const formData = {
          name: document.getElementById('name').value,
          date: document.getElementById('date').value,
          gpsLocation: document.getElementById('gpsLocation').value,
          threatLevel: document.getElementById('threatLevel').value,
          type: document.getElementById('type').value,
          status: document.getElementById('status').value,
          safetyRegion: document.getElementById('safetyRegion').value
        };
        
        try {
          const response = await fetch('/api/dashboard/incidents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          
          if (response.ok) {
            messageDiv.textContent = 'Incident report submitted';
            messageDiv.style.background = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.display = 'block';
            document.getElementById('incidentForm').reset();
          } else {
            messageDiv.textContent = 'Error submitting incident: ' + response.statusText;
            messageDiv.style.background = '#f8d7da';
            messageDiv.style.color = '#721c24';
            messageDiv.style.display = 'block';
          }
        } catch (error) {
          messageDiv.textContent = 'Network error: ' + error.message;
          messageDiv.style.background = '#f8d7da';
          messageDiv.style.color = '#721c24';
          messageDiv.style.display = 'block';
        }
      });
    </script>
  `;
}
