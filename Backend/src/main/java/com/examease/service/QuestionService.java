package com.examease.service;

import com.examease.dto.QuestionDTO;

import java.util.List;

public interface QuestionService {
    QuestionDTO createQuestion(QuestionDTO questionDTO);
    QuestionDTO updateQuestion(Long id, QuestionDTO questionDTO);
    List<QuestionDTO> getAllQuestions();
    QuestionDTO getQuestionById(Long id);
    void deleteQuestion(Long id);
    List<QuestionDTO> getQuestionsBySubject(String subject);
    List<QuestionDTO> getQuestionsByType(String type);
    List<QuestionDTO> getQuestionsByDifficulty(String difficulty);
    List<QuestionDTO> getQuestionsByCreatedBy(Long userId);
    List<QuestionDTO> getQuestionsByIds(List<Long> ids);
}
