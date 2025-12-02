# ===========================
# 1) Build Stage
# ===========================
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copy Gradle files first to leverage Docker caching
COPY gradlew .
COPY gradle ./gradle
RUN chmod +x gradlew

# Copy dependency files first to cache dependencies
COPY build.gradle.kts .
COPY settings.gradle.kts .

# Download dependencies (cached layer)
RUN ./gradlew dependencies --no-daemon || true

# Copy full source code
COPY src ./src

# Build executable JAR
RUN ./gradlew bootJar --no-daemon

# ===========================
# 2) Run Stage
# ===========================
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy fat JAR from previous stage
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
