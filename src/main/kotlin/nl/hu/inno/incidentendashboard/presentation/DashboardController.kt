package nl.hu.inno.incidentendashboard.presentation

import nl.hu.inno.incidentendashboard.application.DashboardService
import nl.hu.inno.incidentendashboard.domain.Incident
import nl.hu.inno.incidentendashboard.presentation.dto.IncidentRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/dashboard")
class DashboardController(
    val service : DashboardService
) {
    @GetMapping("/incidents/{id}")
    fun getIncident(@PathVariable id: Long) : ResponseEntity<Incident> {
        val incident = service.getIncident(id)

        return ResponseEntity.ok(incident)
    }

    @GetMapping("/incidents")
    fun getAllIncidents() : ResponseEntity<List<Incident>> {
        val incidents = service.getAllIncidents()
        return ResponseEntity.ok(incidents)
    }

    @PostMapping("/incidents")
    fun reportIncident(@RequestBody dto: IncidentRequest): ResponseEntity<Incident> {
        val incident = service.createIncident(dto.name, dto.date, dto.safetyRegion, dto.gpsLocation, dto.threatLevel, dto.type, dto.status)

        return ResponseEntity.ok(incident)
    }
}