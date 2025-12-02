package nl.hu.inno.incidentendashboard.domain

import java.time.LocalDate

class Incident(
    val id: Long,
    val name: String,
    val date: LocalDate,
    val safetyRegion: SafetyRegion,
    val gpsLocation: String,
    val threatLevel: ThreatLevel,
    val type: IncidentType,
    val status: Status
) {
}