package com.examease.controller;

import com.examease.dto.LogDTO;
import com.examease.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@PreAuthorize("hasRole('ADMIN')")
public class LogController {

    private final LogService logService;

    @Autowired
    public LogController(LogService logService) {
        this.logService = logService;
    }

    @GetMapping("/logs")
    public ResponseEntity<List<LogDTO>> getAllLogs() {
        return ResponseEntity.ok(logService.getAllLogs());
    }

    @GetMapping("/logs/{id}")
    public ResponseEntity<LogDTO> getLogById(@PathVariable Long id) {
        return ResponseEntity.ok(logService.getLogById(id));
    }

    @GetMapping("/logs/user/{userId}")
    public ResponseEntity<List<LogDTO>> getLogsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(logService.getLogsByUserId(userId));
    }

    @GetMapping("/logs/action/{action}")
    public ResponseEntity<List<LogDTO>> getLogsByAction(@PathVariable String action) {
        return ResponseEntity.ok(logService.getLogsByAction(action));
    }

    @GetMapping("/logs/entity/{entityType}/{entityId}")
    public ResponseEntity<List<LogDTO>> getLogsByEntityTypeAndEntityId(
            @PathVariable String entityType, @PathVariable Long entityId) {
        return ResponseEntity.ok(logService.getLogsByEntityTypeAndEntityId(entityType, entityId));
    }

    @GetMapping("/logs/date-range")
    public ResponseEntity<List<LogDTO>> getLogsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        return ResponseEntity.ok(logService.getLogsByDateRange(startDate, endDate));
    }
}
