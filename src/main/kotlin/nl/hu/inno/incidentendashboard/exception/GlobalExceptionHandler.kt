package nl.hu.inno.incidentendashboard.exception

import nl.hu.inno.incidentendashboard.domain.exception.IncidentNotFoundException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest

@ControllerAdvice
class RestExceptionHandler {
    @ExceptionHandler(IncidentNotFoundException::class)
    fun handleIncidentNotFound(ex: IncidentNotFoundException, request: WebRequest): ResponseEntity<ExceptionBody> {
        val status = HttpStatus.NOT_FOUND
        val body = ExceptionBody(
            status = status.value(),
            error = status.reasonPhrase,
            message = ex.message,
            path = request.getDescription(false).removePrefix("uri=")
        )
        return ResponseEntity.status(status).body(body)
    }

    @ExceptionHandler(Exception::class)
    fun handleGenericException(ex: Exception, request: WebRequest): ResponseEntity<ExceptionBody> {
        val status = HttpStatus.INTERNAL_SERVER_ERROR
        val body = ExceptionBody(
            status = status.value(),
            error = status.reasonPhrase,
            message = ex.message,
            path = request.getDescription(false).removePrefix("uri=")
        )
        return ResponseEntity.status(status).body(body)
    }
}