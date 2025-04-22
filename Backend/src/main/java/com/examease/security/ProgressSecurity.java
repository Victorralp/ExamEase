package com.examease.security;

import com.examease.entity.Progress;
import com.examease.entity.User;
import com.examease.repository.ProgressRepository;
import com.examease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component("progressSecurity")
public class ProgressSecurity {

    private final ProgressRepository progressRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProgressSecurity(ProgressRepository progressRepository, UserRepository userRepository) {
        this.progressRepository = progressRepository;
        this.userRepository = userRepository;
    }

    public boolean canAccessProgress(Authentication authentication, Long progressId) {
        // Allow access if the user is an admin
        if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            return true;
        }
        
        // Allow access if the user is accessing their own progress
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
        
        if (user == null) {
            return false;
        }
        
        Progress progress = progressRepository.findById(progressId).orElse(null);
        
        return progress != null && progress.getUserId().equals(user.getId());
    }
}
