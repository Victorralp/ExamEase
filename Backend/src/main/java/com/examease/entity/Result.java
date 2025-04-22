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
@Table(name = "results")
public class Result {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "exam_id", nullable = false)
    private Long examId;
    
    @Column(nullable = false)
    private Integer score;
    
    @Column(name = "time_spent", nullable = false)
    private Integer timeSpent; // in seconds
    
    @Column(columnDefinition = "JSON", nullable = false)
    private String answers; // JSON object containing user answers
    
    @Column(nullable = false)
    private String status = "completed"; // completed, failed, passed
    
    @CreationTimestamp
    @Column(name = "submitted_at", updatable = false)
    private LocalDateTime submittedAt;
}
