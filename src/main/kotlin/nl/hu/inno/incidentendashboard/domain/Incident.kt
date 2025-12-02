package nl.hu.inno.incidentendashboard.domain

import java.time.LocalDate

class Incident(
    val id: Long = 0,
    val name: String,
    val date: LocalDate,
    val safetyRegion: SafetyRegion,
    val gpsLocation: String,
    val threatLevel: ThreatLevel,
    val type: IncidentType,
    val status: Status
) {
    companion object {
        fun of(
            name: String,
            date: LocalDate,
            safetyRegion: SafetyRegion,
            gpsLocation: String,
            threatLevel: ThreatLevel,
            type: IncidentType,
            status: Status
        ): Incident {
            return Incident(
                id = 0,
                name = name,
                date = date,
                safetyRegion = safetyRegion,
                gpsLocation = gpsLocation,
                threatLevel = threatLevel,
                type = type,
                status = status
            )
        }
    }
}