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
@Table(name = "feedback")
public class Feedback {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "exam_id", nullable = false)
    private Long examId;
    
    @Column(nullable = false)
    private Integer rating;
    
    @Column(name = "difficulty_level", nullable = false)
    private String difficultyLevel;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String comments;
    
    @Column(columnDefinition = "TEXT")
    private String suggestions;
    
    @Column(columnDefinition = "TEXT")
    private String response;
    
    @Column(name = "responded_by")
    private Long respondedBy;
    
    @Column(name = "responded_at")
    private LocalDateTime respondedAt;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
