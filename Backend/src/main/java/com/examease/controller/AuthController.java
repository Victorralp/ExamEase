package com.examease.controller;

import com.examease.dto.ApiResponse;
import com.examease.dto.JwtAuthResponse;
import com.examease.dto.LoginRequest;
import com.examease.dto.RegisterRequest;
import com.examease.dto.UserDTO;
import com.examease.entity.Log;
import com.examease.entity.User;
import com.examease.security.JwtTokenProvider;
import com.examease.service.LogService;
import com.examease.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtTokenProvider tokenProvider;
    private final LogService logService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserService userService,
                         JwtTokenProvider tokenProvider, LogService logService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.logService = logService;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest, HttpServletRequest request) {
        // Check if username already exists
        if (userService.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, "Username already exists"));
        }

        // Check if email already exists
        if (userService.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, "Email already exists"));
        }

        // Create user
        UserDTO createdUser = userService.createUser(registerRequest);
        
        // Log user registration
        Log log = new Log();
        log.setUserId(createdUser.getId());
        log.setAction("REGISTER");
        log.setEntityType("USER");
        log.setEntityId(createdUser.getId());
        log.setIpAddress(request.getRemoteAddr());
        logService.createLog(log);
        
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<JwtAuthResponse> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userService.findByUsername(userDetails.getUsername());
        
        // Create response object
        JwtAuthResponse response = new JwtAuthResponse();
        response.setAccessToken(jwt);
        response.setTokenType("Bearer");
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setRole(user.getRole());
        
        // Log user login
        Log log = new Log();
        log.setUserId(user.getId());
        log.setAction("LOGIN");
        log.setEntityType("USER");
        log.setEntityId(user.getId());
        log.setIpAddress(request.getRemoteAddr());
        logService.createLog(log);
        
        return ResponseEntity.ok(response);
    }
}
