package nl.hu.inno.incidentendashboard.data

import nl.hu.inno.incidentendashboard.domain.Incident
import org.springframework.data.jpa.repository.JpaRepository

interface IncidentRepository : JpaRepository<Incident, Long> {
}