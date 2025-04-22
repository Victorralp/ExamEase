package com.examease.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {
    private Long id;
    
    @NotBlank(message = "Username cannot be empty")
    private String username;
    
    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Email should be valid")
    private String email;
    
    @NotBlank(message = "First name cannot be empty")
    private String firstName;
    
    @NotBlank(message = "Last name cannot be empty")
    private String lastName;
    
    private String role;
    
    private String createdAt;
    
    private String message;
    
    public UserDTO(String message) {
        this.message = message;
    }
}
