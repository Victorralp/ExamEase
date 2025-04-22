package com.examease.service.impl;

import com.examease.dto.ExamDTO;
import com.examease.entity.Exam;
import com.examease.exception.ResourceNotFoundException;
import com.examease.repository.ExamRepository;
import com.examease.service.ExamService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExamServiceImpl implements ExamService {

    private final ExamRepository examRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public ExamServiceImpl(ExamRepository examRepository, ObjectMapper objectMapper) {
        this.examRepository = examRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public ExamDTO createExam(ExamDTO examDTO) {
        Exam exam = mapToEntity(examDTO);
        Exam savedExam = examRepository.save(exam);
        return mapToDTO(savedExam);
    }

    @Override
    public ExamDTO updateExam(Long id, ExamDTO examDTO) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", "id", id));
        
        exam.setName(examDTO.getName());
        exam.setSubject(examDTO.getSubject());
        exam.setDescription(examDTO.getDescription());
        exam.setDuration(examDTO.getDuration());
        exam.setStartDate(LocalDateTime.parse(examDTO.getStartDate()));
        
        if (examDTO.getEndDate() != null) {
            exam.setEndDate(LocalDateTime.parse(examDTO.getEndDate()));
        }
        
        exam.setStatus(examDTO.getStatus());
        exam.setPassingScore(examDTO.getPassingScore());
        
        try {
            if (examDTO.getQuestionIds() != null) {
                exam.setQuestionIds(objectMapper.writeValueAsString(examDTO.getQuestionIds()));
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing question IDs", e);
        }
        
        Exam updatedExam = examRepository.save(exam);
        return mapToDTO(updatedExam);
    }

    @Override
    public List<ExamDTO> getAllExams() {
        List<Exam> exams = examRepository.findAll();
        return exams.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public ExamDTO getExamById(Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", "id", id));
        return mapToDTO(exam);
    }

    @Override
    public void deleteExam(Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam", "id", id));
        examRepository.delete(exam);
    }

    @Override
    public List<ExamDTO> getExamsByCreatedBy(Long userId) {
        List<Exam> exams = examRepository.findByCreatedBy(userId);
        return exams.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<ExamDTO> getActiveExams() {
        List<Exam> exams = examRepository.findByStatus("active");
        return exams.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<ExamDTO> getExamsBySubject(String subject) {
        List<Exam> exams = examRepository.findBySubject(subject);
        return exams.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<ExamDTO> getUpcomingExams() {
        LocalDateTime now = LocalDateTime.now();
        List<Exam> exams = examRepository.findByStartDateAfter(now);
        return exams.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Helper method to map Entity to DTO
    private ExamDTO mapToDTO(Exam exam) {
        ExamDTO examDTO = new ExamDTO();
        examDTO.setId(exam.getId());
        examDTO.setName(exam.getName());
        examDTO.setSubject(exam.getSubject());
        examDTO.setDescription(exam.getDescription());
        examDTO.setDuration(exam.getDuration());
        examDTO.setStartDate(exam.getStartDate().toString());
        
        if (exam.getEndDate() != null) {
            examDTO.setEndDate(exam.getEndDate().toString());
        }
        
        examDTO.setStatus(exam.getStatus());
        examDTO.setPassingScore(exam.getPassingScore());
        examDTO.setCreatedBy(exam.getCreatedBy());
        examDTO.setCreatedAt(exam.getCreatedAt().toString());
        
        try {
            if (exam.getQuestionIds() != null) {
                examDTO.setQuestionIds(objectMapper.readValue(exam.getQuestionIds(), List.class));
            } else {
                examDTO.setQuestionIds(Collections.emptyList());
            }
        } catch (JsonProcessingException e) {
            examDTO.setQuestionIds(Collections.emptyList());
        }
        
        return examDTO;
    }

    // Helper method to map DTO to Entity
    private Exam mapToEntity(ExamDTO examDTO) {
        Exam exam = new Exam();
        exam.setName(examDTO.getName());
        exam.setSubject(examDTO.getSubject());
        exam.setDescription(examDTO.getDescription());
        exam.setDuration(examDTO.getDuration());
        exam.setStartDate(LocalDateTime.parse(examDTO.getStartDate()));
        
        if (examDTO.getEndDate() != null) {
            exam.setEndDate(LocalDateTime.parse(examDTO.getEndDate()));
        }
        
        exam.setStatus(examDTO.getStatus());
        exam.setPassingScore(examDTO.getPassingScore());
        exam.setCreatedBy(examDTO.getCreatedBy());
        
        try {
            if (examDTO.getQuestionIds() != null) {
                exam.setQuestionIds(objectMapper.writeValueAsString(examDTO.getQuestionIds()));
            } else {
                exam.setQuestionIds("[]");
            }
        } catch (JsonProcessingException e) {
            exam.setQuestionIds("[]");
        }
        
        return exam;
    }
}
