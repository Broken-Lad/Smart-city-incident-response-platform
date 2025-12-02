package nl.hu.inno.incidentendashboard.domain

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "incidents")
class Incident(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String = "",
    val date: LocalDate = LocalDate.now(),
    @Enumerated(EnumType.STRING)
    val safetyRegion: SafetyRegion = SafetyRegion.EMPTY,
    val gpsLocation: String = "",
    @Enumerated(EnumType.STRING)
    val threatLevel: ThreatLevel = ThreatLevel.EMPTY,
    @Enumerated(EnumType.STRING)
    val type: IncidentType = IncidentType.EMPTY,
    @Enumerated(EnumType.STRING)
    val status: Status = Status.EMPTY
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