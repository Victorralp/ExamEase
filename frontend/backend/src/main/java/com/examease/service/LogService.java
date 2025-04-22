package com.examease.service;

import com.examease.exception.ResourceNotFoundException;
import com.examease.model.Log;
import com.examease.repository.LogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LogService {
    
    private final LogRepository logRepository;
    
    public List<Log> findAll() {
        return logRepository.findAll();
    }
    
    public Log findById(Long id) {
        return logRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Log not found with id: " + id));
    }
    
    public List<Log> findByUserId(Long userId) {
        return logRepository.findByUserId(userId);
    }
    
    public List<Log> findByAction(String action) {
        return logRepository.findByAction(action);
    }
    
    public List<Log> findByEntityType(String entityType) {
        return logRepository.findByEntityType(entityType);
    }
    
    @Transactional
    public Log createLog(Log log) {
        if (log.getTimestamp() == null) {
            log.setTimestamp(LocalDateTime.now());
        }
        return logRepository.save(log);
    }
    
    @Transactional
    public void deleteLogs() {
        logRepository.deleteAll();
    }
    
    @Transactional
    public void deleteLogById(Long id) {
        Log log = findById(id);
        logRepository.delete(log);
    }
}