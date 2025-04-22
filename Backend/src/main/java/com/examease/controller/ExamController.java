package com.examease.controller;

import com.examease.dto.ExamDTO;
import com.examease.entity.Log;
import com.examease.service.ExamService;
import com.examease.service.LogService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ExamController {

    private final ExamService examService;
    private final LogService logService;

    @Autowired
    public ExamController(ExamService examService, LogService logService) {
        this.examService = examService;
        this.logService = logService;
    }

    @PostMapping("/exams")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ExamDTO> createExam(@Valid @RequestBody ExamDTO examDTO, HttpServletRequest request) {
        ExamDTO createdExam = examService.createExam(examDTO);
        
        // Log exam creation
        Log log = new Log();
        log.setUserId(examDTO.getCreatedBy());
        log.setAction("CREATE_EXAM");
        log.setEntityType("EXAM");
        log.setEntityId(createdExam.getId());
        log.setIpAddress(request.getRemoteAddr());
        logService.createLog(log);
        
        return new ResponseEntity<>(createdExam, HttpStatus.CREATED);
    }

    @PutMapping("/exams/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ExamDTO> updateExam(@PathVariable Long id, @Valid @RequestBody ExamDTO examDTO, HttpServletRequest request) {
        ExamDTO updatedExam = examService.updateExam(id, examDTO);
        
        // Log exam update
        Log log = new Log();
        log.setUserId(examDTO.getCreatedBy());
        log.setAction("UPDATE_EXAM");
        log.setEntityType("EXAM");
        log.setEntityId(id);
        log.setIpAddress(request.getRemoteAddr());
        logService.createLog(log);
        
        return ResponseEntity.ok(updatedExam);
    }

    @GetMapping("/exams")
    public ResponseEntity<List<ExamDTO>> getAllExams() {
        return ResponseEntity.ok(examService.getAllExams());
    }

    @GetMapping("/exams/{id}")
    public ResponseEntity<ExamDTO> getExamById(@PathVariable Long id) {
        return ResponseEntity.ok(examService.getExamById(id));
    }

    @DeleteMapping("/exams/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteExam(@PathVariable Long id, HttpServletRequest request) {
        examService.deleteExam(id);
        
        // Log exam deletion
        Log log = new Log();
        log.setAction("DELETE_EXAM");
        log.setEntityType("EXAM");
        log.setEntityId(id);
        log.setIpAddress(request.getRemoteAddr());
        logService.createLog(log);
        
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/exams/subject/{subject}")
    public ResponseEntity<List<ExamDTO>> getExamsBySubject(@PathVariable String subject) {
        return ResponseEntity.ok(examService.getExamsBySubject(subject));
    }

    @GetMapping("/exams/upcoming")
    public ResponseEntity<List<ExamDTO>> getUpcomingExams() {
        return ResponseEntity.ok(examService.getUpcomingExams());
    }

    @GetMapping("/exams/active")
    public ResponseEntity<List<ExamDTO>> getActiveExams() {
        return ResponseEntity.ok(examService.getActiveExams());
    }

    @GetMapping("/exams/created-by/{userId}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.hasUserId(authentication, #userId)")
    public ResponseEntity<List<ExamDTO>> getExamsByCreatedBy(@PathVariable Long userId) {
        return ResponseEntity.ok(examService.getExamsByCreatedBy(userId));
    }
}
