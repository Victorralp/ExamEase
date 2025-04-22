package com.examease.repository;

import com.examease.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findBySubject(String subject);
    List<Question> findByQuestionType(String questionType);
    List<Question> findByDifficulty(String difficulty);
    List<Question> findByCreatedBy(Long createdBy);
    List<Question> findBySubjectAndDifficulty(String subject, String difficulty);
}
