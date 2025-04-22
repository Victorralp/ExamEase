package com.examease.service;

import com.examease.exception.ResourceNotFoundException;
import com.examease.model.Result;
import com.examease.repository.ResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResultService {
    
    private final ResultRepository resultRepository;
    
    public List<Result> findAll() {
        return resultRepository.findAll();
    }
    
    public Result findById(Long id) {
        return resultRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Result not found with id: " + id));
    }
    
    public List<Result> findByUserId(Long userId) {
        return resultRepository.findByUserId(userId);
    }
    
    public List<Result> findByExamId(Long examId) {
        return resultRepository.findByExamId(examId);
    }
    
    public List<Result> findByUserIdAndExamId(Long userId, Long examId) {
        return resultRepository.findByUserIdAndExamId(userId, examId);
    }
    
    public List<Result> findByStatus(String status) {
        return resultRepository.findByStatus(status);
    }
    
    @Transactional
    public Result createResult(Result result) {
        if (result.getSubmittedAt() == null) {
            result.setSubmittedAt(LocalDateTime.now());
        }
        return resultRepository.save(result);
    }
    
    @Transactional
    public Result updateResult(Long id, Result resultDetails) {
        Result result = findById(id);
        
        result.setScore(resultDetails.getScore());
        result.setTimeSpent(resultDetails.getTimeSpent());
        result.setAnswers(resultDetails.getAnswers());
        result.setStatus(resultDetails.getStatus());
        
        return resultRepository.save(result);
    }
    
    @Transactional
    public void deleteResult(Long id) {
        Result result = findById(id);
        resultRepository.delete(result);
    }
}