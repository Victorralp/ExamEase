package com.examease.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotBlank
    @Size(min = 3, max = 255)
    private String username;
    
    @NotBlank
    @Size(min = 6, max = 255)
    private String password;
    
    @NotBlank
    @Size(max = 255)
    @Email
    private String email;
    
    @NotBlank
    @Size(max = 255)
    private String firstName;
    
    @NotBlank
    @Size(max = 255)
    private String lastName;
    
    @NotBlank
    @Size(max = 50)
    private String role;
}