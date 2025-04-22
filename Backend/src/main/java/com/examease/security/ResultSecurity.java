package com.examease.security;

import com.examease.entity.Result;
import com.examease.entity.User;
import com.examease.repository.ResultRepository;
import com.examease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component("resultSecurity")
public class ResultSecurity {

    private final ResultRepository resultRepository;
    private final UserRepository userRepository;

    @Autowired
    public ResultSecurity(ResultRepository resultRepository, UserRepository userRepository) {
        this.resultRepository = resultRepository;
        this.userRepository = userRepository;
    }

    public boolean canAccessResult(Authentication authentication, Long resultId) {
        // Allow access if the user is an admin
        if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            return true;
        }
        
        // Allow access if the user is accessing their own result
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
        
        if (user == null) {
            return false;
        }
        
        Result result = resultRepository.findById(resultId).orElse(null);
        
        return result != null && result.getUserId().equals(user.getId());
    }
}
