package com.examease.repository;

import com.examease.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByUserId(Long userId);
    
    List<Result> findByExamId(Long examId);
    
    List<Result> findByUserIdAndExamId(Long userId, Long examId);
    
    List<Result> findByStatus(String status);
}