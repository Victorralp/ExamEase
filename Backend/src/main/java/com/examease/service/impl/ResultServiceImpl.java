package com.examease.service.impl;

import com.examease.dto.ResultDTO;
import com.examease.entity.Result;
import com.examease.exception.ResourceNotFoundException;
import com.examease.repository.ResultRepository;
import com.examease.service.ResultService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ResultServiceImpl implements ResultService {

    private final ResultRepository resultRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public ResultServiceImpl(ResultRepository resultRepository, ObjectMapper objectMapper) {
        this.resultRepository = resultRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public ResultDTO createResult(ResultDTO resultDTO) {
        Result result = mapToEntity(resultDTO);
        Result savedResult = resultRepository.save(result);
        return mapToDTO(savedResult);
    }

    @Override
    public ResultDTO updateResult(Long id, ResultDTO resultDTO) {
        Result result = resultRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Result", "id", id));
        
        result.setScore(resultDTO.getScore());
        result.setTimeSpent(resultDTO.getTimeSpent());
        result.setStatus(resultDTO.getStatus());
        
        try {
            if (resultDTO.getAnswers() != null) {
                result.setAnswers(objectMapper.writeValueAsString(resultDTO.getAnswers()));
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing answers", e);
        }
        
        Result updatedResult = resultRepository.save(result);
        return mapToDTO(updatedResult);
    }

    @Override
    public List<ResultDTO> getAllResults() {
        List<Result> results = resultRepository.findAll();
        return results.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public ResultDTO getResultById(Long id) {
        Result result = resultRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Result", "id", id));
        return mapToDTO(result);
    }

    @Override
    public void deleteResult(Long id) {
        Result result = resultRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Result", "id", id));
        resultRepository.delete(result);
    }

    @Override
    public List<ResultDTO> getResultsByUserId(Long userId) {
        List<Result> results = resultRepository.findByUserId(userId);
        return results.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<ResultDTO> getResultsByExamId(Long examId) {
        List<Result> results = resultRepository.findByExamId(examId);
        return results.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<ResultDTO> getResultsByUserIdAndExamId(Long userId, Long examId) {
        List<Result> results = resultRepository.findByUserIdAndExamId(userId, examId);
        return results.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public Double getAverageScoreByExamId(Long examId) {
        return resultRepository.getAverageScoreByExamId(examId);
    }

    @Override
    public Long getPassingCountByExamId(Long examId, Integer passingScore) {
        return resultRepository.countPassingScoresByExamId(examId, passingScore);
    }

    // Helper method to map Entity to DTO
    private ResultDTO mapToDTO(Result result) {
        ResultDTO resultDTO = new ResultDTO();
        resultDTO.setId(result.getId());
        resultDTO.setUserId(result.getUserId());
        resultDTO.setExamId(result.getExamId());
        resultDTO.setScore(result.getScore());
        resultDTO.setTimeSpent(result.getTimeSpent());
        resultDTO.setStatus(result.getStatus());
        resultDTO.setSubmittedAt(result.getSubmittedAt().toString());
        
        try {
            if (result.getAnswers() != null) {
                resultDTO.setAnswers(objectMapper.readValue(result.getAnswers(), Map.class));
            } else {
                resultDTO.setAnswers(new HashMap<>());
            }
        } catch (JsonProcessingException e) {
            resultDTO.setAnswers(new HashMap<>());
        }
        
        return resultDTO;
    }

    // Helper method to map DTO to Entity
    private Result mapToEntity(ResultDTO resultDTO) {
        Result result = new Result();
        result.setUserId(resultDTO.getUserId());
        result.setExamId(resultDTO.getExamId());
        result.setScore(resultDTO.getScore());
        result.setTimeSpent(resultDTO.getTimeSpent());
        result.setStatus(resultDTO.getStatus());
        
        try {
            if (resultDTO.getAnswers() != null) {
                result.setAnswers(objectMapper.writeValueAsString(resultDTO.getAnswers()));
            } else {
                result.setAnswers("{}");
            }
        } catch (JsonProcessingException e) {
            result.setAnswers("{}");
        }
        
        return result;
    }
}
