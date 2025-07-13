# Use official Java runtime
FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/UltimateStats-0.0.1-SNAPSHOT.jar"]

// dpg-d1ph45ffte5s73cbgg30-a = hostname
// 5432 = port
// ultimatestats_db = database
// ultimatestats_db_user = username
// gXCxEiUjmbsIgb7oSXi6HGbnqzmIjrme = password