# GitHub Copilot / AI Agent instructions for Smart City Incident Response Platform

Summary
- This repo contains a Spring Boot Kotlin backend and a Vite-based frontend (smart-city). The backend is a layered, lightweight prototype (presentation -> application -> data) and uses Spring Data JPA with a Postgres DB.
- The frontend is a lightweight single-page app (Vite) with simple hash routing and page modules under `smart-city/src/pages`.

Important files & locations
- Backend: `src/main/kotlin/nl/hu/inno/incidentendashboard`
  - Domain models: `domain/Incident.kt`, `ThreatLevel.kt`, `Status.kt`, `SafetyRegion.kt`, `IncidentType.kt` (see `documentatie/UML-diagram.md` for mermaid diagram and fields).
  - Repository: `data/IncidentRepository.kt` (extends `JpaRepository`).
  - Service: `application/DashboardService.kt` (business logic layer).
  - Controller: `presentation/DashboardController.kt` (REST endpoints; currently empty — add endpoints here).
- Config: `src/main/resources/application.properties` (DB connection: postgres on `localhost:15432` in compose).
- Docker: `docker-compose.yml` spins up Postgres on host port 15432. See `development/db/init.sql` for DB creation.
- Frontend: `smart-city/src/main.js` + `smart-city/src/pages/*.js`. `index.html` sets up top-nav.

Developer workflows
- Start Postgres locally:
  - `docker compose up -d` from the repo root (or use Docker Desktop).
  - Confirm DB on port 15432.
- Run backend services (use Gradle wrapper):
  - Windows: `cd <repo-root> && .\\gradlew.bat bootRun`
  - Unix: `./gradlew bootRun`
  - Build/tests: `./gradlew build` and `./gradlew test`
- Run frontend (Vite):
  - `cd smart-city && npm ci && npm run dev`.
  - Open the app: `http://localhost:5173` (default Vite port).
- Quick API testing: use `curl`, Postman, or a browser to access `http://localhost:8080` (backend default).

Project-specific conventions & patterns (discoverable)
- Backend package organization by layer (presentation, application, data, domain). Keep new controller endpoints in `presentation`, business logic in `application`, and DB interactions in `data`.
- Domain objects are simple Kotlin classes and enums. They are meant to be JPA entities; add `@Entity` / `@Id` annotations when persisting.
- `IncidentRepository` is a Spring Data repository: prefer using it for CRUD operations rather than wiring custom JDBC.
- Frontend pages return HTML strings (e.g., `renderHome` in `smart-city/src/pages/home.js`). Use this pattern for `renderForm` in `smart-city/src/pages/form.js` and add form navigation to `index.html` and `main.js`.

Integration & Implementation points — examples to guide edits
- Adding a POST endpoint to persist incidents (backend):
  - Update `domain/Incident.kt` to be a JPA entity:
    - Add `@Entity` annotation and `@Id`/`@GeneratedValue` for `id`.
  - Add a simple DTO for HTTP requests, map it to `Incident`, then save with `IncidentRepository`.
  - Example controller method (in `presentation/DashboardController.kt`):
    ```kotlin
    @PostMapping("/incidents")
    fun createIncident(@RequestBody dto: CreateIncidentDto): ResponseEntity<Incident> {
      val entity = incidentRepository.save(dto.toEntity())
      return ResponseEntity.status(HttpStatus.CREATED).body(entity)
    }
    ```
- Frontend form (client-side): implement `renderForm` in `smart-city/src/pages/form.js` to match domain fields (name, date, gpsLocation, threatLevel, type, status, safetyRegion). Example fetch call:
    ```js
    fetch('/api/dashboard/incidents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, date, gpsLocation, threatLevel, type, status, safetyRegion })
    })
    ```
  - Add `nav` entry to `index.html` and import `renderForm` in `main.js` (follow the pattern used for `home`, `about`, `threatmodel`).

Testing & stability notes
- The current project includes a Spring Boot startup test (`IncidentendashboardApplicationTests`) that ensures the context loads. When adding integration or endpoint tests, add `@SpringBootTest` or `@WebMvcTest` as needed.
- The backend uses `spring.jpa.hibernate.ddl-auto=create-drop` so entities will be created at runtime — update this if you need non-volatile DB.

PR / Local dev guidance for AI agent
- When editing Kotlin, run `./gradlew build` and `./gradlew test` before committing.
- When editing frontend, run `npm run dev` and validate the UI (and `npm run build` when finalizing).
- Open `documentatie/UML-diagram.md` (mermaid) as the canonical domain guide for enum values & fields; keep frontend form fields aligned with domain objects.

Common gotchas
- `Incident` currently lacks JPA annotations (no `@Entity`); adding persistence requires proper JPA mapping.
- `DashboardController` has a base mapping `@RequestMapping("/api/dashboard")`; any new endpoints should be added under that path (or change it to `/api/incidents` consistent across the app).
- Frontend `main.js` imports `renderHome`, `renderAbout`, and `renderThreatModel` — add `form` to imports and routing when adding the page.

If you edit the code
- Run `./gradlew build` and `npm run dev` for frontend; test in your browser and fetch APIs with `curl`/`Postman`.
- When implementing persistence, add a small integration test that posts a sample incident.

Questions or missing details you may ask the repo owner
- Confirm desired API path and payload for creating incidents — should it be `/api/dashboard/incidents` or `/api/incidents`?
- Confirm whether `Incident` should be an `@Entity` and if custom JPA field names are preferred.
- Should the frontend talk to `localhost:8080` directly (CORS) or through a proxy? No proxy config currently exists in `smart-city`.

Thanks — please tell me if you want me to:
- Implement the front-end `form` page and wire navigation
- Add a backend POST endpoint (controller + service + entity mapping)
- Add integration tests covering the new endpoint
