package com.examease.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private User user;

    @NotBlank
    @Size(max = 255)
    private String action;

    @Size(max = 255)
    @Column(name = "entity_type")
    private String entityType; // exam, question, user, etc.

    @Column(name = "entity_id")
    private Long entityId;

    @Column(columnDefinition = "JSON")
    private String details; // JSON object with additional details

    @Size(max = 50)
    @Column(name = "ip_address")
    private String ipAddress;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}