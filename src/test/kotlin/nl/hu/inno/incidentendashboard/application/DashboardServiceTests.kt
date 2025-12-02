package nl.hu.inno.incidentendashboard.application

import nl.hu.inno.incidentendashboard.data.IncidentRepository
import nl.hu.inno.incidentendashboard.domain.*
import nl.hu.inno.incidentendashboard.domain.exception.IncidentNotFoundException
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito.*
import java.time.LocalDate

class DashboardServiceTest {

    private val repository = mock(IncidentRepository::class.java)
    private val service = DashboardService(repository)

    @Test
    fun `getIncident returns incident when found`() {
        val incident = Incident.of(
            "Stormschade",
            LocalDate.now(),
            SafetyRegion.UTRECHT,
            "52.0907, 5.1214",
            Threatlevel.HIGH,
            IncidentType.WEATHER,
            Status.ONGOING
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
    fun `getAllIncidents returns list`() {
        val list = listOf(mock(Incident::class.java))

        `when`(repository.findAll()).thenReturn(list)

        val result = service.getAllIncidents()

        assertEquals(list, result)
        verify(repository).findAll()
    }

    @Test
    fun `createIncident creates and saves incident`() {
        val date = LocalDate.of(2024, 1, 1)

        val expected = Incident.of(
            "Botsing A12",
            date,
            SafetyRegion.ZUID_HOLLAND_ZUID,
            "51.833, 4.642",
            Threatlevel.MEDIUM,
            IncidentType.TRAFFIC,
            Status.PLANNED
        )

        `when`(repository.save(any(Incident::class.java))).thenReturn(expected)

        val result = service.createIncident(
            name = "Botsing A12",
            date = date,
            safetyRegion = "ZUID_HOLLAND_ZUID",
            gpsLocation = "51.833, 4.642",
            threatLevel = "MEDIUM",
            type = "TRAFFIC",
            status = "PLANNED"
        )

        assertEquals(expected, result)
        verify(repository).save(any(Incident::class.java))
    }
}
