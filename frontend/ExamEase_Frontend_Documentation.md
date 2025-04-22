# ExamEase Frontend Documentation

## 1. Project Overview

ExamEase is a comprehensive exam management system built with a React.js frontend that integrates with a backend (originally built and designed to connect with your Spring Boot backend). The application provides role-based access for students and administrators with features like exam creation, test-taking, results tracking, feedback collection, and progress visualization.

## 2. Frontend Architecture

### Technology Stack

- **React.js**: Core frontend library
- **TypeScript**: Type safety and code quality
- **TailwindCSS**: Utility-first styling framework
- **Shadcn UI**: Component library built on top of RadixUI
- **Wouter**: For client-side routing
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation
- **TanStack React Query**: Data fetching, caching, and state management
- **Lucide React**: Icon library
- **Recharts**: Data visualization

### Directory Structure

```
client/
├── src/
│   ├── components/
│   │   ├── layouts/ - Page layouts for different user roles
│   │   ├── shared/ - Shared components between layouts
│   │   └── ui/ - UI components from Shadcn
│   ├── hooks/ - Custom React hooks
│   │   ├── use-auth.tsx - Authentication hook
│   │   └── use-toast.tsx - Toast notification hook
│   ├── lib/ - Utility functions
│   │   ├── protected-route.tsx - Authentication route protection
│   │   └── queryClient.ts - React Query configuration
│   ├── pages/ - Application pages
│   │   ├── admin/ - Admin-specific pages
│   │   ├── student/ - Student-specific pages
│   │   ├── auth-page.tsx - Authentication page
│   │   └── not-found.tsx - 404 page
│   ├── App.tsx - Main application component with routing
│   └── main.tsx - Application entry point
```

## 3. Authentication System

The frontend uses a token-based authentication system that can be integrated with your Spring Boot backend. The authentication flow is managed by the `use-auth.tsx` hook and protected routes are implemented with the `protected-route.tsx` component.

### Authentication Hook

The `useAuth` hook provides:

- Current user state
- Login mutation
- Registration mutation
- Logout mutation
- Loading state
- Error state

### Protected Routes

The `ProtectedRoute` component ensures that only authenticated users can access specific routes. It also verifies the user role, redirecting to the appropriate dashboard based on role.

## 4. API Integration

### Current API Endpoints

The frontend is designed to work with the following API endpoints:

#### Authentication

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user

#### Exams

- `GET /api/exams` - Get all exams
- `POST /api/exams` - Create a new exam
- `GET /api/exams/:id` - Get exam by ID

#### Questions

- `GET /api/questions` - Get all questions
- `POST /api/questions` - Create a new question

#### Results

- `GET /api/results` - Get results (filtered by user role)
- `POST /api/results` - Submit exam results

#### Feedback

- `GET /api/feedback` - Get feedback (filtered by user role)
- `POST /api/feedback` - Submit feedback

#### Logs

- `GET /api/logs` - Get system logs (admin only)

#### Progress

- `GET /api/progress` - Get user progress

#### Users

- `GET /api/users` - Get all users (admin only)

### Integration with Spring Boot

To connect this frontend with your Spring Boot backend:

1. **Update API Endpoints**: Modify the `queryClient.ts` file to match your Spring Boot endpoint structure
2. **Authentication**: Ensure your Spring Boot security configuration supports JWT or session-based authentication
3. **CORS Configuration**: Configure your Spring Boot application to allow requests from the frontend domain
4. **Data Structure**: Ensure your Spring Boot DTOs match the frontend data structures

## 5. User Interfaces

### 5.1. Authentication Page

The authentication page (`auth-page.tsx`) features:

- Login form with username/password
- Registration form for new users
- Form validation using Zod
- Responsive design with two-column layout on larger screens

### 5.2. Student Interface

#### Student Dashboard

- Overview of upcoming exams
- Recent results
- Progress statistics
- Quick links to other sections

#### Upcoming Exams

- List of scheduled exams
- Exam details (subject, date, duration)
- Filter and search functionality

#### Results

- Exam results history
- Score visualization
- Correct/incorrect answer breakdown
- Performance metrics

#### Progress

- Subject-wise performance visualization
- Trend analysis over time
- Strength and weakness identification
- Progress tracking

#### Feedback

- Feedback submission form
- Rating system
- Comments and suggestions
- Previous feedback history

#### Profile

- Personal information management
- Password management
- Notification preferences
- Account settings

### 5.3. Admin Interface

#### Admin Dashboard

- System overview
- Recent activity
- User statistics
- Quick links to management sections

#### Exams Management

- Exam creation and editing
- Scheduling options
- Student assignment
- Exam status management

#### Questions Bank

- Question creation (multiple types)
- Question tagging and categorization
- Search and filter functionality
- Question preview

#### Students Management

- Student account management
- Bulk actions
- Search and filter
- Performance overview

