package com.examease.service;

import com.examease.dto.ProgressDTO;

import java.util.List;

public interface ProgressService {
    ProgressDTO updateProgress(ProgressDTO progressDTO);
    List<ProgressDTO> getAllProgress();
    ProgressDTO getProgressById(Long id);
    List<ProgressDTO> getProgressByUserId(Long userId);
    ProgressDTO getProgressByUserIdAndSubject(Long userId, String subject);
    void calculateAndUpdateProgress(Long userId, String subject);
}
