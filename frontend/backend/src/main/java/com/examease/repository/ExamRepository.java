package com.examease.repository;

import com.examease.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByCreatedBy(Long userId);
    
    List<Exam> findByStatus(String status);
    
    List<Exam> findByStartDateBetween(LocalDateTime start, LocalDateTime end);
    
    List<Exam> findBySubject(String subject);
}