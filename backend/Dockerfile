# Use official Java runtime
FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/UltimateStats-0.0.1-SNAPSHOT.jar"]