package nl.hu.inno.incidentendashboard.presentation

import nl.hu.inno.incidentendashboard.data.IncidentRepository
import nl.hu.inno.incidentendashboard.domain.Incident
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/dashboard")
class DashboardController(
    private val incidentRepository: IncidentRepository
) {
    @PostMapping("/incidents")
    fun createIncident(@RequestBody dto: CreateIncidentDto): ResponseEntity<Incident> {
        val entity = incidentRepository.save(dto.toEntity())
        return ResponseEntity.status(HttpStatus.CREATED).body(entity)
    }
    
    @GetMapping("/incidents")
    fun getAllIncidents(): ResponseEntity<List<Incident>> {
        val incidents = incidentRepository.findAll()
        return ResponseEntity.ok(incidents)
    }
}