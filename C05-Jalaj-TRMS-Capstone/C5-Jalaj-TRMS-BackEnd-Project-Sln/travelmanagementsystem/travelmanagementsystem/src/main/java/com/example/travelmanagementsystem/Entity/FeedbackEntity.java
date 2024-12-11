package com.example.travelmanagementsystem.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "FEEDBACK")
public class FeedbackEntity {

    @Id
    @Column(name = "ID", nullable = false)
    private String id;

    @Column(name = "RATING", nullable = false)
    private String rating;

    @Column(name = "REVIEW", nullable = false)
    private String review;

    @ManyToOne
    @JoinColumn(name = "BOOKID", referencedColumnName = "ID", nullable = false)
    private TBookEntity booking;

    // Constructors, getters, and setters
    public FeedbackEntity() {}

    public FeedbackEntity(String id, String rating, String review, TBookEntity booking) {
        this.id = id;
        this.rating = rating;
        this.review = review;
        this.booking = booking;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public TBookEntity getBooking() {
        return booking;
    }

    public void setBooking(TBookEntity booking) {
        this.booking = booking;
    }
}
