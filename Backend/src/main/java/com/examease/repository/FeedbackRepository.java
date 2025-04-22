package com.examease.repository;

import com.examease.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByUserId(Long userId);
    List<Feedback> findByExamId(Long examId);
    List<Feedback> findByUserIdAndExamId(Long userId, Long examId);
    
    @Query("SELECT AVG(f.rating) FROM Feedback f WHERE f.examId = ?1")
    Double getAverageRatingByExamId(Long examId);
    
    List<Feedback> findByResponseIsNull();
}
