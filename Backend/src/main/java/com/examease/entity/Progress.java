package com.examease.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "progress")
public class Progress {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(nullable = false)
    private String subject;
    
    @Column(name = "average_score", nullable = false)
    private Integer averageScore;
    
    @Column(name = "exams_taken", nullable = false)
    private Integer examsTaken;
    
    @Column(name = "best_score")
    private Integer bestScore;
    
    @Column(name = "weak_areas", columnDefinition = "JSON")
    private String weakAreas = "[]"; // JSON array of weak areas
    
    @Column(name = "strong_areas", columnDefinition = "JSON")
    private String strongAreas = "[]"; // JSON array of strong areas
    
    @UpdateTimestamp
    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;
}
