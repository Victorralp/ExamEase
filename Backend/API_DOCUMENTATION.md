# ExamEase API Documentation

This document provides an overview of all available API endpoints for the ExamEase application.

## Base URL

All endpoints are prefixed with `/api`.

## Authentication Endpoints

### Register a new user

```
POST /api/auth/register
```

**Request Body:**
```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "ROLE_STUDENT" // or "ROLE_ADMIN"
}
```

**Success Response:**
```json
{
  "id": 1,
  "username": "user123",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "ROLE_STUDENT",
  "createdAt": "2025-04-21T12:00:00"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Username already exists"
}
```

### Login

```
POST /api/auth/login
```

**Request Body:**
```json
{
  "username": "user123",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "id": 1,
  "username": "user123",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "ROLE_STUDENT"
}
```

## User Endpoints

### Get current user information

```
GET /api/user
```
*Requires authentication*

**Success Response:**
```json
{
  "id": 1,
  "username": "user123",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "ROLE_STUDENT",
  "createdAt": "2025-04-21T12:00:00"
}
```

### Get all users

```
GET /api/users
```
*Requires ADMIN role*

### Get user by ID

```
GET /api/users/{id}
```
*Requires authentication*

### Update user

```
PUT /api/users/{id}
```
*Requires authentication (user can only update their own profile, ADMIN can update any)*

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "newemail@example.com"
}
```

### Delete user

```
DELETE /api/users/{id}
```
*Requires ADMIN role*

## Exam Endpoints

### Create a new exam

```
POST /api/exams
```
*Requires ADMIN role*

**Request Body:**
```json
{
  "title": "Math Final Exam",
  "description": "Final exam for Mathematics course",
  "subject": "Mathematics",
  "duration": 120,
  "totalMarks": 100,
  "passingMarks": 40,
  "startDate": "2025-05-01T09:00:00",
  "endDate": "2025-05-01T11:00:00",
  "instructions": "Answer all questions"
}
```

### Get all exams

```
GET /api/exams
```
*Requires authentication*

### Get exam by ID

```
GET /api/exams/{id}
```
*Requires authentication*

### Update an exam

```
PUT /api/exams/{id}
```
*Requires ADMIN role*

### Delete an exam

```
DELETE /api/exams/{id}
```
*Requires ADMIN role*

### Get exams by subject

```
GET /api/exams/subject/{subject}
```
*Requires authentication*

### Get upcoming exams

```
GET /api/exams/upcoming
```
*Requires authentication*

### Get past exams

```
GET /api/exams/past
```
*Requires authentication*

## Question Endpoints

### Create a new question

```
POST /api/questions
```
*Requires ADMIN role*

**Request Body:**
```json
{
  "text": "What is 2+2?",
  "subject": "Mathematics",
  "type": "MULTIPLE_CHOICE",
  "difficulty": "EASY",
  "options": ["3", "4", "5", "6"],
  "correctAnswer": "4",
  "explanation": "Basic addition",
  "marks": 5
}
```

### Get all questions

```
GET /api/questions
```
*Requires authentication*

### Get question by ID

```
GET /api/questions/{id}
```
*Requires authentication*

### Update a question

```
PUT /api/questions/{id}
```
*Requires ADMIN role*

### Delete a question

```
DELETE /api/questions/{id}
```
*Requires ADMIN role*

### Get questions by subject

```
GET /api/questions/subject/{subject}
```
*Requires authentication*

### Get questions by type

```
GET /api/questions/type/{type}
```
*Requires authentication*

### Get questions by difficulty

```
GET /api/questions/difficulty/{difficulty}
```
*Requires authentication*

### Get questions by IDs

```
POST /api/questions/by-ids
```
*Requires authentication*

**Request Body:**
```json
[1, 2, 3, 4, 5]
```

## Result Endpoints

### Submit an exam result

```
POST /api/results
```
*Requires authentication*

**Request Body:**
```json
{
  "examId": 1,
  "userId": 2,
  "score": 85,
  "answers": [
    {
      "questionId": 1,
      "selectedOption": "4",
      "isCorrect": true
    },
    {
      "questionId": 2,
      "selectedOption": "Paris",
      "isCorrect": true
    }
  ],
  "completionTime": 110
}
```

### Get all results

```
GET /api/results
```
*Requires ADMIN role*

### Get result by ID

```
GET /api/results/{id}
```
*Requires authentication (user can only see their own results, ADMIN can see any)*

### Get results by user ID

```
GET /api/results/user/{userId}
```
*Requires authentication (user can only see their own results, ADMIN can see any)*

### Get results by exam ID

```
GET /api/results/exam/{examId}
```
*Requires ADMIN role*

### Get results by user ID and exam ID

```
GET /api/results/user/{userId}/exam/{examId}
```
*Requires authentication (user can only see their own results, ADMIN can see any)*

### Get average score by exam ID

```
GET /api/results/exam/{examId}/average
```
*Requires ADMIN role*

### Get passing count by exam ID

```
GET /api/results/exam/{examId}/passing-count?passingMarks={marks}
```
*Requires ADMIN role*

## Feedback Endpoints

### Submit feedback

```
POST /api/feedback
```
*Requires authentication*

**Request Body:**
```json
{
  "userId": 1,
  "examId": 2,
  "rating": 4,
  "comments": "The exam was well structured",
  "category": "EXAM_CONTENT"
}
```

### Get all feedback

```
GET /api/feedback
```
*Requires ADMIN role*

### Get feedback by ID

```
GET /api/feedback/{id}
```
*Requires ADMIN role*

### Get feedback by user ID

```
GET /api/feedback/user/{userId}
```
*Requires authentication (user can only see their own feedback, ADMIN can see any)*

### Get feedback by exam ID

```
GET /api/feedback/exam/{examId}
```
*Requires ADMIN role*

## Security

- All endpoints (except /auth/register and /auth/login) require authentication
- Authentication is done via JWT tokens
- Include the token in the Authorization header: `Bearer {token}`
- ADMIN role is required for administrative operations
- Users can only access or modify their own data, ADMIN can access or modify any data