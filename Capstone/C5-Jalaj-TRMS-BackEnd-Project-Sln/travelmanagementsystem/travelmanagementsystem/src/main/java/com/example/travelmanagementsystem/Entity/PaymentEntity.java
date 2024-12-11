package com.example.travelmanagementsystem.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "PAYMENT")
public class PaymentEntity {

    @Id
    @Column(name = "ID", nullable = false)
    private String id;

    @Column(name = "AMOUNT", nullable = false)
    private int amount;

    @Column(name = "MODE", nullable = false)
    private String mode;

    @ManyToOne
    @JoinColumn(name = "BOOKID", referencedColumnName = "ID", nullable = false)
    private TBookEntity booking;

    // Constructors, getters, and setters

    public PaymentEntity() {}

    public PaymentEntity(String id, int amount, String mode, TBookEntity booking) {
        this.id = id;
        this.amount = amount;
        this.mode = mode;
        this.booking = booking;
    }

    // Getters and setters for all fields

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public TBookEntity getBooking() {
        return booking;
    }

    public void setBooking(TBookEntity booking) {
        this.booking = booking;
    }
}
