package com.examease.security;

import com.examease.model.Feedback;
import com.examease.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component("feedbackSecurity")
@RequiredArgsConstructor
public class FeedbackSecurity {
    
    private final FeedbackService feedbackService;
    
    public boolean isOwner(Long feedbackId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        
        String username = authentication.getName();
        Long userId;
        try {
            userId = Long.parseLong(username);
        } catch (NumberFormatException e) {
            return false;
        }
        
        Feedback feedback = feedbackService.findById(feedbackId);
        return feedback != null && feedback.getUserId().equals(userId);
    }
}