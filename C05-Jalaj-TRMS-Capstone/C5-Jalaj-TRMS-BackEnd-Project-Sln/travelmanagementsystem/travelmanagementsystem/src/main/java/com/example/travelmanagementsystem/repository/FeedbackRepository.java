package com.example.travelmanagementsystem.repository;

import com.example.travelmanagementsystem.Entity.FeedbackEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<FeedbackEntity, String> {
    // Custom query methods can be added if necessary
}
