package com.examease.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class QuestionDTO {
    private Long id;
    
    @NotBlank(message = "Question text cannot be empty")
    private String question;
    
    @NotBlank(message = "Question type cannot be empty")
    private String questionType; // multiple_choice, true_false, short_answer, multiple_select
    
    @NotBlank(message = "Subject cannot be empty")
    private String subject;
    
    private String topic;
    
    private String difficulty = "medium"; // easy, medium, hard
    
    private List<String> options; // array of options for multiple choice
    
    @NotNull(message = "Correct answer cannot be null")
    private Object correctAnswer; // string or array depending on question type
    
    private String explanation;
    
    private List<String> tags;
    
    @NotNull(message = "Created by cannot be null")
    private Long createdBy;
    
    private String createdAt;
}
