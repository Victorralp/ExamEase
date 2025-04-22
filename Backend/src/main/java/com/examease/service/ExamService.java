package com.examease.service;

import com.examease.dto.ExamDTO;

import java.util.List;

public interface ExamService {
    ExamDTO createExam(ExamDTO examDTO);
    ExamDTO updateExam(Long id, ExamDTO examDTO);
    List<ExamDTO> getAllExams();
    ExamDTO getExamById(Long id);
    void deleteExam(Long id);
    List<ExamDTO> getExamsByCreatedBy(Long userId);
    List<ExamDTO> getActiveExams();
    List<ExamDTO> getExamsBySubject(String subject);
    List<ExamDTO> getUpcomingExams();
}
