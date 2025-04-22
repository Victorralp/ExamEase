package com.examease.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FeedbackDTO {
    private Long id;
    
    @NotNull(message = "User ID cannot be null")
    private Long userId;
    
    @NotNull(message = "Exam ID cannot be null")
    private Long examId;
    
    @NotNull(message = "Rating cannot be null")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;
    
    @NotBlank(message = "Difficulty level cannot be empty")
    private String difficultyLevel;
    
    @NotBlank(message = "Comments cannot be empty")
    private String comments;
    
    private String suggestions;
    
    private String response;
    
    private Long respondedBy;
    
    private String respondedAt;
    
    private String createdAt;
}
