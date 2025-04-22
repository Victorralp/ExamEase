package com.examease.controller;

import com.examease.model.Result;
import com.examease.service.ResultService;
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
@RequestMapping("/results")
@RequiredArgsConstructor
public class ResultController {
    
    private final ResultService resultService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Result>> getAllResults() {
        List<Result> results = resultService.findAll();
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @resultSecurity.isOwner(#id)")
    public ResponseEntity<Result> getResultById(@PathVariable Long id) {
        Result result = resultService.findById(id);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.isCurrentUser(#userId)")
    public ResponseEntity<List<Result>> getUserResults(@PathVariable Long userId) {
        List<Result> results = resultService.findByUserId(userId);
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/exam/{examId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Result>> getExamResults(@PathVariable Long examId) {
        List<Result> results = resultService.findByExamId(examId);
        return ResponseEntity.ok(results);
    }
    
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<Result> submitResult(@Valid @RequestBody Result result) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        // Convert username to userId (In a real app, we would look up the user by username)
        // For simplicity, assuming username is the user ID
        Long userId = Long.parseLong(username);
        result.setUserId(userId);
        
        Result submittedResult = resultService.createResult(result);
        return new ResponseEntity<>(submittedResult, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Result> updateResult(@PathVariable Long id, @Valid @RequestBody Result resultDetails) {
        Result updatedResult = resultService.updateResult(id, resultDetails);
        return ResponseEntity.ok(updatedResult);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteResult(@PathVariable Long id) {
        resultService.deleteResult(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Result>> getResultsByStatus(@PathVariable String status) {
        List<Result> results = resultService.findByStatus(status);
        return ResponseEntity.ok(results);
    }
}