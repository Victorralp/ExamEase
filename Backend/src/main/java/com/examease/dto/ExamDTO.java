package com.examease.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.util.List;

@Data
public class ExamDTO {
    private Long id;
    
    @NotBlank(message = "Exam name cannot be empty")
    private String name;
    
    @NotBlank(message = "Subject cannot be empty")
    private String subject;
    
    private String description;
    
    @NotNull(message = "Duration cannot be null")
    @Positive(message = "Duration must be positive")
    private Integer duration; // in minutes
    
    @NotBlank(message = "Start date cannot be empty")
    private String startDate; // ISO date string
    
    private String endDate; // ISO date string, optional
    
    private String status = "draft"; // draft, scheduled, active, completed, cancelled
    
    @NotNull(message = "Passing score cannot be null")
    private Integer passingScore = 60;
    
    @NotNull(message = "Created by cannot be null")
    private Long createdBy;
    
    private String createdAt;
    
    private List<Long> questionIds; // array of question IDs
}
