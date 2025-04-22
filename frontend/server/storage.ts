import { 
  users, type User, type InsertUser,
  exams, type Exam, type InsertExam,
  questions, type Question, type InsertQuestion,
  results, type Result, type InsertResult,
  feedback, type Feedback, type InsertFeedback,
  logs, type Log, type InsertLog,
  progress, type Progress, type InsertProgress
} from "@shared/schema";

import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

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

// In-memory implementation
export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private examsMap: Map<number, Exam>;
  private questionsMap: Map<number, Question>;
  private resultsMap: Map<number, Result>;
  private feedbackMap: Map<number, Feedback>;
  private logsMap: Map<number, Log>;
  private progressMap: Map<number, Progress>;
  
  sessionStore: session.Store;
  
  private userCurrentId: number;
  private examCurrentId: number;
  private questionCurrentId: number;
  private resultCurrentId: number;
  private feedbackCurrentId: number;
  private logCurrentId: number;
  private progressCurrentId: number;

  constructor() {
    this.usersMap = new Map();
    this.examsMap = new Map();
    this.questionsMap = new Map();
    this.resultsMap = new Map();
    this.feedbackMap = new Map();
    this.logsMap = new Map();
    this.progressMap = new Map();
    
    this.userCurrentId = 1;
    this.examCurrentId = 1;
    this.questionCurrentId = 1;
    this.resultCurrentId = 1;
    this.feedbackCurrentId = 1;
    this.logCurrentId = 1;
    this.progressCurrentId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired sessions daily
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.usersMap.set(id, user);
    return user;
  }
  
  async getUsers(): Promise<User[]> {
    return Array.from(this.usersMap.values());
  }
  
  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...data };
    this.usersMap.set(id, updatedUser);
    return updatedUser;
  }

  // Exams
  async getExam(id: number): Promise<Exam | undefined> {
    return this.examsMap.get(id);
  }

  async getExams(): Promise<Exam[]> {
    return Array.from(this.examsMap.values());
  }

  async createExam(exam: InsertExam): Promise<Exam> {
    const id = this.examCurrentId++;
    const newExam: Exam = { ...exam, id };
    this.examsMap.set(id, newExam);
    return newExam;
  }
  
  async updateExam(id: number, data: Partial<Exam>): Promise<Exam | undefined> {
    const exam = await this.getExam(id);
    if (!exam) return undefined;
    
    const updatedExam = { ...exam, ...data };
    this.examsMap.set(id, updatedExam);
    return updatedExam;
  }
  
  async deleteExam(id: number): Promise<boolean> {
    return this.examsMap.delete(id);
  }

  // Questions
  async getQuestion(id: number): Promise<Question | undefined> {
    return this.questionsMap.get(id);
  }

  async getQuestions(): Promise<Question[]> {
    return Array.from(this.questionsMap.values());
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const id = this.questionCurrentId++;
    const newQuestion: Question = { ...question, id };
    this.questionsMap.set(id, newQuestion);
    return newQuestion;
  }
  
  async updateQuestion(id: number, data: Partial<Question>): Promise<Question | undefined> {
    const question = await this.getQuestion(id);
    if (!question) return undefined;
    
    const updatedQuestion = { ...question, ...data };
    this.questionsMap.set(id, updatedQuestion);
    return updatedQuestion;
  }
  
  async deleteQuestion(id: number): Promise<boolean> {
    return this.questionsMap.delete(id);
  }

  // Results
  async getResult(id: number): Promise<Result | undefined> {
    return this.resultsMap.get(id);
  }

  async getUserResults(userId: number): Promise<Result[]> {
    return Array.from(this.resultsMap.values()).filter(
      (result) => result.userId === userId,
    );
  }
  
  async getAllResults(): Promise<Result[]> {
    return Array.from(this.resultsMap.values());
  }

  async createResult(result: InsertResult): Promise<Result> {
    const id = this.resultCurrentId++;
    const newResult: Result = { ...result, id };
    this.resultsMap.set(id, newResult);
    return newResult;
  }

  // Feedback
  async getFeedback(id: number): Promise<Feedback | undefined> {
    return this.feedbackMap.get(id);
  }

  async getUserFeedback(userId: number): Promise<Feedback[]> {
    return Array.from(this.feedbackMap.values()).filter(
      (feedback) => feedback.userId === userId,
    );
  }
  
  async getAllFeedback(): Promise<Feedback[]> {
    return Array.from(this.feedbackMap.values());
  }

  async createFeedback(feedbackData: InsertFeedback): Promise<Feedback> {
    const id = this.feedbackCurrentId++;
    const newFeedback: Feedback = { ...feedbackData, id };
    this.feedbackMap.set(id, newFeedback);
    return newFeedback;
  }
  
  async updateFeedback(id: number, data: Partial<Feedback>): Promise<Feedback | undefined> {
    const feedback = await this.getFeedback(id);
    if (!feedback) return undefined;
    
    const updatedFeedback = { ...feedback, ...data };
    this.feedbackMap.set(id, updatedFeedback);
    return updatedFeedback;
  }

  // Logs
  async getLog(id: number): Promise<Log | undefined> {
    return this.logsMap.get(id);
  }

  async getLogs(): Promise<Log[]> {
    return Array.from(this.logsMap.values());
  }

  async createLog(log: InsertLog): Promise<Log> {
    const id = this.logCurrentId++;
    const newLog: Log = { ...log, id };
    this.logsMap.set(id, newLog);
    return newLog;
  }

  // Progress
  async getUserProgress(userId: number): Promise<Progress[]> {
    return Array.from(this.progressMap.values()).filter(
      (progress) => progress.userId === userId,
    );
  }

  async createProgress(progressData: InsertProgress): Promise<Progress> {
    const id = this.progressCurrentId++;
    const newProgress: Progress = { ...progressData, id };
    this.progressMap.set(id, newProgress);
    return newProgress;
  }
  
  async updateProgress(id: number, data: Partial<Progress>): Promise<Progress | undefined> {
    const progress = await this.getProgress(id);
    if (!progress) return undefined;
    
    const updatedProgress = { ...progress, ...data };
    this.progressMap.set(id, updatedProgress);
    return updatedProgress;
  }

  private async getProgress(id: number): Promise<Progress | undefined> {
    return this.progressMap.get(id);
  }
}

export const storage = new MemStorage();
