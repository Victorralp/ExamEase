package com.examease.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.Map;

@Data
public class ResultDTO {
    private Long id;
    
    @NotNull(message = "User ID cannot be null")
    private Long userId;
    
    @NotNull(message = "Exam ID cannot be null")
    private Long examId;
    
    @NotNull(message = "Score cannot be null")
    @Positive(message = "Score must be positive")
    private Integer score;
    
    @NotNull(message = "Time spent cannot be null")
    private Integer timeSpent; // in seconds
    
    @NotNull(message = "Answers cannot be null")
    private Map<String, Object> answers; // user answers object
    
    private String status = "completed"; // completed, failed, passed
    
    private String submittedAt;
}
