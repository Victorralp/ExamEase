package com.examease.controller;

import com.examease.dto.QuestionDTO;
import com.examease.entity.Log;
import com.examease.service.LogService;
import com.examease.service.QuestionService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class QuestionController {

    private final QuestionService questionService;
    private final LogService logService;

    @Autowired
    public QuestionController(QuestionService questionService, LogService logService) {
        this.questionService = questionService;
        this.logService = logService;
    }

    @PostMapping("/questions")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<QuestionDTO> createQuestion(@Valid @RequestBody QuestionDTO questionDTO, HttpServletRequest request) {
        QuestionDTO createdQuestion = questionService.createQuestion(questionDTO);
        
        // Log question creation
        Log log = new Log();
        log.setUserId(questionDTO.getCreatedBy());
        log.setAction("CREATE_QUESTION");
        log.setEntityType("QUESTION");
        log.setEntityId(createdQuestion.getId());
        log.setIpAddress(request.getRemoteAddr());
        logService.createLog(log);
        
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }

    @PutMapping("/questions/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<QuestionDTO> updateQuestion(@PathVariable Long id, @Valid @RequestBody QuestionDTO questionDTO, HttpServletRequest request) {
        QuestionDTO updatedQuestion = questionService.updateQuestion(id, questionDTO);
        
        // Log question update
        Log log = new Log();
        log.setUserId(questionDTO.getCreatedBy());
        log.setAction("UPDATE_QUESTION");
        log.setEntityType("QUESTION");
        log.setEntityId(id);
        log.setIpAddress(request.getRemoteAddr());
        logService.createLog(log);
        
        return ResponseEntity.ok(updatedQuestion);
    }

    @GetMapping("/questions")
    public ResponseEntity<List<QuestionDTO>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<QuestionDTO> getQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.getQuestionById(id));
    }

    @DeleteMapping("/questions/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id, HttpServletRequest request) {
        questionService.deleteQuestion(id);
        
        // Log question deletion
        Log log = new Log();
        log.setAction("DELETE_QUESTION");
        log.setEntityType("QUESTION");
        log.setEntityId(id);
        log.setIpAddress(request.getRemoteAddr());
        logService.createLog(log);
        
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/questions/subject/{subject}")
    public ResponseEntity<List<QuestionDTO>> getQuestionsBySubject(@PathVariable String subject) {
        return ResponseEntity.ok(questionService.getQuestionsBySubject(subject));
    }

    @GetMapping("/questions/type/{type}")
    public ResponseEntity<List<QuestionDTO>> getQuestionsByType(@PathVariable String type) {
        return ResponseEntity.ok(questionService.getQuestionsByType(type));
    }

    @GetMapping("/questions/difficulty/{difficulty}")
    public ResponseEntity<List<QuestionDTO>> getQuestionsByDifficulty(@PathVariable String difficulty) {
        return ResponseEntity.ok(questionService.getQuestionsByDifficulty(difficulty));
    }

    @GetMapping("/questions/created-by/{userId}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.hasUserId(authentication, #userId)")
    public ResponseEntity<List<QuestionDTO>> getQuestionsByCreatedBy(@PathVariable Long userId) {
        return ResponseEntity.ok(questionService.getQuestionsByCreatedBy(userId));
    }

    @PostMapping("/questions/by-ids")
    public ResponseEntity<List<QuestionDTO>> getQuestionsByIds(@RequestBody List<Long> ids) {
        return ResponseEntity.ok(questionService.getQuestionsByIds(ids));
    }
}
