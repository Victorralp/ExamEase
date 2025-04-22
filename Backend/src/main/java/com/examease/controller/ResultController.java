package com.examease.controller;

import com.examease.dto.ResultDTO;
import com.examease.entity.Log;
import com.examease.service.LogService;
import com.examease.service.ProgressService;
import com.examease.service.ResultService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ResultController {

    private final ResultService resultService;
    private final ProgressService progressService;
    private final LogService logService;

    @Autowired
    public ResultController(ResultService resultService, ProgressService progressService, LogService logService) {
        this.resultService = resultService;
        this.progressService = progressService;
        this.logService = logService;
    }

    @PostMapping("/results")
    public ResponseEntity<ResultDTO> createResult(@Valid @RequestBody ResultDTO resultDTO, HttpServletRequest request) {
        ResultDTO createdResult = resultService.createResult(resultDTO);
        
        // Update progress for the user
        progressService.calculateAndUpdateProgress(resultDTO.getUserId(), "");
        
        // Log result creation
        Log log = new Log();
        log.setUserId(resultDTO.getUserId());
        log.setAction("SUBMIT_RESULT");
        log.setEntityType("RESULT");
        log.setEntityId(createdResult.getId());
        log.setIpAddress(request.getRemoteAddr());
        logService.createLog(log);
        
        return new ResponseEntity<>(createdResult, HttpStatus.CREATED);
    }

    @GetMapping("/results")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ResultDTO>> getAllResults() {
        return ResponseEntity.ok(resultService.getAllResults());
    }

    @GetMapping("/results/{id}")
    @PreAuthorize("hasRole('ADMIN') or @resultSecurity.canAccessResult(authentication, #id)")
    public ResponseEntity<ResultDTO> getResultById(@PathVariable Long id) {
        return ResponseEntity.ok(resultService.getResultById(id));
    }

    @GetMapping("/results/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.hasUserId(authentication, #userId)")
    public ResponseEntity<List<ResultDTO>> getResultsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(resultService.getResultsByUserId(userId));
    }

    @GetMapping("/results/exam/{examId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ResultDTO>> getResultsByExamId(@PathVariable Long examId) {
        return ResponseEntity.ok(resultService.getResultsByExamId(examId));
    }

    @GetMapping("/results/user/{userId}/exam/{examId}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.hasUserId(authentication, #userId)")
    public ResponseEntity<List<ResultDTO>> getResultsByUserIdAndExamId(
            @PathVariable Long userId, @PathVariable Long examId) {
        return ResponseEntity.ok(resultService.getResultsByUserIdAndExamId(userId, examId));
    }

    @GetMapping("/results/exam/{examId}/average")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Double> getAverageScoreByExamId(@PathVariable Long examId) {
        return ResponseEntity.ok(resultService.getAverageScoreByExamId(examId));
    }

    @GetMapping("/results/exam/{examId}/passing-count")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Long> getPassingCountByExamId(
            @PathVariable Long examId, @RequestParam Integer passingScore) {
        return ResponseEntity.ok(resultService.getPassingCountByExamId(examId, passingScore));
    }
}
