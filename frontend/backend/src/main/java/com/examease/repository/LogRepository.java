package com.examease.repository;

import com.examease.model.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<Log, Long> {
    List<Log> findByUserId(Long userId);
    
    List<Log> findByAction(String action);
    
    List<Log> findByEntityTypeAndEntityId(String entityType, Long entityId);
    
    List<Log> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}