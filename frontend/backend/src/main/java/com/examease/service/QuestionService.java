package com.examease.service;

import com.examease.exception.ResourceNotFoundException;
import com.examease.model.Question;
import com.examease.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {
    
    private final QuestionRepository questionRepository;
    
    public List<Question> findAll() {
        return questionRepository.findAll();
    }
    
    public Question findById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + id));
    }
    
    public List<Question> findByCreatedBy(Long userId) {
        return questionRepository.findByCreatedBy(userId);
    }
    
    public List<Question> findBySubject(String subject) {
        return questionRepository.findBySubject(subject);
    }
    
    public List<Question> findByQuestionType(String questionType) {
        return questionRepository.findByQuestionType(questionType);
    }
    
    public List<Question> findByDifficulty(String difficulty) {
        return questionRepository.findByDifficulty(difficulty);
    }
    
    public List<Question> findBySubjectAndDifficulty(String subject, String difficulty) {
        return questionRepository.findBySubjectAndDifficulty(subject, difficulty);
    }
    
    @Transactional
    public Question createQuestion(Question question) {
        if (question.getCreatedAt() == null) {
            question.setCreatedAt(LocalDateTime.now());
        }
        return questionRepository.save(question);
    }
    
    @Transactional
    public Question updateQuestion(Long id, Question questionDetails) {
        Question question = findById(id);
        
        question.setQuestion(questionDetails.getQuestion());
        question.setQuestionType(questionDetails.getQuestionType());
        question.setSubject(questionDetails.getSubject());
        question.setTopic(questionDetails.getTopic());
        question.setDifficulty(questionDetails.getDifficulty());
        question.setOptions(questionDetails.getOptions());
        question.setCorrectAnswer(questionDetails.getCorrectAnswer());
        question.setExplanation(questionDetails.getExplanation());
        question.setTags(questionDetails.getTags());
        
        return questionRepository.save(question);
    }
    
    @Transactional
    public void deleteQuestion(Long id) {
        Question question = findById(id);
        questionRepository.delete(question);
    }
}