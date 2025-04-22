package com.examease.controller;

import com.examease.dto.ProgressDTO;
import com.examease.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProgressController {

    private final ProgressService progressService;

    @Autowired
    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/progress")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProgressDTO>> getAllProgress() {
        return ResponseEntity.ok(progressService.getAllProgress());
    }

    @GetMapping("/progress/{id}")
    @PreAuthorize("hasRole('ADMIN') or @progressSecurity.canAccessProgress(authentication, #id)")
    public ResponseEntity<ProgressDTO> getProgressById(@PathVariable Long id) {
        return ResponseEntity.ok(progressService.getProgressById(id));
    }

    @GetMapping("/progress/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.hasUserId(authentication, #userId)")
    public ResponseEntity<List<ProgressDTO>> getProgressByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(progressService.getProgressByUserId(userId));
    }

    @GetMapping("/progress/user/{userId}/subject/{subject}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.hasUserId(authentication, #userId)")
    public ResponseEntity<ProgressDTO> getProgressByUserIdAndSubject(
            @PathVariable Long userId, @PathVariable String subject) {
        return ResponseEntity.ok(progressService.getProgressByUserIdAndSubject(userId, subject));
    }

    @PutMapping("/progress/calculate/user/{userId}/subject/{subject}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.hasUserId(authentication, #userId)")
    public ResponseEntity<Void> calculateAndUpdateProgress(
            @PathVariable Long userId, @PathVariable String subject) {
        progressService.calculateAndUpdateProgress(userId, subject);
        return ResponseEntity.ok().build();
    }
}
