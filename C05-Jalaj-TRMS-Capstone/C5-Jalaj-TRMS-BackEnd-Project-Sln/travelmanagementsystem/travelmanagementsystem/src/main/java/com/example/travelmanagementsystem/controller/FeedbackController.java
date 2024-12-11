package com.example.travelmanagementsystem.controller;

import com.example.travelmanagementsystem.Entity.FeedbackEntity;
import com.example.travelmanagementsystem.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Create a new feedback
    @PostMapping
    public ResponseEntity<FeedbackEntity> createFeedback(@RequestBody FeedbackEntity feedback) {
        FeedbackEntity createdFeedback = feedbackService.createFeedback(feedback);
        return new ResponseEntity<>(createdFeedback, HttpStatus.CREATED);
    }

    // Get all feedbacks
    @GetMapping
    public ResponseEntity<List<FeedbackEntity>> getAllFeedbacks() {
        List<FeedbackEntity> feedbacks = feedbackService.getAllFeedbacks();
        return new ResponseEntity<>(feedbacks, HttpStatus.OK);
    }

    // Get feedback by ID
    @GetMapping("/{id}")
    public ResponseEntity<FeedbackEntity> getFeedbackById(@PathVariable("id") String id) {
        Optional<FeedbackEntity> feedback = feedbackService.getFeedbackById(id);
        if (feedback.isPresent()) {
            return new ResponseEntity<>(feedback.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update feedback
    @PutMapping("/{id}")
    public ResponseEntity<FeedbackEntity> updateFeedback(@PathVariable("id") String id, @RequestBody FeedbackEntity feedback) {
        Optional<FeedbackEntity> existingFeedback = feedbackService.getFeedbackById(id);
        if (existingFeedback.isPresent()) {
            feedback.setId(id);  // Retain the existing ID
            FeedbackEntity updatedFeedback = feedbackService.updateFeedback(feedback);
            return new ResponseEntity<>(updatedFeedback, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete feedback
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable("id") String id) {
        Optional<FeedbackEntity> feedback = feedbackService.getFeedbackById(id);
        if (feedback.isPresent()) {
            feedbackService.deleteFeedback(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
