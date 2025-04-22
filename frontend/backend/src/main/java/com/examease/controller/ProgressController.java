package com.examease.controller;

import com.examease.model.Progress;
import com.examease.service.ProgressService;
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
@RequestMapping("/progress")
@RequiredArgsConstructor
public class ProgressController {
    
    private final ProgressService progressService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Progress>> getAllProgress() {
        List<Progress> progressList = progressService.findAll();
        return ResponseEntity.ok(progressList);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @progressSecurity.isOwner(#id)")
    public ResponseEntity<Progress> getProgressById(@PathVariable Long id) {
        Progress progress = progressService.findById(id);
        return ResponseEntity.ok(progress);
    }
    
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.isCurrentUser(#userId)")
    public ResponseEntity<List<Progress>> getUserProgress(@PathVariable Long userId) {
        List<Progress> progressList = progressService.findByUserId(userId);
        return ResponseEntity.ok(progressList);
    }
    
    @GetMapping("/subject/{subject}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Progress>> getProgressBySubject(@PathVariable String subject) {
        List<Progress> progressList = progressService.findBySubject(subject);
        return ResponseEntity.ok(progressList);
    }
    
    @GetMapping("/user/{userId}/subject/{subject}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.isCurrentUser(#userId)")
    public ResponseEntity<List<Progress>> getUserSubjectProgress(
            @PathVariable Long userId,
            @PathVariable String subject) {
        List<Progress> progressList = progressService.findByUserIdAndSubject(userId, subject);
        return ResponseEntity.ok(progressList);
    }
    
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<Progress> createProgress(@Valid @RequestBody Progress progress) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        // Convert username to userId (In a real app, we would look up the user by username)
        // For simplicity, assuming username is the user ID
        Long userId = Long.parseLong(username);
        progress.setUserId(userId);
        
        Progress createdProgress = progressService.createProgress(progress);
        return new ResponseEntity<>(createdProgress, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @progressSecurity.isOwner(#id)")
    public ResponseEntity<Progress> updateProgress(@PathVariable Long id, @Valid @RequestBody Progress progressDetails) {
        Progress updatedProgress = progressService.updateProgress(id, progressDetails);
        return ResponseEntity.ok(updatedProgress);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProgress(@PathVariable Long id) {
        progressService.deleteProgress(id);
        return ResponseEntity.noContent().build();
    }
}