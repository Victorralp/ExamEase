package com.examease.service;

import com.examease.exception.ResourceNotFoundException;
import com.examease.model.Exam;
import com.examease.repository.ExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamService {
    
    private final ExamRepository examRepository;
    
    public List<Exam> findAll() {
        return examRepository.findAll();
    }
    
    public Exam findById(Long id) {
        return examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam not found with id: " + id));
    }
    
    public List<Exam> findByCreatedBy(Long userId) {
        return examRepository.findByCreatedBy(userId);
    }
    
    public List<Exam> findByStatus(String status) {
        return examRepository.findByStatus(status);
    }
    
    public List<Exam> findBySubject(String subject) {
        return examRepository.findBySubject(subject);
    }
    
    @Transactional
    public Exam createExam(Exam exam) {
        if (exam.getCreatedAt() == null) {
            exam.setCreatedAt(LocalDateTime.now());
        }
        return examRepository.save(exam);
    }
    
    @Transactional
    public Exam updateExam(Long id, Exam examDetails) {
        Exam exam = findById(id);
        
        exam.setName(examDetails.getName());
        exam.setSubject(examDetails.getSubject());
        exam.setDescription(examDetails.getDescription());
        exam.setDuration(examDetails.getDuration());
        exam.setStartDate(examDetails.getStartDate());
        exam.setEndDate(examDetails.getEndDate());
        exam.setStatus(examDetails.getStatus());
        exam.setPassingScore(examDetails.getPassingScore());
        exam.setQuestionIds(examDetails.getQuestionIds());
        
        return examRepository.save(exam);
    }
    
    @Transactional
    public void deleteExam(Long id) {
        Exam exam = findById(id);
        examRepository.delete(exam);
    }
    
    @Transactional
    public Exam updateExamStatus(Long id, String status) {
        Exam exam = findById(id);
        exam.setStatus(status);
        return examRepository.save(exam);
    }
}