package com.examease.security;

import com.examease.model.Progress;
import com.examease.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component("progressSecurity")
@RequiredArgsConstructor
public class ProgressSecurity {
    
    private final ProgressService progressService;
    
    public boolean isOwner(Long progressId) {
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
        
        Progress progress = progressService.findById(progressId);
        return progress != null && progress.getUserId().equals(userId);
    }
}