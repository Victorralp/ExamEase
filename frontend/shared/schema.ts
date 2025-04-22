import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role").notNull().default("STUDENT"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Exams
export const exams = pgTable("exams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  description: text("description"),
  duration: integer("duration").notNull(), // in minutes
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  status: text("status").notNull().default("draft"), // draft, scheduled, active, completed, cancelled
  passingScore: integer("passing_score").notNull().default(60),
  createdBy: integer("created_by").notNull(), // admin user id
  createdAt: timestamp("created_at").defaultNow(),
  questionIds: jsonb("question_ids").notNull().default([]), // array of question ids
});

export const insertExamSchema = createInsertSchema(exams).omit({
  id: true,
  createdAt: true,
});

// Questions
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  questionType: text("question_type").notNull(), // multiple_choice, true_false, short_answer, multiple_select
  subject: text("subject").notNull(),
  topic: text("topic"),
  difficulty: text("difficulty").notNull().default("medium"), // easy, medium, hard
  options: jsonb("options").default([]),
  correctAnswer: jsonb("correct_answer"), // string or array of strings
  explanation: text("explanation"),
  tags: jsonb("tags").default([]),
  createdBy: integer("created_by").notNull(), // admin user id
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
  createdAt: true,
});

// Results
export const results = pgTable("results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  examId: integer("exam_id").notNull(),
  score: integer("score").notNull(),
  timeSpent: integer("time_spent").notNull(), // in seconds
  answers: jsonb("answers").notNull(), // user answers
  status: text("status").notNull().default("completed"), // completed, failed, passed
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertResultSchema = createInsertSchema(results).omit({
  id: true,
  submittedAt: true,
});

// Feedback
export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  examId: integer("exam_id").notNull(),
  rating: integer("rating").notNull(),
  difficultyLevel: text("difficulty_level").notNull(),
  comments: text("comments").notNull(),
  suggestions: text("suggestions"),
  response: text("response"), // admin response
  respondedBy: integer("responded_by"), // admin user id
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
export const logs = pgTable("logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  action: text("action").notNull(),
  entityType: text("entity_type"), // exam, question, user, etc.
  entityId: integer("entity_id"),
  details: jsonb("details"),
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLogSchema = createInsertSchema(logs).omit({
  id: true,
  createdAt: true,
});

// Progress
export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  subject: text("subject").notNull(),
  averageScore: integer("average_score").notNull(),
  examsTaken: integer("exams_taken").notNull(),
  bestScore: integer("best_score"),
  weakAreas: jsonb("weak_areas").default([]),
  strongAreas: jsonb("strong_areas").default([]),
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
