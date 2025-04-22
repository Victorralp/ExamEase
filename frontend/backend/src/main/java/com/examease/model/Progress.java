package com.examease.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Progress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private User user;

    @NotBlank
    @Size(max = 255)
    private String subject;

    @NotNull
    @Column(name = "average_score")
    private Integer averageScore;

    @NotNull
    @Column(name = "exams_taken")
    private Integer examsTaken;

    @Column(name = "best_score")
    private Integer bestScore;

    @Column(name = "weak_areas", columnDefinition = "JSON")
    private String weakAreas; // JSON array of weak areas

    @Column(name = "strong_areas", columnDefinition = "JSON")
    private String strongAreas; // JSON array of strong areas

    @UpdateTimestamp
    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;
}