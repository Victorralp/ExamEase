package com.examease.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(columnDefinition = "TEXT")
    private String question;

    @NotBlank
    @Size(max = 50)
    @Column(name = "question_type")
    private String questionType; // multiple_choice, true_false, short_answer, multiple_select

    @NotBlank
    @Size(max = 255)
    private String subject;

    @Size(max = 255)
    private String topic;

    @NotBlank
    @Size(max = 50)
    private String difficulty = "medium"; // easy, medium, hard

    @Column(columnDefinition = "JSON")
    private String options; // JSON array of options

    @Column(name = "correct_answer", columnDefinition = "JSON")
    private String correctAnswer; // JSON - string or array of strings

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @Column(columnDefinition = "JSON")
    private String tags; // JSON array of tags

    @NotNull
    @Column(name = "created_by")
    private Long createdBy; // admin user id
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", referencedColumnName = "id", insertable = false, updatable = false)
    private User creator;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}