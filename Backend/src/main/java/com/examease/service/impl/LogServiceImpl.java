package com.examease.service.impl;

import com.examease.dto.LogDTO;
import com.examease.entity.Log;
import com.examease.exception.ResourceNotFoundException;
import com.examease.repository.LogRepository;
import com.examease.service.LogService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LogServiceImpl implements LogService {

    private final LogRepository logRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public LogServiceImpl(LogRepository logRepository, ObjectMapper objectMapper) {
        this.logRepository = logRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public Log createLog(Log log) {
        return logRepository.save(log);
    }

    @Override
    public List<LogDTO> getAllLogs() {
        List<Log> logs = logRepository.findAll();
        return logs.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public LogDTO getLogById(Long id) {
        Log log = logRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Log", "id", id));
        return mapToDTO(log);
    }

    @Override
    public List<LogDTO> getLogsByUserId(Long userId) {
        List<Log> logs = logRepository.findByUserId(userId);
        return logs.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<LogDTO> getLogsByAction(String action) {
        List<Log> logs = logRepository.findByAction(action);
        return logs.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<LogDTO> getLogsByEntityTypeAndEntityId(String entityType, Long entityId) {
        List<Log> logs = logRepository.findByEntityTypeAndEntityId(entityType, entityId);
        return logs.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<LogDTO> getLogsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        List<Log> logs = logRepository.findByCreatedAtBetween(startDate, endDate);
        return logs.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Helper method to map Entity to DTO
    private LogDTO mapToDTO(Log log) {
        LogDTO logDTO = new LogDTO();
        logDTO.setId(log.getId());
        logDTO.setUserId(log.getUserId());
        logDTO.setAction(log.getAction());
        logDTO.setEntityType(log.getEntityType());
        logDTO.setEntityId(log.getEntityId());
        logDTO.setIpAddress(log.getIpAddress());
        logDTO.setCreatedAt(log.getCreatedAt().toString());
        
        try {
            if (log.getDetails() != null) {
                logDTO.setDetails(objectMapper.readValue(log.getDetails(), Map.class));
            } else {
                logDTO.setDetails(Collections.emptyMap());
            }
        } catch (JsonProcessingException e) {
            logDTO.setDetails(Collections.emptyMap());
        }
        
        return logDTO;
    }
}
