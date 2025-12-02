package nl.hu.inno.incidentendashboard.presentation.dto

import java.time.LocalDate

data class IncidentRequest(
    val name: String,
    val date: LocalDate,
    val safetyRegion: String,
    val gpsLocation: String,
    val threatLevel: String,
    val type: String,
    val status: String
) {
}