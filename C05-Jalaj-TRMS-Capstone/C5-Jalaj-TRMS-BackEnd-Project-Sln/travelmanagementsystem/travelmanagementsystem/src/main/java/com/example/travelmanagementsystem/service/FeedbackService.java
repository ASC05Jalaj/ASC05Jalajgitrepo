package com.example.travelmanagementsystem.service;

import com.example.travelmanagementsystem.Entity.FeedbackEntity;
import com.example.travelmanagementsystem.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    private static int counter = 1;  // Static counter to keep track of the ID generation

    // Create a new feedback with a custom ID
    public FeedbackEntity createFeedback(FeedbackEntity feedback) {
        String customId = "F" + String.format("%04d", counter++);  // Generate ID with prefix "F"
        feedback.setId(customId);
        return feedbackRepository.save(feedback);
    }

    // Get all feedbacks
    public List<FeedbackEntity> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    // Get feedback by ID
    public Optional<FeedbackEntity> getFeedbackById(String id) {
        return feedbackRepository.findById(id);
    }

    // Update an existing feedback
    public FeedbackEntity updateFeedback(FeedbackEntity feedback) {
        if (feedbackRepository.existsById(feedback.getId())) {
            return feedbackRepository.save(feedback);
        } else {
            return null;
        }
    }

    // Delete a feedback
    public void deleteFeedback(String id) {
        if (feedbackRepository.existsById(id)) {
            feedbackRepository.deleteById(id);
        }
    }
}
