package com.examease.service;

import com.examease.exception.ResourceNotFoundException;
import com.examease.model.Progress;
import com.examease.repository.ProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgressService {
    
    private final ProgressRepository progressRepository;
    
    public List<Progress> findAll() {
        return progressRepository.findAll();
    }
    
    public Progress findById(Long id) {
        return progressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Progress not found with id: " + id));
    }
    
    public List<Progress> findByUserId(Long userId) {
        return progressRepository.findByUserId(userId);
    }
    
    public List<Progress> findBySubject(String subject) {
        return progressRepository.findBySubject(subject);
    }
    
    public List<Progress> findByUserIdAndSubject(Long userId, String subject) {
        return progressRepository.findByUserIdAndSubject(userId, subject);
    }
    
    @Transactional
    public Progress createProgress(Progress progress) {
        if (progress.getUpdatedAt() == null) {
            progress.setUpdatedAt(LocalDateTime.now());
        }
        return progressRepository.save(progress);
    }
    
    @Transactional
    public Progress updateProgress(Long id, Progress progressDetails) {
        Progress progress = findById(id);
        
        progress.setSubject(progressDetails.getSubject());
        progress.setScore(progressDetails.getScore());
        progress.setCompletedExams(progressDetails.getCompletedExams());
        progress.setTotalExams(progressDetails.getTotalExams());
        progress.setStrengths(progressDetails.getStrengths());
        progress.setWeaknesses(progressDetails.getWeaknesses());
        progress.setUpdatedAt(LocalDateTime.now());
        
        return progressRepository.save(progress);
    }
    
    @Transactional
    public void deleteProgress(Long id) {
        Progress progress = findById(id);
        progressRepository.delete(progress);
    }
}