import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // API endpoints
  // Exams
  app.get("/api/exams", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const exams = await storage.getExams();
      res.json(exams);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve exams" });
    }
  });

  app.post("/api/exams", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "ADMIN") return res.sendStatus(403);
    try {
      const exam = await storage.createExam(req.body);
      res.status(201).json(exam);
    } catch (error) {
      res.status(500).json({ error: "Failed to create exam" });
    }
  });

  app.get("/api/exams/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const exam = await storage.getExam(parseInt(req.params.id));
      if (!exam) return res.status(404).json({ error: "Exam not found" });
      res.json(exam);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve exam" });
    }
  });

  // Questions
  app.get("/api/questions", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "ADMIN") return res.sendStatus(403);
    try {
      const questions = await storage.getQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve questions" });
    }
  });

  app.post("/api/questions", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "ADMIN") return res.sendStatus(403);
    try {
      const question = await storage.createQuestion(req.body);
      res.status(201).json(question);
    } catch (error) {
      res.status(500).json({ error: "Failed to create question" });
    }
  });

  // Results
  app.get("/api/results", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      let results;
      if (req.user.role === "ADMIN") {
        results = await storage.getAllResults();
      } else {
        results = await storage.getUserResults(req.user.id);
      }
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve results" });
    }
  });

  app.post("/api/results", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const result = await storage.createResult({
        ...req.body,
        userId: req.user.id
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to record result" });
    }
  });

  // Feedback
  app.get("/api/feedback", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      let feedback;
      if (req.user.role === "ADMIN") {
        feedback = await storage.getAllFeedback();
      } else {
        feedback = await storage.getUserFeedback(req.user.id);
      }
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve feedback" });
    }
  });

  app.post("/api/feedback", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    try {
      const feedback = await storage.createFeedback({
        ...req.body,
        userId: req.user.id
      });
      res.status(201).json(feedback);
    } catch (error) {
      res.status(500).json({ error: "Failed to submit feedback" });
    }
  });

  // Logs
  app.get("/api/logs", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "ADMIN") return res.sendStatus(403);
    try {
      const logs = await storage.getLogs();
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve logs" });
    }
  });

  // Progress
  app.get("/api/progress", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const userId = req.query.userId || req.user.id;
      if (req.user.role !== "ADMIN" && userId !== req.user.id) {
        return res.sendStatus(403);
      }
      
      const progress = await storage.getUserProgress(parseInt(userId as string));
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve progress" });
    }
  });

  // Users (for admin only)
  app.get("/api/users", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "ADMIN") return res.sendStatus(403);
    try {
      const users = await storage.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve users" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
