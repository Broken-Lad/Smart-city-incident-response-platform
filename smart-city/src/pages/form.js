export function renderForm(viteLogo, javascriptLogo) {
  return `
    <div>
      <h1>Report New Incident</h1>
      <form id="incidentForm">
        <div>
          <label for="name">Incident Name:</label>
          <input type="text" id="name" name="name" required/>
        </div>
        
        <div>
          <label for="date">Date:</label>
          <input type="date" id="date" name="date" required/>
        </div>
        
        <div>
          <label for="gpsLocation">GPS Location:</label>
          <input type="text" id="gpsLocation" name="gpsLocation" placeholder="e.g., 52.5200,13.4050" required/>
        </div>
        
        <div>
          <label for="threatLevel">Threat Level:</label>
          <select id="threatLevel" name="threatLevel" required>
            <option value="">-- Select --</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        
        <div>
          <label for="type">Incident Type:</label>
          <select id="type" name="type" required>
            <option value="">-- Select --</option>
            <option value="WEATHER">Weather</option>
            <option value="TRAFFIC">Traffic</option>
            <option value="CRIME">Crime</option>
            <option value="CYBER_ATTACK">Cyber Attack</option>
            <option value="FIRE">Fire</option>
            <option value="MEDICAL_EMERGENCY">Medical Emergency</option>
            <option value="POWER_OUTAGE">Power Outage</option>
          </select>
        </div>
        
        <div>
          <label for="status">Status:</label>
          <select id="status" name="status" required>
            <option value="">-- Select --</option>
            <option value="ONGOING">Ongoing</option>
            <option value="RESOLVED">Resolved</option>
            <option value="PLANNED">Planned</option>
          </select>
        </div>
        
        <div>
          <label for="safetyRegion">Safety Region:</label>
          <select id="safetyRegion" name="safetyRegion" required>
            <option value="">-- Select --</option>
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
        
        <button type="submit" style="margin: 25px;">Submit Incident Report</button>
      </form>
      <div id="message"></div>
    </div>

    <img width="300" height="200" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.tenor.com%2Fm%2FnuuxiBetq8oAAAAd%2Fcharles-leclerc-inchident.gif&f=1&nofb=1&ipt=489efca06723ac8d6fe09524e88262dc01078e5319ec8b0d3c2668dcf2615eaa" alt="Just an inchident" />

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
            messageDiv.style.display = 'block';
            document.getElementById('incidentForm').reset();
          } else {
            messageDiv.textContent = 'Error submitting incident: ' + response.statusText;
            messageDiv.style.display = 'block';
          }
        } catch (error) {
          messageDiv.textContent = 'Network error: ' + error.message;
          messageDiv.style.display = 'block';
        }
      });
    </script>
  `;
}
