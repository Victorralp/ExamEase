package com.examease.security;

import com.examease.model.Result;
import com.examease.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component("resultSecurity")
@RequiredArgsConstructor
public class ResultSecurity {
    
    private final ResultService resultService;
    
    public boolean isOwner(Long resultId) {
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
        
        Result result = resultService.findById(resultId);
        return result != null && result.getUserId().equals(userId);
    }
}