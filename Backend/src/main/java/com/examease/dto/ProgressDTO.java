package com.examease.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class ProgressDTO {
    private Long id;
    
    @NotNull(message = "User ID cannot be null")
    private Long userId;
    
    @NotBlank(message = "Subject cannot be empty")
    private String subject;
    
    @NotNull(message = "Average score cannot be null")
    private Integer averageScore;
    
    @NotNull(message = "Exams taken cannot be null")
    private Integer examsTaken;
    
    private Integer bestScore;
    
    private List<String> weakAreas;
    
    private List<String> strongAreas;
    
    private String lastUpdated;
}
