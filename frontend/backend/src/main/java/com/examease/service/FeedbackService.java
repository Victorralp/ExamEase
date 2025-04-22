package com.examease.service;

import com.examease.exception.ResourceNotFoundException;
import com.examease.model.Feedback;
import com.examease.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    
    private final FeedbackRepository feedbackRepository;
    
    public List<Feedback> findAll() {
        return feedbackRepository.findAll();
    }
    
    public Feedback findById(Long id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with id: " + id));
    }
    
    public List<Feedback> findByUserId(Long userId) {
        return feedbackRepository.findByUserId(userId);
    }
    
    public List<Feedback> findByExamId(Long examId) {
        return feedbackRepository.findByExamId(examId);
    }
    
    public List<Feedback> findByRating(Integer rating) {
        return feedbackRepository.findByRating(rating);
    }
    
    @Transactional
    public Feedback createFeedback(Feedback feedback) {
        if (feedback.getSubmittedAt() == null) {
            feedback.setSubmittedAt(LocalDateTime.now());
        }
        return feedbackRepository.save(feedback);
    }
    
    @Transactional
    public Feedback updateFeedback(Long id, Feedback feedbackDetails) {
        Feedback feedback = findById(id);
        
        feedback.setComment(feedbackDetails.getComment());
        feedback.setRating(feedbackDetails.getRating());
        
        return feedbackRepository.save(feedback);
    }
    
    @Transactional
    public void deleteFeedback(Long id) {
        Feedback feedback = findById(id);
        feedbackRepository.delete(feedback);
    }
}