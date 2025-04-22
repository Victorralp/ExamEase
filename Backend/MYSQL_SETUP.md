# MySQL Setup Instructions for ExamEase

This guide will help you switch from PostgreSQL to MySQL for the ExamEase backend.

## Prerequisites

1. MySQL server installed and running on your machine
2. MySQL user with privileges to create databases

## Setup Steps

### 1. Ensure MySQL Dependencies are Present

The project is already configured with the MySQL Connector dependency in the `pom.xml` file:

```xml
<!-- MySQL Connector -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

### 2. Configure the Application to Use MySQL

There are two ways to switch to MySQL:

#### Option 1: Use application-mysql.properties

Run the application with the MySQL profile:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

#### Option 2: Update application.properties

Replace the PostgreSQL configuration in `src/main/resources/application.properties` with MySQL configuration:

```properties
# Database configuration
spring.datasource.url=jdbc:mysql://localhost:3306/examease?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

### 3. MySQL Configuration Details

- **Database URL**: `jdbc:mysql://localhost:3306/examease`
  - Change `localhost` to your MySQL server address if needed
  - Change `3306` to your MySQL port if different
  - Change `examease` to your preferred database name

- **Username/Password**: Default is `root`/`root` 
  - Replace with your MySQL credentials

### 4. First Run and Database Creation

When you first run the application with MySQL configuration, Hibernate will:
1. Create the database if it doesn't exist
2. Create all necessary tables based on the entity models
3. Apply all constraints and relationships

### 5. JSON Column Type in MySQL

MySQL 8+ supports JSON column types. The Log entity uses a JSON column:

```java
@Column(columnDefinition = "JSON")
private String details = "{}";
```

This is compatible with MySQL 8+ and should work without modification.

### Troubleshooting

1. **Connection Issues**: Ensure MySQL server is running and accessible
2. **Authentication Issues**: Verify username and password are correct
3. **Permission Issues**: Ensure user has privileges to create/modify databases

## Additional Resources

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Spring Boot MySQL Configuration](https://spring.io/guides/gs/accessing-data-mysql/)