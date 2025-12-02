package nl.hu.inno.incidentendashboard.domain

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "incidents")
class Incident(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    
    val name: String,
    val date: LocalDate,
    val safetyRegion: SafetyRegion,
    val gpsLocation: String,
    val threatLevel: ThreatLevel,
    val type: IncidentType,
    val status: Status
) {
}