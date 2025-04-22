package com.examease.dto;

import lombok.Data;

@Data
public class JwtAuthResponse {
    private String accessToken;
    private String tokenType;
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
}
