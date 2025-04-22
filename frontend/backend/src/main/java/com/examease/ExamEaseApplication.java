package com.examease;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"com.examease.model"})
@EnableJpaRepositories(basePackages = {"com.examease.repository"})
public class ExamEaseApplication {
    public static void main(String[] args) {
        SpringApplication.run(ExamEaseApplication.class, args);
    }
}