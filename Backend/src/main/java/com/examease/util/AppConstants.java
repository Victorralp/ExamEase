package com.examease.util;

public class AppConstants {
    // Role constants
    public static final String ROLE_ADMIN = "ADMIN";
    public static final String ROLE_STUDENT = "STUDENT";
    
    // Status constants
    public static final String STATUS_DRAFT = "draft";
    public static final String STATUS_SCHEDULED = "scheduled";
    public static final String STATUS_ACTIVE = "active";
    public static final String STATUS_COMPLETED = "completed";
    public static final String STATUS_CANCELLED = "cancelled";
    
    // Question type constants
    public static final String QUESTION_TYPE_MULTIPLE_CHOICE = "multiple_choice";
    public static final String QUESTION_TYPE_TRUE_FALSE = "true_false";
    public static final String QUESTION_TYPE_SHORT_ANSWER = "short_answer";
    public static final String QUESTION_TYPE_MULTIPLE_SELECT = "multiple_select";
    
    // Difficulty level constants
    public static final String DIFFICULTY_EASY = "easy";
    public static final String DIFFICULTY_MEDIUM = "medium";
    public static final String DIFFICULTY_HARD = "hard";
    
    // Result status constants
    public static final String RESULT_STATUS_COMPLETED = "completed";
    public static final String RESULT_STATUS_FAILED = "failed";
    public static final String RESULT_STATUS_PASSED = "passed";
    
    // Default values
    public static final int DEFAULT_PAGE_NUMBER = 0;
    public static final int DEFAULT_PAGE_SIZE = 10;
    public static final String DEFAULT_SORT_BY = "id";
    public static final String DEFAULT_SORT_DIRECTION = "asc";
}
