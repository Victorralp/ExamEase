package com.examease.controller;

import com.examease.model.Feedback;
import com.examease.service.FeedbackService;
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
@RequestMapping("/feedback")
@RequiredArgsConstructor
public class FeedbackController {
    
    private final FeedbackService feedbackService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        List<Feedback> feedbackList = feedbackService.findAll();
        return ResponseEntity.ok(feedbackList);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @feedbackSecurity.isOwner(#id)")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
        Feedback feedback = feedbackService.findById(id);
        return ResponseEntity.ok(feedback);
    }
    
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.isCurrentUser(#userId)")
    public ResponseEntity<List<Feedback>> getUserFeedback(@PathVariable Long userId) {
        List<Feedback> feedbackList = feedbackService.findByUserId(userId);
        return ResponseEntity.ok(feedbackList);
    }
    
    @GetMapping("/exam/{examId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Feedback>> getExamFeedback(@PathVariable Long examId) {
        List<Feedback> feedbackList = feedbackService.findByExamId(examId);
        return ResponseEntity.ok(feedbackList);
    }
    
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<Feedback> createFeedback(@Valid @RequestBody Feedback feedback) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        // Convert username to userId (In a real app, we would look up the user by username)
        // For simplicity, assuming username is the user ID
        Long userId = Long.parseLong(username);
        feedback.setUserId(userId);
        
        Feedback createdFeedback = feedbackService.createFeedback(feedback);
        return new ResponseEntity<>(createdFeedback, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @feedbackSecurity.isOwner(#id)")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable Long id, @Valid @RequestBody Feedback feedbackDetails) {
        Feedback updatedFeedback = feedbackService.updateFeedback(id, feedbackDetails);
        return ResponseEntity.ok(updatedFeedback);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/rating/{rating}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Feedback>> getFeedbackByRating(@PathVariable Integer rating) {
        List<Feedback> feedbackList = feedbackService.findByRating(rating);
        return ResponseEntity.ok(feedbackList);
    }
}