package com.examease.repository;

import com.examease.entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByCreatedBy(Long createdBy);
    List<Exam> findByStatus(String status);
    List<Exam> findBySubject(String subject);
    List<Exam> findByStartDateAfter(LocalDateTime date);
    List<Exam> findByStartDateBeforeAndEndDateAfter(LocalDateTime now, LocalDateTime now2);
}
