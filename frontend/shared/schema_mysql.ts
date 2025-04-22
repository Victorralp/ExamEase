import { mysqlTable, int, varchar, text, boolean, timestamp, json } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users
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

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Exams
export const exams = mysqlTable("exams", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  description: text("description"),
  duration: int("duration").notNull(), // in minutes
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  status: varchar("status", { length: 50 }).notNull().default("draft"), // draft, scheduled, active, completed, cancelled
  passingScore: int("passing_score").notNull().default(60),
  createdBy: int("created_by").notNull(), // admin user id
  createdAt: timestamp("created_at").defaultNow(),
  questionIds: json("question_ids").notNull().default([]), // array of question ids
});

export const insertExamSchema = createInsertSchema(exams).omit({
  id: true,
  createdAt: true,
});

// Questions
export const questions = mysqlTable("questions", {
  id: int("id").primaryKey().autoincrement(),
  question: text("question").notNull(),
  questionType: varchar("question_type", { length: 50 }).notNull(), // multiple_choice, true_false, short_answer, multiple_select
  subject: varchar("subject", { length: 255 }).notNull(),
  topic: varchar("topic", { length: 255 }),
  difficulty: varchar("difficulty", { length: 50 }).notNull().default("medium"), // easy, medium, hard
  options: json("options").default([]),
  correctAnswer: json("correct_answer"), // string or array of strings
  explanation: text("explanation"),
  tags: json("tags").default([]),
  createdBy: int("created_by").notNull(), // admin user id
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
  createdAt: true,
});

// Results
export const results = mysqlTable("results", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(),
  examId: int("exam_id").notNull(),
  score: int("score").notNull(),
  timeSpent: int("time_spent").notNull(), // in seconds
  answers: json("answers").notNull(), // user answers
  status: varchar("status", { length: 50 }).notNull().default("completed"), // completed, failed, passed
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertResultSchema = createInsertSchema(results).omit({
  id: true,
  submittedAt: true,
});

// Feedback
export const feedback = mysqlTable("feedback", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(),
  examId: int("exam_id").notNull(),
  rating: int("rating").notNull(),
  difficultyLevel: varchar("difficulty_level", { length: 50 }).notNull(),
  comments: text("comments").notNull(),
  suggestions: text("suggestions"),
  response: text("response"), // admin response
  respondedBy: int("responded_by"), // admin user id
  respondedAt: timestamp("responded_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  response: true,
  respondedBy: true,
  respondedAt: true,
  createdAt: true,
});

// Logs
export const logs = mysqlTable("logs", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id"),
  action: varchar("action", { length: 255 }).notNull(),
  entityType: varchar("entity_type", { length: 255 }), // exam, question, user, etc.
  entityId: int("entity_id"),
  details: json("details"),
  ipAddress: varchar("ip_address", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLogSchema = createInsertSchema(logs).omit({
  id: true,
  createdAt: true,
});

// Progress
export const progress = mysqlTable("progress", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  averageScore: int("average_score").notNull(),
  examsTaken: int("exams_taken").notNull(),
  bestScore: int("best_score"),
  weakAreas: json("weak_areas").default([]),
  strongAreas: json("strong_areas").default([]),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const insertProgressSchema = createInsertSchema(progress).omit({
  id: true,
  lastUpdated: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Exam = typeof exams.$inferSelect;
export type InsertExam = z.infer<typeof insertExamSchema>;

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;

export type Result = typeof results.$inferSelect;
export type InsertResult = z.infer<typeof insertResultSchema>;

export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;

export type Log = typeof logs.$inferSelect;
export type InsertLog = z.infer<typeof insertLogSchema>;

export type Progress = typeof progress.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;