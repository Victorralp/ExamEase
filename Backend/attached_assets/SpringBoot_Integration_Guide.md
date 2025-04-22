# Spring Boot Integration Guide for ExamEase Frontend

This guide provides detailed instructions for integrating the ExamEase React.js frontend with your Spring Boot backend.

## 1. Project Structure Overview

### React Frontend
- Uses REST API calls to connect to the backend
- Authentication using JWT tokens
- Role-based access control

### Spring Boot Backend Requirements
- RESTful API endpoints that match the frontend's expectations
- JWT authentication
- CORS configuration
- Matching data models

## 2. Step-by-Step Integration

### Step 1: Set Up Spring Boot Dependencies

Add these dependencies to your `pom.xml` or `build.gradle`:

```xml
<!-- For Maven -->
<dependencies>
    <!-- Spring Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- JWT -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Spring Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- MySQL Connector -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
</dependencies>
```

### Step 2: Configure Spring Boot Application Properties

Create an `application.properties` file with the following settings:

```properties
# Server configuration
server.port=8080

# Database configuration
spring.datasource.url=jdbc:mysql://localhost:3306/examease
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JWT properties
app.jwt.secret=your-very-secure-jwt-secret-key-here-should-be-at-least-64-characters
app.jwt.expiration=86400000
app.jwt.header=Authorization
app.jwt.prefix=Bearer 

# CORS configuration
app.cors.allowedOrigins=http://localhost:3000
```

### Step 3: Implement JPA Entities

Create JPA entity classes that match the frontend data models:

```java
// User.java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String email;
    
    @Column(name = "first_name", nullable = false)
    private String firstName;
    
    @Column(name = "last_name", nullable = false)
    private String lastName;
    
    @Column(nullable = false)
    private String role;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Constructor, getters, setters
}

// Exam.java
@Entity
@Table(name = "exams")
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String subject;
    
    private String description;
    
    @Column(nullable = false)
    private Integer duration;
    
    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;
    
    @Column(name = "end_date")
    private LocalDateTime endDate;
    
    @Column(nullable = false)
    private String status;
    
    @Column(name = "passing_score", nullable = false)
    private Integer passingScore;
    
    @Column(name = "created_by", nullable = false)
    private Long createdBy;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "question_ids", columnDefinition = "JSON")
    private String questionIds;
    
    // Constructor, getters, setters
}

// Question.java, Result.java, Feedback.java, Log.java, Progress.java
// ... similar structure following the data models
```

### Step 4: Implement Spring Security Configuration

Create a security configuration:

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService userDetailsService;
    
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, 
                          CustomUserDetailsService userDetailsService) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userDetailsService = userDetailsService;
    }
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(
                jwtAuthenticationFilter, 
                UsernamePasswordAuthenticationFilter.class
            );
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}
```

### Step 5: Implement JWT Authentication

Create JWT utilities:

```java
// JwtTokenProvider.java
@Component
public class JwtTokenProvider {
    @Value("${app.jwt.secret}")
    private String jwtSecret;
    
    @Value("${app.jwt.expiration}")
    private int jwtExpirationInMs;
    
    public String generateToken(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret)))
                .compact();
    }
    
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret)))
                .build()
                .parseClaimsJws(token)
                .getBody();
        
        return claims.getSubject();
    }
    
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret)))
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception ex) {
            // Log exception
            return false;
        }
    }
}

// JwtAuthenticationFilter.java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenProvider tokenProvider;
    private final CustomUserDetailsService userDetailsService;
    
    @Value("${app.jwt.header}")
    private String tokenHeader;
    
    @Value("${app.jwt.prefix}")
    private String tokenPrefix;
    
    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider, 
                                   CustomUserDetailsService userDetailsService) {
        this.tokenProvider = tokenProvider;
        this.userDetailsService = userDetailsService;
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        // Get JWT token from request
        String token = getJwtFromRequest(request);
        
        // Validate token and set authentication
        if (StringUtils.hasText(token) && tokenProvider.validateToken(token)) {
            String username = tokenProvider.getUsernameFromToken(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            
            UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        
        filterChain.doFilter(request, response);
    }
    
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(tokenHeader);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(tokenPrefix)) {
            return bearerToken.substring(tokenPrefix.length());
        }
        return null;
    }
}
```

### Step 6: Implement REST Controllers

Create controllers that match the frontend API requirements:

```java
// AuthController.java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    
    // Constructor with dependencies
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        String jwt = tokenProvider.generateToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userService.findByUsername(userDetails.getUsername());
        
        // Create response DTO with user info and token
        JwtAuthResponse response = new JwtAuthResponse();
        response.setToken(jwt);
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setRole(user.getRole());
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        if (userService.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        
        if (userService.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        
        // Create user
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setRole(registerRequest.getRole());
        user.setCreatedAt(LocalDateTime.now());
        
        User createdUser = userService.save(user);
        
        // Authenticate user after registration
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                registerRequest.getUsername(),
                registerRequest.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        
        // Create response
        JwtAuthResponse response = new JwtAuthResponse();
        response.setToken(jwt);
        response.setId(createdUser.getId());
        response.setUsername(createdUser.getUsername());
        response.setEmail(createdUser.getEmail());
        response.setFirstName(createdUser.getFirstName());
        response.setLastName(createdUser.getLastName());
        response.setRole(createdUser.getRole());
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username);
        
        if (user == null) {
            return ResponseEntity.status(401).body("User not found");
        }
        
        // Create user DTO without sensitive information
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setRole(user.getRole());
        
        return ResponseEntity.ok(userDto);
    }
}

