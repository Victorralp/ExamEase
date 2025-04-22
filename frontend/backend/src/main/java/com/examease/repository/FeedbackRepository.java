package com.examease.repository;

import com.examease.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByUserId(Long userId);
    
    List<Feedback> findByExamId(Long examId);
    
    List<Feedback> findByUserIdAndExamId(Long userId, Long examId);
    
    List<Feedback> findByRespondedByIsNull();
    
    List<Feedback> findByRespondedByIsNotNull();
}