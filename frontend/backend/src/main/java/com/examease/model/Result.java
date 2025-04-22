package com.examease.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "results")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private User user;

    @NotNull
    @Column(name = "exam_id")
    private Long examId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Exam exam;

    @NotNull
    private Integer score;

    @NotNull
    @Column(name = "time_spent")
    private Integer timeSpent; // in seconds

    @Column(columnDefinition = "JSON")
    @NotNull
    private String answers; // JSON object of user answers

    @NotNull
    private String status = "completed"; // completed, failed, passed

    @CreationTimestamp
    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;
}