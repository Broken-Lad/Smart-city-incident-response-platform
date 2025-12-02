package  nl.hu.inno.incidentendashboard.application

import nl.hu.inno.incidentendashboard.data.IncidentRepository
import nl.hu.inno.incidentendashboard.domain.*
import nl.hu.inno.incidentendashboard.domain.exception.IncidentNotFoundException
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito.*
import java.time.LocalDate
import java.util.*

class DashboardServiceTest {

    private val repository = mock(IncidentRepository::class.java)
    private val service = DashboardService(repository)

    @Test
    fun `getIncident returns incident when found`() {
        val incident = Incident.of(
            "Test", LocalDate.now(), SafetyRegion.MIDDEN, "gps",
            ThreatLevel.HIGH, IncidentType.BRAND, Status.ACTIVE
        )

        `when`(repository.findByIdOrNull(1L)).thenReturn(incident)

        val result = service.getIncident(1L)

        assertEquals(incident, result)
        verify(repository).findByIdOrNull(1L)
    }

    @Test
    fun `getIncident throws IncidentNotFoundException when not found`() {
        `when`(repository.findByIdOrNull(99L)).thenReturn(null)

        assertThrows<IncidentNotFoundException> {
            service.getIncident(99L)
        }

        verify(repository).findByIdOrNull(99L)
    }

    @Test
    fun `getAllIncidents returns list from repository`() {
        val list = listOf(mock(Incident::class.java))
        `when`(repository.findAll()).thenReturn(list)

        val result = service.getAllIncidents()

        assertEquals(list, result)
        verify(repository).findAll()
    }

    @Test
    fun `createIncident creates and saves incident with correct values`() {
        val date = LocalDate.of(2024, 1, 1)

        val expected = Incident.of(
            "Naam", date, SafetyRegion.NOORD, "gps",
            ThreatLevel.LOW, IncidentType.ONGEVAL, Status.NEW
        )

        `when`(repository.save(any(Incident::class.java))).thenReturn(expected)

        val result = service.createIncident(
            "Naam", date, "NOORD", "gps", "LOW", "ONGEVAL", "NEW"
        )

        assertEquals(expected, result)

        verify(repository).save(any(Incident::class.java))
    }
}
