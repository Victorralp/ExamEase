package com.examease.repository;

import com.examease.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByUserId(Long userId);
    List<Result> findByExamId(Long examId);
    List<Result> findByUserIdAndExamId(Long userId, Long examId);
    
    @Query("SELECT AVG(r.score) FROM Result r WHERE r.examId = ?1")
    Double getAverageScoreByExamId(Long examId);
    
    @Query("SELECT COUNT(r) FROM Result r WHERE r.examId = ?1 AND r.score >= ?2")
    Long countPassingScoresByExamId(Long examId, Integer passingScore);
}
