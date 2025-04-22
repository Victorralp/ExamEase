package com.examease.security;

import com.examease.entity.Feedback;
import com.examease.entity.User;
import com.examease.repository.FeedbackRepository;
import com.examease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component("feedbackSecurity")
public class FeedbackSecurity {

    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;

    @Autowired
    public FeedbackSecurity(FeedbackRepository feedbackRepository, UserRepository userRepository) {
        this.feedbackRepository = feedbackRepository;
        this.userRepository = userRepository;
    }

    public boolean canAccessFeedback(Authentication authentication, Long feedbackId) {
        // Allow access if the user is an admin
        if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            return true;
        }
        
        // Allow access if the user is accessing their own feedback
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
        
        if (user == null) {
            return false;
        }
        
        Feedback feedback = feedbackRepository.findById(feedbackId).orElse(null);
        
        return feedback != null && feedback.getUserId().equals(user.getId());
    }
}
