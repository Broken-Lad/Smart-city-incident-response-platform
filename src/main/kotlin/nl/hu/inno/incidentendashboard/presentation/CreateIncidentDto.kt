package nl.hu.inno.incidentendashboard.presentation

import nl.hu.inno.incidentendashboard.domain.*
import java.time.LocalDate

data class CreateIncidentDto(
    val name: String,
    val date: LocalDate,
    val gpsLocation: String,
    val threatLevel: ThreatLevel,
    val type: IncidentType,
    val status: Status,
    val safetyRegion: SafetyRegion
) {
    fun toEntity(): Incident {
        return Incident(
            name = name,
            date = date,
            gpsLocation = gpsLocation,
            threatLevel = threatLevel,
            type = type,
            status = status,
            safetyRegion = safetyRegion
        )
    }
}
