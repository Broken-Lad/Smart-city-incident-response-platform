package nl.hu.inno.incidentendashboard.domain

import java.time.LocalDate

class Incident(
    val id: Long,
    val name: String,
    val data: LocalDate,
    val threatLevel: ThreatLevel,
    val category: IncidentType,
    val status: Status
) {
}