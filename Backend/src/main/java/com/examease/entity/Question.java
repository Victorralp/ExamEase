package com.examease.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "questions")
public class Question {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String question;
    
    @Column(name = "question_type", nullable = false)
    private String questionType; // multiple_choice, true_false, short_answer, multiple_select
    
    @Column(nullable = false)
    private String subject;
    
    private String topic;
    
    @Column(nullable = false)
    private String difficulty = "medium"; // easy, medium, hard
    
    @Column(columnDefinition = "JSON")
    private String options; // JSON array of options for multiple choice
    
    @Column(name = "correct_answer", columnDefinition = "JSON", nullable = false)
    private String correctAnswer; // JSON representation of the correct answer(s)
    
    @Column(columnDefinition = "TEXT")
    private String explanation;
    
    @Column(columnDefinition = "JSON")
    private String tags = "[]"; // JSON array of tags
    
    @Column(name = "created_by", nullable = false)
    private Long createdBy;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
