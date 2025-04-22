package com.examease.controller;

import com.examease.dto.UserDTO;
import com.examease.entity.Log;
import com.examease.service.LogService;
import com.examease.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    private final UserService userService;
    private final LogService logService;

    @Autowired
    public UserController(UserService userService, LogService logService) {
        this.userService = userService;
        this.logService = logService;
    }

    @GetMapping("/user")
    public ResponseEntity<UserDTO> getCurrentUser(Authentication authentication) {
        UserDTO userDTO = userService.getUserByUsername(authentication.getName());
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.hasUserId(authentication, #id)")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.hasUserId(authentication, #id)")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO,
                                             Authentication authentication, HttpServletRequest request) {
        UserDTO updatedUser = userService.updateUser(id, userDTO);
        
        // Log user update
        Log log = new Log();
        log.setUserId(id);
        log.setAction("UPDATE_USER");
        log.setEntityType("USER");
        log.setEntityId(id);
        log.setIpAddress(request.getRemoteAddr());
        logService.createLog(log);
        
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id, HttpServletRequest request) {
        userService.deleteUser(id);
        
        // Log user deletion
        Log log = new Log();
        log.setAction("DELETE_USER");
        log.setEntityType("USER");
        log.setEntityId(id);
        log.setIpAddress(request.getRemoteAddr());
        logService.createLog(log);
        
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
