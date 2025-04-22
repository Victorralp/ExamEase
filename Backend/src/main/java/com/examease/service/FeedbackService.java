package com.examease.service;

import com.examease.dto.FeedbackDTO;

import java.util.List;

public interface FeedbackService {
    FeedbackDTO createFeedback(FeedbackDTO feedbackDTO);
    FeedbackDTO updateFeedback(Long id, FeedbackDTO feedbackDTO);
    FeedbackDTO respondToFeedback(Long id, String response, Long respondedBy);
    List<FeedbackDTO> getAllFeedback();
    FeedbackDTO getFeedbackById(Long id);
    void deleteFeedback(Long id);
    List<FeedbackDTO> getFeedbackByUserId(Long userId);
    List<FeedbackDTO> getFeedbackByExamId(Long examId);
    List<FeedbackDTO> getFeedbackByUserIdAndExamId(Long userId, Long examId);
    Double getAverageRatingByExamId(Long examId);
    List<FeedbackDTO> getUnansweredFeedback();
}
