package com.examease.service;

import com.examease.dto.LogDTO;
import com.examease.entity.Log;

import java.time.LocalDateTime;
import java.util.List;

public interface LogService {
    Log createLog(Log log);
    List<LogDTO> getAllLogs();
    LogDTO getLogById(Long id);
    List<LogDTO> getLogsByUserId(Long userId);
    List<LogDTO> getLogsByAction(String action);
    List<LogDTO> getLogsByEntityTypeAndEntityId(String entityType, Long entityId);
    List<LogDTO> getLogsByDateRange(LocalDateTime startDate, LocalDateTime endDate);
}
