package com.examease.controller;

import com.examease.model.Question;
import com.examease.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {
    
    private final QuestionService questionService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.findAll();
        return ResponseEntity.ok(questions);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        Question question = questionService.findById(id);
        return ResponseEntity.ok(question);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Question> createQuestion(@Valid @RequestBody Question question) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        // Convert username to userId (In a real app, we would look up the user by username)
        // For simplicity, assuming username is the user ID
        Long userId = Long.parseLong(username);
        question.setCreatedBy(userId);
        
        Question createdQuestion = questionService.createQuestion(question);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @Valid @RequestBody Question questionDetails) {
        Question updatedQuestion = questionService.updateQuestion(id, questionDetails);
        return ResponseEntity.ok(updatedQuestion);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/subject/{subject}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<List<Question>> getQuestionsBySubject(@PathVariable String subject) {
        List<Question> questions = questionService.findBySubject(subject);
        return ResponseEntity.ok(questions);
    }
    
    @GetMapping("/difficulty/{difficulty}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<List<Question>> getQuestionsByDifficulty(@PathVariable String difficulty) {
        List<Question> questions = questionService.findByDifficulty(difficulty);
        return ResponseEntity.ok(questions);
    }
    
    @GetMapping("/type/{questionType}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<List<Question>> getQuestionsByType(@PathVariable String questionType) {
        List<Question> questions = questionService.findByQuestionType(questionType);
        return ResponseEntity.ok(questions);
    }
    
    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<List<Question>> searchQuestions(
            @RequestParam(required = false) String subject,
            @RequestParam(required = false) String difficulty) {
        
        if (subject != null && difficulty != null) {
            return ResponseEntity.ok(questionService.findBySubjectAndDifficulty(subject, difficulty));
        } else if (subject != null) {
            return ResponseEntity.ok(questionService.findBySubject(subject));
        } else if (difficulty != null) {
            return ResponseEntity.ok(questionService.findByDifficulty(difficulty));
        } else {
            return ResponseEntity.ok(questionService.findAll());
        }
    }
}