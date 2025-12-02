package nl.hu.inno.incidentendashboard.application

import nl.hu.inno.incidentendashboard.data.IncidentRepository
import nl.hu.inno.incidentendashboard.domain.Incident
import nl.hu.inno.incidentendashboard.domain.IncidentType
import nl.hu.inno.incidentendashboard.domain.SafetyRegion
import nl.hu.inno.incidentendashboard.domain.Status
import nl.hu.inno.incidentendashboard.domain.ThreatLevel
import nl.hu.inno.incidentendashboard.domain.exception.IncidentNotFoundException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class DashboardService(
    @Autowired private val incidentRepository: IncidentRepository,
) {
    fun getIncident(id: Long): Incident {
        val incident = incidentRepository.findByIdOrNull(id)

        if (incident == null) {
            throw IncidentNotFoundException("No incident found with id: $id")
        }

        return incident
    }

    fun getAllIncidents(): List<Incident> {
        return incidentRepository.findAll()
    }

    fun createIncident(name: String, date: LocalDate, safetyRegion: String, gpsLocation: String, threatLevel: String, type: String, status: String): Incident {
        val incident = Incident.of(name, date, SafetyRegion.valueOf(safetyRegion), gpsLocation, ThreatLevel.valueOf(threatLevel), IncidentType.valueOf(type), Status.valueOf(status))
        return incidentRepository.save(incident)
    }
}