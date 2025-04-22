package com.examease.controller;

import com.examease.model.Log;
import com.examease.service.LogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/logs")
@RequiredArgsConstructor
public class LogController {
    
    private final LogService logService;
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Log>> getAllLogs() {
        List<Log> logs = logService.findAll();
        return ResponseEntity.ok(logs);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Log> getLogById(@PathVariable Long id) {
        Log log = logService.findById(id);
        return ResponseEntity.ok(log);
    }
    
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Log>> getUserLogs(@PathVariable Long userId) {
        List<Log> logs = logService.findByUserId(userId);
        return ResponseEntity.ok(logs);
    }
    
    @GetMapping("/action/{action}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Log>> getLogsByAction(@PathVariable String action) {
        List<Log> logs = logService.findByAction(action);
        return ResponseEntity.ok(logs);
    }
    
    @GetMapping("/entity/{entityType}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Log>> getLogsByEntityType(@PathVariable String entityType) {
        List<Log> logs = logService.findByEntityType(entityType);
        return ResponseEntity.ok(logs);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Log> createLog(@Valid @RequestBody Log log) {
        Log createdLog = logService.createLog(log);
        return new ResponseEntity<>(createdLog, HttpStatus.CREATED);
    }
    
    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> clearLogs() {
        logService.deleteLogs();
        return ResponseEntity.noContent().build();
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteLog(@PathVariable Long id) {
        logService.deleteLogById(id);
        return ResponseEntity.noContent().build();
    }
}