package com.examease.dto;

import lombok.Data;

import java.util.Map;

@Data
public class LogDTO {
    private Long id;
    private Long userId;
    private String action;
    private String entityType;
    private Long entityId;
    private Map<String, Object> details;
    private String ipAddress;
    private String createdAt;
}
