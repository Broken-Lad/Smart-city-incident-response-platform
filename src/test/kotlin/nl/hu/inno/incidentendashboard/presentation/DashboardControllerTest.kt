package nl.hu.inno.incidentendashboard.presentation

import com.fasterxml.jackson.databind.ObjectMapper
import nl.hu.inno.incidentendashboard.application.DashboardService
import nl.hu.inno.incidentendashboard.domain.*
import nl.hu.inno.incidentendashboard.presentation.dto.IncidentRequest
import nl.hu.inno.incidentendashboard.security.SecurityConfig
import org.junit.jupiter.api.Test
import org.mockito.Mockito.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.context.annotation.Import
import org.springframework.http.MediaType
import org.springframework.test.context.bean.override.mockito.MockitoBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.post
import java.time.LocalDate

@WebMvcTest(DashboardController::class)
@Import(SecurityConfig::class)
class DashboardControllerTest{
    @Autowired
    lateinit var mockMvc: MockMvc

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @MockitoBean
    lateinit var service: DashboardService

    @Test
    fun `GET incident returns 200 with body`() {
        val incident = Incident.of(
            "Stormschade",
            LocalDate.of(2024,2,1),
            SafetyRegion.FLEVOLAND,
            "52.5, 5.7",
            ThreatLevel.HIGH,
            IncidentType.WEATHER,
            Status.ONGOING
        )

        `when`(service.getIncident(1L)).thenReturn(incident)

        mockMvc.get("/api/dashboard/incidents/1")
            .andExpect {
                status { isOk() }
                content { json(objectMapper.writeValueAsString(incident)) }
            }
    }

    @Test
    fun `GET all incidents returns list`() {
        val incident = Incident.of(
            "A2 file",
            LocalDate.of(2024,2,2),
            SafetyRegion.UTRECHT,
            "52.10, 5.11",
            ThreatLevel.LOW,
            IncidentType.TRAFFIC,
            Status.PLANNED
        )

        `when`(service.getAllIncidents()).thenReturn(listOf(incident))

        mockMvc.get("/api/dashboard/incidents")
            .andExpect {
                status { isOk() }
                content { json(objectMapper.writeValueAsString(listOf(incident))) }
            }
    }

    @Test
    fun `POST incident returns created instance`() {
        val dto = IncidentRequest(
            name = "Diefstal centrum",
            date = LocalDate.of(2024, 3, 1),
            safetyRegion = "AMSTERDAM_AMSTELLAND",
            gpsLocation = "52.37, 4.90",
            threatLevel = "MEDIUM",
            type = "CRIME",
            status = "RESOLVED"
        )

        val incident = Incident.of(
            dto.name,
            dto.date,
            SafetyRegion.AMSTERDAM_AMSTELLAND,
            dto.gpsLocation,
            ThreatLevel.MEDIUM,
            IncidentType.CRIME,
            Status.RESOLVED
        )

        `when`(service.createIncident(
            dto.name,
            dto.date,
            dto.safetyRegion,
            dto.gpsLocation,
            dto.threatLevel,
            dto.type,
            dto.status
        )).thenReturn(incident)

        mockMvc.post("/api/dashboard/incidents") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(dto)
        }.andExpect {
            status { isOk() }
            content { json(objectMapper.writeValueAsString(incident)) }
        }
    }
}
