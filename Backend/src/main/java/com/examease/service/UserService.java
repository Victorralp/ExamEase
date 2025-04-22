package com.examease.service;

import com.examease.dto.RegisterRequest;
import com.examease.dto.UserDTO;
import com.examease.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDTO createUser(RegisterRequest registerRequest);
    UserDTO updateUser(Long id, UserDTO userDTO);
    List<UserDTO> getAllUsers();
    UserDTO getUserById(Long id);
    void deleteUser(Long id);
    UserDTO getUserByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    User findByUsername(String username);
    User save(User user);
}
