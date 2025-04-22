import { 
  users, type User, type InsertUser,
  exams, type Exam, type InsertExam,
  questions, type Question, type InsertQuestion,
  results, type Result, type InsertResult,
  feedback, type Feedback, type InsertFeedback,
  logs, type Log, type InsertLog,
  progress, type Progress, type InsertProgress
} from "@shared/schema";

import { db } from "./db_mysql";
import { eq } from "drizzle-orm";
import session from "express-session";
import MySQLStore from "express-mysql-session";

// Storage interface
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsers(): Promise<User[]>;
  updateUser(id: number, data: Partial<User>): Promise<User | undefined>;
  
  // Exams
  getExam(id: number): Promise<Exam | undefined>;
  getExams(): Promise<Exam[]>;
  createExam(exam: InsertExam): Promise<Exam>;
  updateExam(id: number, data: Partial<Exam>): Promise<Exam | undefined>;
  deleteExam(id: number): Promise<boolean>;
  
  // Questions
  getQuestion(id: number): Promise<Question | undefined>;
  getQuestions(): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  updateQuestion(id: number, data: Partial<Question>): Promise<Question | undefined>;
  deleteQuestion(id: number): Promise<boolean>;
  
  // Results
  getResult(id: number): Promise<Result | undefined>;
  getUserResults(userId: number): Promise<Result[]>;
  getAllResults(): Promise<Result[]>;
  createResult(result: InsertResult): Promise<Result>;
  
  // Feedback
  getFeedback(id: number): Promise<Feedback | undefined>;
  getUserFeedback(userId: number): Promise<Feedback[]>;
  getAllFeedback(): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  updateFeedback(id: number, data: Partial<Feedback>): Promise<Feedback | undefined>;
  
  // Logs
  getLog(id: number): Promise<Log | undefined>;
  getLogs(): Promise<Log[]>;
  createLog(log: InsertLog): Promise<Log>;
  
  // Progress
  getUserProgress(userId: number): Promise<Progress[]>;
  createProgress(progress: InsertProgress): Promise<Progress>;
  updateProgress(id: number, data: Partial<Progress>): Promise<Progress | undefined>;
  
  // Session store
  sessionStore: session.Store;
}

// MySQL implementation
export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  
  constructor() {
    // Setup MySQL session store
    const MySQLStoreFactory = MySQLStore(session);
    this.sessionStore = new MySQLStoreFactory({
      connectionLimit: 10,
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'examease',
      createDatabaseTable: true
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }
  
  async getUsers(): Promise<User[]> {
    return await db.select().from(users);
  }
  
  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const [user] = await db.update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Exams
  async getExam(id: number): Promise<Exam | undefined> {
    const [exam] = await db.select().from(exams).where(eq(exams.id, id));
    return exam;
  }

  async getExams(): Promise<Exam[]> {
    return await db.select().from(exams);
  }

  async createExam(examData: InsertExam): Promise<Exam> {
    const [exam] = await db.insert(exams).values(examData).returning();
    return exam;
  }
  
  async updateExam(id: number, data: Partial<Exam>): Promise<Exam | undefined> {
    const [exam] = await db.update(exams)
      .set(data)
      .where(eq(exams.id, id))
      .returning();
    return exam;
  }
  
  async deleteExam(id: number): Promise<boolean> {
    const result = await db.delete(exams).where(eq(exams.id, id));
    return true; // MySQL doesn't return a count, so we assume success
  }

  // Questions
  async getQuestion(id: number): Promise<Question | undefined> {
    const [question] = await db.select().from(questions).where(eq(questions.id, id));
    return question;
  }

  async getQuestions(): Promise<Question[]> {
    return await db.select().from(questions);
  }

  async createQuestion(questionData: InsertQuestion): Promise<Question> {
    const [question] = await db.insert(questions).values(questionData).returning();
    return question;
  }
  
  async updateQuestion(id: number, data: Partial<Question>): Promise<Question | undefined> {
    const [question] = await db.update(questions)
      .set(data)
      .where(eq(questions.id, id))
      .returning();
    return question;
  }
  
  async deleteQuestion(id: number): Promise<boolean> {
    const result = await db.delete(questions).where(eq(questions.id, id));
    return true; // MySQL doesn't return a count, so we assume success
  }

  // Results
  async getResult(id: number): Promise<Result | undefined> {
    const [result] = await db.select().from(results).where(eq(results.id, id));
    return result;
  }

  async getUserResults(userId: number): Promise<Result[]> {
    return await db.select().from(results).where(eq(results.userId, userId));
  }
  
  async getAllResults(): Promise<Result[]> {
    return await db.select().from(results);
  }

  async createResult(resultData: InsertResult): Promise<Result> {
    const [result] = await db.insert(results).values(resultData).returning();
    return result;
  }

  // Feedback
  async getFeedback(id: number): Promise<Feedback | undefined> {
    const [feedback] = await db.select().from(feedback).where(eq(feedback.id, id));
    return feedback;
  }

  async getUserFeedback(userId: number): Promise<Feedback[]> {
    return await db.select().from(feedback).where(eq(feedback.userId, userId));
  }
  
  async getAllFeedback(): Promise<Feedback[]> {
    return await db.select().from(feedback);
  }

  async createFeedback(feedbackData: InsertFeedback): Promise<Feedback> {
    const [fbResult] = await db.insert(feedback).values(feedbackData).returning();
    return fbResult;
  }
  
  async updateFeedback(id: number, data: Partial<Feedback>): Promise<Feedback | undefined> {
    const [fbResult] = await db.update(feedback)
      .set(data)
      .where(eq(feedback.id, id))
      .returning();
    return fbResult;
  }

  // Logs
  async getLog(id: number): Promise<Log | undefined> {
    const [log] = await db.select().from(logs).where(eq(logs.id, id));
    return log;
  }

  async getLogs(): Promise<Log[]> {
    return await db.select().from(logs);
  }

  async createLog(logData: InsertLog): Promise<Log> {
    const [log] = await db.insert(logs).values(logData).returning();
    return log;
  }

  // Progress
  async getUserProgress(userId: number): Promise<Progress[]> {
    return await db.select().from(progress).where(eq(progress.userId, userId));
  }

  async createProgress(progressData: InsertProgress): Promise<Progress> {
    const [prog] = await db.insert(progress).values(progressData).returning();
    return prog;
  }
  
  async updateProgress(id: number, data: Partial<Progress>): Promise<Progress | undefined> {
    const [prog] = await db.update(progress)
      .set(data)
      .where(eq(progress.id, id))
      .returning();
    return prog;
  }
}

// Export an instance of the storage implementation
export const storage = new DatabaseStorage();