const API_BASE_URL = import.meta.env.VITE_SERVER_URI || 'http://localhost:8080';

export function initFormHandler() {
  const form = document.getElementById('incidentForm');
  form.addEventListener('submit', onSubmitIncident);
}

async function onSubmitIncident(e) {
  e.preventDefault();
  
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
    const response = await fetch(`${API_BASE_URL}/api/dashboard/incidents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    });

    console.log("response", response);
  } catch (err) {
    console.error("Error:", err);
  }
}
