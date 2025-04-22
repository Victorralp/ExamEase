package com.examease.controller;

import com.examease.model.Exam;
import com.examease.service.ExamService;
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
@RequestMapping("/exams")
@RequiredArgsConstructor
public class ExamController {
    
    private final ExamService examService;
    
    @GetMapping
    public ResponseEntity<List<Exam>> getAllExams() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.ok(examService.findAll());
        } else {
            return ResponseEntity.ok(examService.findByStatus("active"));
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable Long id) {
        Exam exam = examService.findById(id);
        return ResponseEntity.ok(exam);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Exam> createExam(@Valid @RequestBody Exam exam) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        // Convert username to userId (In a real app, we would look up the user by username)
        // For simplicity, assuming username is the user ID
        Long userId = Long.parseLong(username);
        exam.setCreatedBy(userId);
        
        Exam createdExam = examService.createExam(exam);
        return new ResponseEntity<>(createdExam, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Exam> updateExam(@PathVariable Long id, @Valid @RequestBody Exam examDetails) {
        Exam updatedExam = examService.updateExam(id, examDetails);
        return ResponseEntity.ok(updatedExam);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
        return ResponseEntity.noContent().build();
    }
    
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Exam> updateExamStatus(@PathVariable Long id, @RequestParam String status) {
        Exam updatedExam = examService.updateExamStatus(id, status);
        return ResponseEntity.ok(updatedExam);
    }
    
    @GetMapping("/subject/{subject}")
    public ResponseEntity<List<Exam>> getExamsBySubject(@PathVariable String subject) {
        List<Exam> exams = examService.findBySubject(subject);
        return ResponseEntity.ok(exams);
    }
}