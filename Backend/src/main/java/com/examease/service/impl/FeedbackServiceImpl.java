package com.examease.service.impl;

import com.examease.dto.FeedbackDTO;
import com.examease.entity.Feedback;
import com.examease.exception.ResourceNotFoundException;
import com.examease.repository.FeedbackRepository;
import com.examease.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    @Autowired
    public FeedbackServiceImpl(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public FeedbackDTO createFeedback(FeedbackDTO feedbackDTO) {
        Feedback feedback = mapToEntity(feedbackDTO);
        Feedback savedFeedback = feedbackRepository.save(feedback);
        return mapToDTO(savedFeedback);
    }

    @Override
    public FeedbackDTO updateFeedback(Long id, FeedbackDTO feedbackDTO) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback", "id", id));
        
        feedback.setRating(feedbackDTO.getRating());
        feedback.setDifficultyLevel(feedbackDTO.getDifficultyLevel());
        feedback.setComments(feedbackDTO.getComments());
        feedback.setSuggestions(feedbackDTO.getSuggestions());
        
        Feedback updatedFeedback = feedbackRepository.save(feedback);
        return mapToDTO(updatedFeedback);
    }

    @Override
    public FeedbackDTO respondToFeedback(Long id, String response, Long respondedBy) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback", "id", id));
        
        feedback.setResponse(response);
        feedback.setRespondedBy(respondedBy);
        feedback.setRespondedAt(LocalDateTime.now());
        
        Feedback updatedFeedback = feedbackRepository.save(feedback);
        return mapToDTO(updatedFeedback);
    }

    @Override
    public List<FeedbackDTO> getAllFeedback() {
        List<Feedback> feedbacks = feedbackRepository.findAll();
        return feedbacks.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public FeedbackDTO getFeedbackById(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback", "id", id));
        return mapToDTO(feedback);
    }

    @Override
    public void deleteFeedback(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback", "id", id));
        feedbackRepository.delete(feedback);
    }

    @Override
    public List<FeedbackDTO> getFeedbackByUserId(Long userId) {
        List<Feedback> feedbacks = feedbackRepository.findByUserId(userId);
        return feedbacks.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<FeedbackDTO> getFeedbackByExamId(Long examId) {
        List<Feedback> feedbacks = feedbackRepository.findByExamId(examId);
        return feedbacks.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<FeedbackDTO> getFeedbackByUserIdAndExamId(Long userId, Long examId) {
        List<Feedback> feedbacks = feedbackRepository.findByUserIdAndExamId(userId, examId);
        return feedbacks.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public Double getAverageRatingByExamId(Long examId) {
        return feedbackRepository.getAverageRatingByExamId(examId);
    }

    @Override
    public List<FeedbackDTO> getUnansweredFeedback() {
        List<Feedback> feedbacks = feedbackRepository.findByResponseIsNull();
        return feedbacks.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Helper method to map Entity to DTO
    private FeedbackDTO mapToDTO(Feedback feedback) {
        FeedbackDTO feedbackDTO = new FeedbackDTO();
        feedbackDTO.setId(feedback.getId());
        feedbackDTO.setUserId(feedback.getUserId());
        feedbackDTO.setExamId(feedback.getExamId());
        feedbackDTO.setRating(feedback.getRating());
        feedbackDTO.setDifficultyLevel(feedback.getDifficultyLevel());
        feedbackDTO.setComments(feedback.getComments());
        feedbackDTO.setSuggestions(feedback.getSuggestions());
        feedbackDTO.setResponse(feedback.getResponse());
        feedbackDTO.setRespondedBy(feedback.getRespondedBy());
        
        if (feedback.getRespondedAt() != null) {
            feedbackDTO.setRespondedAt(feedback.getRespondedAt().toString());
        }
        
        feedbackDTO.setCreatedAt(feedback.getCreatedAt().toString());
        
        return feedbackDTO;
    }

    // Helper method to map DTO to Entity
    private Feedback mapToEntity(FeedbackDTO feedbackDTO) {
        Feedback feedback = new Feedback();
        feedback.setUserId(feedbackDTO.getUserId());
        feedback.setExamId(feedbackDTO.getExamId());
        feedback.setRating(feedbackDTO.getRating());
        feedback.setDifficultyLevel(feedbackDTO.getDifficultyLevel());
        feedback.setComments(feedbackDTO.getComments());
        feedback.setSuggestions(feedbackDTO.getSuggestions());
        
        return feedback;
    }
}
