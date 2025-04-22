package com.examease.controller;

import com.examease.dto.FeedbackDTO;
import com.examease.entity.Log;
import com.examease.service.FeedbackService;
import com.examease.service.LogService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FeedbackController {

    private final FeedbackService feedbackService;
    private final LogService logService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService, LogService logService) {
        this.feedbackService = feedbackService;
        this.logService = logService;
    }

    @PostMapping("/feedback")
    public ResponseEntity<FeedbackDTO> createFeedback(@Valid @RequestBody FeedbackDTO feedbackDTO, HttpServletRequest request) {
        FeedbackDTO createdFeedback = feedbackService.createFeedback(feedbackDTO);
        
        // Log feedback creation
        Log log = new Log();
        log.setUserId(feedbackDTO.getUserId());
        log.setAction("SUBMIT_FEEDBACK");
        log.setEntityType("FEEDBACK");
        log.setEntityId(createdFeedback.getId());
        log.setIpAddress(request.getRemoteAddr());
        logService.createLog(log);
        
        return new ResponseEntity<>(createdFeedback, HttpStatus.CREATED);
    }

    @GetMapping("/feedback")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<FeedbackDTO>> getAllFeedback() {
        return ResponseEntity.ok(feedbackService.getAllFeedback());
    }

    @GetMapping("/feedback/{id}")
    @PreAuthorize("hasRole('ADMIN') or @feedbackSecurity.canAccessFeedback(authentication, #id)")
    public ResponseEntity<FeedbackDTO> getFeedbackById(@PathVariable Long id) {
        return ResponseEntity.ok(feedbackService.getFeedbackById(id));
    }

    @GetMapping("/feedback/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.hasUserId(authentication, #userId)")
    public ResponseEntity<List<FeedbackDTO>> getFeedbackByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(feedbackService.getFeedbackByUserId(userId));
    }

    @GetMapping("/feedback/exam/{examId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<FeedbackDTO>> getFeedbackByExamId(@PathVariable Long examId) {
        return ResponseEntity.ok(feedbackService.getFeedbackByExamId(examId));
    }

    @GetMapping("/feedback/unanswered")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<FeedbackDTO>> getUnansweredFeedback() {
        return ResponseEntity.ok(feedbackService.getUnansweredFeedback());
    }

    @PostMapping("/feedback/{id}/respond")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FeedbackDTO> respondToFeedback(
            @PathVariable Long id, 
            @RequestBody String response, 
            Authentication authentication,
            HttpServletRequest request) {
        
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        
        // For simplicity, we're using a fixed ID here. In a real application,
        // you would fetch the user by username and get their ID.
        Long respondedBy = 1L;
        
        FeedbackDTO updatedFeedback = feedbackService.respondToFeedback(id, response, respondedBy);
        
        // Log feedback response
        Log log = new Log();
        log.setUserId(respondedBy);
        log.setAction("RESPOND_TO_FEEDBACK");
        log.setEntityType("FEEDBACK");
        log.setEntityId(id);
        log.setIpAddress(request.getRemoteAddr());
        logService.createLog(log);
        
        return ResponseEntity.ok(updatedFeedback);
    }

    @GetMapping("/feedback/exam/{examId}/average-rating")
    public ResponseEntity<Double> getAverageRatingByExamId(@PathVariable Long examId) {
        return ResponseEntity.ok(feedbackService.getAverageRatingByExamId(examId));
    }
}