// ExamController.java, QuestionController.java, ResultController.java, etc.
// Implement similar controllers for each entity
```

### Step 7: Create Service Layer

Implement services to handle business logic:

```java
// UserService.java
@Service
public class UserService {
    private final UserRepository userRepository;
    
    // Constructor with dependencies
    
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));
    }
    
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    public User save(User user) {
        return userRepository.save(user);
    }
    
    // Other methods as needed
}

// Similar service implementations for other entities
```

### Step 8: Create Repository Layer

Implement JPA repositories:

```java
// UserRepository.java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}

// Similar repository interfaces for other entities
```

### Step 9: Update the React Frontend

Modify the frontend to connect to your Spring Boot backend:

1. Update `client/src/lib/queryClient.ts` with proper authentication handling:

```typescript
export async function apiRequest(
  method: string,
  url: string,
  data?: any
): Promise<Response> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Get token from localStorage
  const token = localStorage.getItem("auth_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(response);
  return response;
}
```

2. Update the `AuthProvider` component in `client/src/hooks/use-auth.tsx` to handle JWT:

```typescript
export function AuthProvider({ children }: { children: ReactNode }) {
  // ...existing code

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/auth/login", credentials);
      const data = await res.json();
      // Store the token
      localStorage.setItem("auth_token", data.token);
      return data;
    },
    onSuccess: (user: SelectUser) => {
      queryClient.setQueryData(["/api/user"], user);
    },
    // ...error handling
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterData) => {
      const res = await apiRequest("POST", "/api/auth/register", userData);
      const data = await res.json();
      // Store the token
      localStorage.setItem("auth_token", data.token);
      return data;
    },
    // ...rest of the code
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/auth/logout");
      // Remove the token
      localStorage.removeItem("auth_token");
    },
    // ...rest of the code
  });

  // ...rest of the component
}
```

3. Update API endpoints in all components to match your Spring Boot URLs.

### Step 10: Test the Integration

1. Start your Spring Boot application on port 8080
2. Start the React frontend (will run on port 3000 by default)
3. Test the login/registration functionality
4. Verify that authenticated routes are working
5. Test CRUD operations for all entities

## 3. API Endpoints Required by Frontend

Your Spring Boot application needs to implement these endpoints to match the frontend's expectations:

| Endpoint | Method | Authentication | Description |
|----------|--------|----------------|-------------|
| `/api/auth/register` | POST | Public | User registration |
| `/api/auth/login` | POST | Public | User login |
| `/api/auth/logout` | POST | Authenticated | User logout |
| `/api/auth/user` | GET | Authenticated | Get current user |
| `/api/exams` | GET | Authenticated | Get all exams |
| `/api/exams` | POST | Admin | Create a new exam |
| `/api/exams/{id}` | GET | Authenticated | Get exam by ID |
| `/api/questions` | GET | Admin | Get all questions |
| `/api/questions` | POST | Admin | Create a new question |
| `/api/results` | GET | Authenticated | Get results (filtered by user role) |
| `/api/results` | POST | Authenticated | Submit exam results |
| `/api/feedback` | GET | Authenticated | Get feedback (filtered by user role) |
| `/api/feedback` | POST | Authenticated | Submit feedback |
| `/api/logs` | GET | Admin | Get system logs |
| `/api/progress` | GET | Authenticated | Get user progress |
| `/api/users` | GET | Admin | Get all users |

## 4. Troubleshooting Common Integration Issues

### CORS Issues
- Ensure your Spring Boot CORS configuration allows requests from your frontend origin
- Check that all necessary headers are allowed

### Authentication Problems
- Verify that your JWT implementation matches the frontend's expectations
- Check token expiration settings
- Ensure proper Authorization header format

### Data Mapping Issues
- Make sure your DTOs match the frontend data structures
- Check date/time format compatibility

### API Endpoint Mismatches
- Ensure your Spring Boot endpoints match exactly what the frontend is calling
- Check HTTP methods (GET, POST, etc.)
- Verify path parameters and query parameters

## 5. Production Deployment Considerations

### Security
- Use HTTPS for all communications
- Store sensitive information in environment variables
- Implement rate limiting for API endpoints
- Consider adding CSRF protection for non-JWT implementations

### Performance
- Implement caching where appropriate
- Consider pagination for large data sets
- Optimize database queries

### Monitoring
- Add logging throughout your application
- Consider implementing metrics collection
- Set up error tracking