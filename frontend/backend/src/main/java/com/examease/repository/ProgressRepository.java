package com.examease.repository;

import com.examease.model.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {
    List<Progress> findByUserId(Long userId);
    
    Optional<Progress> findByUserIdAndSubject(Long userId, String subject);
    
    List<Progress> findByAverageScoreGreaterThanEqual(Integer score);
    
    List<Progress> findByAverageScoreLessThan(Integer score);
}