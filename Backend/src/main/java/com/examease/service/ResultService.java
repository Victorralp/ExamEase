package com.examease.service;

import com.examease.dto.ResultDTO;

import java.util.List;

public interface ResultService {
    ResultDTO createResult(ResultDTO resultDTO);
    ResultDTO updateResult(Long id, ResultDTO resultDTO);
    List<ResultDTO> getAllResults();
    ResultDTO getResultById(Long id);
    void deleteResult(Long id);
    List<ResultDTO> getResultsByUserId(Long userId);
    List<ResultDTO> getResultsByExamId(Long examId);
    List<ResultDTO> getResultsByUserIdAndExamId(Long userId, Long examId);
    Double getAverageScoreByExamId(Long examId);
    Long getPassingCountByExamId(Long examId, Integer passingScore);
}
