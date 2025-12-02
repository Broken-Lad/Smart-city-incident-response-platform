package nl.hu.inno.incidentendashboard.presentation

import com.fasterxml.jackson.databind.ObjectMapper
import nl.hu.inno.incidentendashboard.application.DashboardService
import nl.hu.inno.incidentendashboard.domain.*
import nl.hu.inno.incidentendashboard.presentation.dto.IncidentRequest
import org.junit.jupiter.api.Test
import org.mockito.Mockito.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.post
import java.time.LocalDate

@WebMvcTest(DashboardController::class)
class DashboardControllerTest(
    @Autowired val mockMvc: MockMvc,
    @Autowired val objectMapper: ObjectMapper
) {

    @MockBean
    lateinit var service: DashboardService

    @Test
    fun `GET incident returns 200 and body`() {
        val incident = Incident.of(
            "TestInc", LocalDate.now(), SafetyRegion.NOORD,
            "gps", ThreatLevel.HIGH, IncidentType.BRAND, Status.ACTIVE
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
            "Test", LocalDate.now(), SafetyRegion.NOORD,
            "gps", ThreatLevel.MEDIUM, IncidentType.ONGEVAL, Status.NEW
        )

        `when`(service.getAllIncidents()).thenReturn(listOf(incident))

        mockMvc.get("/api/dashboard/incidents")
            .andExpect {
                status { isOk() }
                content { json(objectMapper.writeValueAsString(listOf(incident))) }
            }
    }

    @Test
    fun `POST incident calls service and returns created incident`() {
        val dto = IncidentRequest(
            name = "Naam",
            date = LocalDate.of(2024,1,1),
            safetyRegion = "NOORD",
            gpsLocation = "gps",
            threatLevel = "LOW",
            type = "ONGEVAL",
            status = "NEW"
        )

        val incident = Incident.of(
            "Naam", dto.date, SafetyRegion.NOORD,
            "gps", ThreatLevel.LOW, IncidentType.ONGEVAL, Status.NEW
        )

        `when`(
            service.createIncident(
                dto.name, dto.date, dto.safetyRegion,
                dto.gpsLocation, dto.threatLevel, dto.type, dto.status
            )
        ).thenReturn(incident)

        mockMvc.post("/api/dashboard/incidents") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(dto)
        }.andExpect {
            status { isOk() }
            content { json(objectMapper.writeValueAsString(incident)) }
        }
    }
}
