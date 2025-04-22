package com.examease.service.impl;

import com.examease.dto.QuestionDTO;
import com.examease.entity.Question;
import com.examease.exception.ResourceNotFoundException;
import com.examease.repository.QuestionRepository;
import com.examease.service.QuestionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public QuestionServiceImpl(QuestionRepository questionRepository, ObjectMapper objectMapper) {
        this.questionRepository = questionRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public QuestionDTO createQuestion(QuestionDTO questionDTO) {
        Question question = mapToEntity(questionDTO);
        Question savedQuestion = questionRepository.save(question);
        return mapToDTO(savedQuestion);
    }

    @Override
    public QuestionDTO updateQuestion(Long id, QuestionDTO questionDTO) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question", "id", id));
        
        question.setQuestion(questionDTO.getQuestion());
        question.setQuestionType(questionDTO.getQuestionType());
        question.setSubject(questionDTO.getSubject());
        question.setTopic(questionDTO.getTopic());
        question.setDifficulty(questionDTO.getDifficulty());
        
        try {
            if (questionDTO.getOptions() != null) {
                question.setOptions(objectMapper.writeValueAsString(questionDTO.getOptions()));
            }
            
            if (questionDTO.getCorrectAnswer() != null) {
                question.setCorrectAnswer(objectMapper.writeValueAsString(questionDTO.getCorrectAnswer()));
            }
            
            if (questionDTO.getTags() != null) {
                question.setTags(objectMapper.writeValueAsString(questionDTO.getTags()));
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing JSON data", e);
        }
        
        question.setExplanation(questionDTO.getExplanation());
        
        Question updatedQuestion = questionRepository.save(question);
        return mapToDTO(updatedQuestion);
    }

    @Override
    public List<QuestionDTO> getAllQuestions() {
        List<Question> questions = questionRepository.findAll();
        return questions.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public QuestionDTO getQuestionById(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question", "id", id));
        return mapToDTO(question);
    }

    @Override
    public void deleteQuestion(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question", "id", id));
        questionRepository.delete(question);
    }

    @Override
    public List<QuestionDTO> getQuestionsBySubject(String subject) {
        List<Question> questions = questionRepository.findBySubject(subject);
        return questions.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<QuestionDTO> getQuestionsByType(String type) {
        List<Question> questions = questionRepository.findByQuestionType(type);
        return questions.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<QuestionDTO> getQuestionsByDifficulty(String difficulty) {
        List<Question> questions = questionRepository.findByDifficulty(difficulty);
        return questions.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<QuestionDTO> getQuestionsByCreatedBy(Long userId) {
        List<Question> questions = questionRepository.findByCreatedBy(userId);
        return questions.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<QuestionDTO> getQuestionsByIds(List<Long> ids) {
        List<Question> questions = questionRepository.findAllById(ids);
        return questions.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Helper method to map Entity to DTO
    private QuestionDTO mapToDTO(Question question) {
        QuestionDTO questionDTO = new QuestionDTO();
        questionDTO.setId(question.getId());
        questionDTO.setQuestion(question.getQuestion());
        questionDTO.setQuestionType(question.getQuestionType());
        questionDTO.setSubject(question.getSubject());
        questionDTO.setTopic(question.getTopic());
        questionDTO.setDifficulty(question.getDifficulty());
        questionDTO.setExplanation(question.getExplanation());
        questionDTO.setCreatedBy(question.getCreatedBy());
        questionDTO.setCreatedAt(question.getCreatedAt().toString());
        
        try {
            if (question.getOptions() != null) {
                questionDTO.setOptions(objectMapper.readValue(question.getOptions(), List.class));
            }
            
            if (question.getCorrectAnswer() != null) {
                if (question.getQuestionType().equals("multiple_select")) {
                    questionDTO.setCorrectAnswer(objectMapper.readValue(question.getCorrectAnswer(), List.class));
                } else {
                    questionDTO.setCorrectAnswer(objectMapper.readValue(question.getCorrectAnswer(), Object.class));
                }
            }
            
            if (question.getTags() != null) {
                questionDTO.setTags(objectMapper.readValue(question.getTags(), List.class));
            } else {
                questionDTO.setTags(Collections.emptyList());
            }
        } catch (JsonProcessingException e) {
            questionDTO.setOptions(Collections.emptyList());
            questionDTO.setCorrectAnswer("");
            questionDTO.setTags(Collections.emptyList());
        }
        
        return questionDTO;
    }

    // Helper method to map DTO to Entity
    private Question mapToEntity(QuestionDTO questionDTO) {
        Question question = new Question();
        question.setQuestion(questionDTO.getQuestion());
        question.setQuestionType(questionDTO.getQuestionType());
        question.setSubject(questionDTO.getSubject());
        question.setTopic(questionDTO.getTopic());
        question.setDifficulty(questionDTO.getDifficulty());
        question.setExplanation(questionDTO.getExplanation());
        question.setCreatedBy(questionDTO.getCreatedBy());
        
        try {
            if (questionDTO.getOptions() != null) {
                question.setOptions(objectMapper.writeValueAsString(questionDTO.getOptions()));
            }
            
            if (questionDTO.getCorrectAnswer() != null) {
                question.setCorrectAnswer(objectMapper.writeValueAsString(questionDTO.getCorrectAnswer()));
            }
            
            if (questionDTO.getTags() != null) {
                question.setTags(objectMapper.writeValueAsString(questionDTO.getTags()));
            } else {
                question.setTags("[]");
            }
        } catch (JsonProcessingException e) {
            question.setOptions("[]");
            question.setCorrectAnswer("\"\"");
            question.setTags("[]");
        }
        
        return question;
    }
}
