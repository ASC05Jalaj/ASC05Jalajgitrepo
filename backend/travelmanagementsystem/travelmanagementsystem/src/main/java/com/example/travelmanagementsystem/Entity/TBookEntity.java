package com.example.travelmanagementsystem.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "TBOOK")
public class TBookEntity {

    @Id
    @Column(name = "ID", nullable = false)
    private String id;

    @Column(name = "PASSENGER", nullable = false)
    private String passenger;

    @Column(name = "PHONE_NUMBER", nullable = false, unique = true)
    private int phoneNumber;

    @Column(name = "PICKUP", nullable = false)
    private String pickup;

    @Column(name = "DESTINATION", nullable = false)
    private String destination;

    @Column(name = "STATUS", nullable = false)
    private String status;

    @Column(name = "B_DATE", nullable = false)
    private String bookingDate;

    @Column(name = "B_TIME", nullable = false)
    private String bookingTime;

    @Column(name = "MODEL", nullable = false)
    private String model;

    @ManyToOne
    @JoinColumn(name = "CABID", referencedColumnName = "ID", nullable = false)
    private CabsEntity cab;

    // Constructors, getters, and setters

    public TBookEntity() {}

    public TBookEntity(String id, String passenger, int phoneNumber, String pickup, String destination, String status, String bookingDate, String bookingTime, String model, CabsEntity cab) {
        this.id = id;
        this.passenger = passenger;
        this.phoneNumber = phoneNumber;
        this.pickup = pickup;
        this.destination = destination;
        this.status = status;
        this.bookingDate = bookingDate;
        this.bookingTime = bookingTime;
        this.model = model;
        this.cab = cab;
    }

    // Getters and setters for all fields

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassenger() {
        return passenger;
    }

    public void setPassenger(String passenger) {
        this.passenger = passenger;
    }

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPickup() {
        return pickup;
    }

    public void setPickup(String pickup) {
        this.pickup = pickup;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(String bookingTime) {
        this.bookingTime = bookingTime;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public CabsEntity getCab() {
        return cab;
    }

    public void setCab(CabsEntity cab) {
        this.cab = cab;
    }
}