#### Results Management

- Results overview and analytics
- Export functionality
- Detailed reports
- Performance metrics

#### Feedback Management

- View and respond to feedback
- Analytics on common feedback points
- Rating trends

#### System Logs

- Activity tracking
- Audit trail
- Security monitoring
- Error logging

#### Profile

- Admin information management
- Security settings
- System preferences

## 6. Components & UI Library

The frontend uses Shadcn UI components with TailwindCSS for styling. Key components include:

- **Layouts**: `AdminLayout` and `StudentLayout` provide consistent structure
- **Forms**: Form components with validation using React Hook Form and Zod
- **Tables**: Data tables for displaying structured information
- **Cards**: Content containers with consistent styling
- **Charts**: Data visualization using Recharts
- **Dialogs**: Modal dialogs for forms and confirmations
- **Notifications**: Toast notifications for user feedback

## 7. Data Models

The frontend expects the following data structures:

### User

```typescript
type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string; // "ADMIN" or "STUDENT"
  createdAt: string; // ISO date string
};
```

### Exam

```typescript
type Exam = {
  id: number;
  name: string;
  subject: string;
  description: string;
  duration: number; // in minutes
  startDate: string; // ISO date string
  endDate?: string; // ISO date string
  status: string; // "draft", "scheduled", "active", "completed", "cancelled"
  passingScore: number;
  createdBy: number; // user ID
  createdAt: string; // ISO date string
  questionIds: number[]; // array of question IDs
};
```

### Question

```typescript
type Question = {
  id: number;
  question: string;
  questionType: string; // "multiple_choice", "true_false", "short_answer", "multiple_select"
  subject: string;
  topic?: string;
  difficulty: string; // "easy", "medium", "hard"
  options?: string[]; // array of options for multiple choice
  correctAnswer: string | string[]; // string or array depending on question type
  explanation?: string;
  tags?: string[];
  createdBy: number; // user ID
  createdAt: string; // ISO date string
};
```

### Result

```typescript
type Result = {
  id: number;
  userId: number;
  examId: number;
  score: number;
  timeSpent: number; // in seconds
  answers: any; // user answers object
  status: string; // "completed", "failed", "passed"
  submittedAt: string; // ISO date string
};
```

### Feedback

```typescript
type Feedback = {
  id: number;
  userId: number;
  examId: number;
  rating: number;
  difficultyLevel: string;
  comments: string;
  suggestions?: string;
  response?: string; // admin response
  respondedBy?: number; // admin user ID
  respondedAt?: string; // ISO date string
  createdAt: string; // ISO date string
};
```

## 8. Spring Boot Integration Guide

To integrate this frontend with a Spring Boot backend:

1. **Create REST Controllers**:

```java
@RestController
@RequestMapping("/api")
public class AuthController {
    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegisterRequest request) {
        // Implementation
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginRequest request) {
        // Implementation
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        // Implementation
    }

    @GetMapping("/user")
    public ResponseEntity<UserDTO> getCurrentUser() {
        // Implementation
    }
}
```

2. **Set Up Spring Security**:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/login", "/api/register").permitAll()
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
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

3. **Proxy Setup**:

Update the vite.config.ts to proxy requests to your Spring Boot backend:

```typescript
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // ...other configuration
});
```

4. **Entity Mapping**:

Ensure your Spring Boot entity models match the TypeScript interfaces used in the frontend:

```java
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

    // Getters, setters, constructors...
}
```

5. **JWT Authentication for Spring Boot**:

```java
@Component
public class JwtTokenProvider {
    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration}")
    private int jwtExpirationInMs;

    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(Long.toString(userPrincipal.getId()))
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (Exception ex) {
            // Log exception
            return false;
        }
    }
}
```

## 9. Additional Features and Future Enhancements

### Implemented Features

- Role-based authentication and authorization
- Exam creation and management
- Question bank with multiple question types
- Results tracking and analytics
- Student progress visualization
- Feedback system
- System logging and monitoring
- Profile management
- Theme toggling (light/dark mode)
- Responsive design for all device sizes

### Potential Enhancements

- Real-time notifications using WebSockets
- Offline exam taking capability
- PDF generation for exam results and certificates
- Enhanced analytics dashboard
- Import/export functionality for exams and questions
- Integration with calendar systems
- Email notifications
- Advanced question types (e.g., coding questions)
- AI-powered exam generation

## 10. Downloading the Project

To download the project:

1. Use the "Download as ZIP" option from the three-dot menu in the top-right corner of the Replit interface.
2. Extract the ZIP to your local development environment.
3. Follow the integration steps above to connect with your Spring Boot backend.

## 11. Conclusion

The ExamEase frontend provides a comprehensive solution for exam management with a modern, responsive UI. By following this documentation, you can successfully integrate it with your Spring Boot backend to create a full-featured exam management system.
