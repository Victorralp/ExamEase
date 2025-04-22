package com.examease.service.impl;

import com.examease.dto.ProgressDTO;
import com.examease.entity.Progress;
import com.examease.entity.Result;
import com.examease.exception.ResourceNotFoundException;
import com.examease.repository.ProgressRepository;
import com.examease.repository.ResultRepository;
import com.examease.service.ProgressService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProgressServiceImpl implements ProgressService {

    private final ProgressRepository progressRepository;
    private final ResultRepository resultRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public ProgressServiceImpl(ProgressRepository progressRepository, ResultRepository resultRepository, ObjectMapper objectMapper) {
        this.progressRepository = progressRepository;
        this.resultRepository = resultRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public ProgressDTO updateProgress(ProgressDTO progressDTO) {
        Optional<Progress> existingProgress = progressRepository.findByUserIdAndSubject(
                progressDTO.getUserId(), progressDTO.getSubject());
        
        Progress progress;
        if (existingProgress.isPresent()) {
            progress = existingProgress.get();
            progress.setAverageScore(progressDTO.getAverageScore());
            progress.setExamsTaken(progressDTO.getExamsTaken());
            progress.setBestScore(progressDTO.getBestScore());
            
            try {
                if (progressDTO.getWeakAreas() != null) {
                    progress.setWeakAreas(objectMapper.writeValueAsString(progressDTO.getWeakAreas()));
                }
                
                if (progressDTO.getStrongAreas() != null) {
                    progress.setStrongAreas(objectMapper.writeValueAsString(progressDTO.getStrongAreas()));
                }
            } catch (JsonProcessingException e) {
                throw new RuntimeException("Error processing JSON data", e);
            }
        } else {
            progress = mapToEntity(progressDTO);
        }
        
        Progress savedProgress = progressRepository.save(progress);
        return mapToDTO(savedProgress);
    }

    @Override
    public List<ProgressDTO> getAllProgress() {
        List<Progress> progressList = progressRepository.findAll();
        return progressList.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public ProgressDTO getProgressById(Long id) {
        Progress progress = progressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Progress", "id", id));
        return mapToDTO(progress);
    }

    @Override
    public List<ProgressDTO> getProgressByUserId(Long userId) {
        List<Progress> progressList = progressRepository.findByUserId(userId);
        return progressList.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public ProgressDTO getProgressByUserIdAndSubject(Long userId, String subject) {
        Progress progress = progressRepository.findByUserIdAndSubject(userId, subject)
                .orElseThrow(() -> new ResourceNotFoundException("Progress", "userId and subject", userId + " and " + subject));
        return mapToDTO(progress);
    }

    @Override
    public void calculateAndUpdateProgress(Long userId, String subject) {
        // This is a simplified implementation
        // In a real application, you would analyze exam results to determine weak/strong areas
        List<Result> results = resultRepository.findByUserId(userId);
        
        if (results.isEmpty()) {
            return;
        }
        
        int totalScore = 0;
        int examCount = 0;
        int bestScore = 0;
        
        for (Result result : results) {
            totalScore += result.getScore();
            examCount++;
            
            if (result.getScore() > bestScore) {
                bestScore = result.getScore();
            }
        }
        
        int averageScore = totalScore / examCount;
        
        // Placeholder for weak/strong areas analysis
        List<String> weakAreas = new ArrayList<>();
        List<String> strongAreas = new ArrayList<>();
        
        // Create or update progress
        Optional<Progress> existingProgress = progressRepository.findByUserIdAndSubject(userId, subject);
        Progress progress;
        
        if (existingProgress.isPresent()) {
            progress = existingProgress.get();
            progress.setAverageScore(averageScore);
            progress.setExamsTaken(examCount);
            progress.setBestScore(bestScore);
        } else {
            progress = new Progress();
            progress.setUserId(userId);
            progress.setSubject(subject);
            progress.setAverageScore(averageScore);
            progress.setExamsTaken(examCount);
            progress.setBestScore(bestScore);
        }
        
        try {
            progress.setWeakAreas(objectMapper.writeValueAsString(weakAreas));
            progress.setStrongAreas(objectMapper.writeValueAsString(strongAreas));
        } catch (JsonProcessingException e) {
            progress.setWeakAreas("[]");
            progress.setStrongAreas("[]");
        }
        
        progressRepository.save(progress);
    }

    // Helper method to map Entity to DTO
    private ProgressDTO mapToDTO(Progress progress) {
        ProgressDTO progressDTO = new ProgressDTO();
        progressDTO.setId(progress.getId());
        progressDTO.setUserId(progress.getUserId());
        progressDTO.setSubject(progress.getSubject());
        progressDTO.setAverageScore(progress.getAverageScore());
        progressDTO.setExamsTaken(progress.getExamsTaken());
        progressDTO.setBestScore(progress.getBestScore());
        
        try {
            if (progress.getWeakAreas() != null) {
                progressDTO.setWeakAreas(objectMapper.readValue(progress.getWeakAreas(), List.class));
            } else {
                progressDTO.setWeakAreas(Collections.emptyList());
            }
            
            if (progress.getStrongAreas() != null) {
                progressDTO.setStrongAreas(objectMapper.readValue(progress.getStrongAreas(), List.class));
            } else {
                progressDTO.setStrongAreas(Collections.emptyList());
            }
        } catch (JsonProcessingException e) {
            progressDTO.setWeakAreas(Collections.emptyList());
            progressDTO.setStrongAreas(Collections.emptyList());
        }
        
        if (progress.getLastUpdated() != null) {
            progressDTO.setLastUpdated(progress.getLastUpdated().toString());
        }
        
        return progressDTO;
    }

    // Helper method to map DTO to Entity
    private Progress mapToEntity(ProgressDTO progressDTO) {
        Progress progress = new Progress();
        progress.setUserId(progressDTO.getUserId());
        progress.setSubject(progressDTO.getSubject());
        progress.setAverageScore(progressDTO.getAverageScore());
        progress.setExamsTaken(progressDTO.getExamsTaken());
        progress.setBestScore(progressDTO.getBestScore());
        
        try {
            if (progressDTO.getWeakAreas() != null) {
                progress.setWeakAreas(objectMapper.writeValueAsString(progressDTO.getWeakAreas()));
            } else {
                progress.setWeakAreas("[]");
            }
            
            if (progressDTO.getStrongAreas() != null) {
                progress.setStrongAreas(objectMapper.writeValueAsString(progressDTO.getStrongAreas()));
            } else {
                progress.setStrongAreas("[]");
            }
        } catch (JsonProcessingException e) {
            progress.setWeakAreas("[]");
            progress.setStrongAreas("[]");
        }
        
        return progress;
    }
}
