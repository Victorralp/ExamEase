# MySQL Setup Instructions for ExamEase

This document provides the SQL scripts and configuration needed to set up the MySQL database for the ExamEase application.

## 1. Database Connection Configuration

Replace the PostgreSQL configuration in `server/db.ts` with this MySQL configuration:

```typescript
// server/db.ts
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from "@shared/schema";

if (!process.env.MYSQL_DATABASE_URL) {
  throw new Error(
    "MYSQL_DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// For a connection pool:
export const pool = mysql.createPool(process.env.MYSQL_DATABASE_URL);
export const db = drizzle(pool, { schema });
```

## 2. Schema Modification

Update the `shared/schema.ts` file to use MySQL-specific types:

```typescript
// Change the import at the top
import { mysqlTable, int, varchar, text, boolean, timestamp, json } from "drizzle-orm/mysql-core";

// Then replace all instances of pgTable with mysqlTable
// For example:
export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("STUDENT"),
  createdAt: timestamp("created_at").defaultNow(),
});

// For JSON fields:
export const exams = mysqlTable("exams", {
  // ... other fields
  questionIds: json("question_ids").notNull().default([]),
});
```

## 3. Update drizzle.config.ts

Update the Drizzle configuration file:

```typescript
// drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
  schema: "./shared/schema.ts",
  out: "./drizzle",
  driver: 'mysql2',
  dbCredentials: {
    connectionString: process.env.MYSQL_DATABASE_URL || '',
  },
} satisfies Config;
```

## 4. Package Installation

You'll need to install MySQL-specific packages:

```bash
npm install mysql2 drizzle-orm
```

## 5. Create the Database Schema

Run these MySQL commands to create your database (or use a database management tool):

```sql
-- Create database
CREATE DATABASE examease;
USE examease;

-- Create tables
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'STUDENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT,
    duration INT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    passing_score INT NOT NULL DEFAULT 60,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    question_ids JSON NOT NULL DEFAULT ('[]')
);

CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    topic VARCHAR(255),
    difficulty VARCHAR(50) NOT NULL DEFAULT 'medium',
    options JSON DEFAULT NULL,
    correct_answer JSON,
    explanation TEXT,
    tags JSON DEFAULT ('[]'),
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    exam_id INT NOT NULL,
    score INT NOT NULL,
    time_spent INT NOT NULL,
    answers JSON NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'completed',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    exam_id INT NOT NULL,
    rating INT NOT NULL,
    difficulty_level VARCHAR(50) NOT NULL,
    comments TEXT NOT NULL,
    suggestions TEXT,
    response TEXT,
    responded_by INT,
    responded_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(255),
    entity_id INT,
    details JSON,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    average_score INT NOT NULL,
    exams_taken INT NOT NULL,
    best_score INT,
    weak_areas JSON DEFAULT ('[]'),
    strong_areas JSON DEFAULT ('[]'),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sessions table for authentication
CREATE TABLE sessions (
    sid VARCHAR(255) NOT NULL PRIMARY KEY,
    sess JSON NOT NULL,
    expired TIMESTAMP NOT NULL
);

-- Add indexes for better performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_exams_subject ON exams(subject);
CREATE INDEX idx_exams_status ON exams(status);
CREATE INDEX idx_exams_created_by ON exams(created_by);
CREATE INDEX idx_questions_subject ON questions(subject);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_results_user_id ON results(user_id);
CREATE INDEX idx_results_exam_id ON results(exam_id);
CREATE INDEX idx_feedback_user_id ON feedback(user_id);
CREATE INDEX idx_feedback_exam_id ON feedback(exam_id);
CREATE INDEX idx_progress_user_id ON progress(user_id);
```

## 6. Environment Variables

Create a `.env` file with your MySQL connection details:

```
MYSQL_DATABASE_URL=mysql://username:password@localhost:3306/examease
SESSION_SECRET=your_secret_key_here
```

## 7. Update Storage Implementation

You'll need to modify the `server/storage.ts` file to work with the new database structure. The DatabaseStorage class should be updated to use the db object with MySQL queries.

## Sample User for Testing

You can create a test user with this SQL:

```sql
-- Create a test admin user (password: admin123)
INSERT INTO users (username, password, email, first_name, last_name, role)
VALUES ('admin', 'c9a0f0242bb4d845d6eb7be39dde07fc6b4ae6cc3a9f3a9487b810694125fd2d.8ca4c79cca6649c8326b5a5565c7aafd', 'admin@examease.com', 'Admin', 'User', 'ADMIN');

-- Create a test student user (password: student123)
INSERT INTO users (username, password, email, first_name, last_name, role)
VALUES ('student', 'c2ee9a3a6c7d9b8b205a7f0337a4d4cd2eee14a42f90107ce6a945d5e6f1697d.1aafe4e56b1cd18a20ed8d8a94f832ab', 'student@examease.com', 'Student', 'User', 'STUDENT');
```

These passwords use the same hashing algorithm implemented in `server/auth.ts`.

## Downloading the Project

To download the project:

1. Use the "Download as ZIP" option from the three-dot menu in the top-right corner of the Replit interface.
2. Alternatively, you can initialize a Git repository in the project and push it to your own GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo-url
git push -u origin main
```

Then you can clone it to your local machine.