package com.example.travelmanagementsystem.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "CABS")
public class CabsEntity {

    @Id
    @Column(name = "ID", nullable = false, length = 225)
    private String id;

    @Column(name = "MODEL", nullable = false, length = 225)
    private String model;

    @Column(name = "VNUMBER", nullable = false, length = 225, unique = true)
    private String vNumber;

    @Column(name = "DRIVER", nullable = false, length = 225)
    private String driver;

    @Column(name = "SEATS", nullable = false)
    private int seats;

    // Constructor
    public CabsEntity() {
    }

    public CabsEntity(String id, String model, String vNumber, String driver, int seats) {
        this.id = id;
        this.model = model;
        this.vNumber = vNumber;
        this.driver = driver;
        this.seats = seats;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getvNumber() {
        return vNumber;
    }

    public void setvNumber(String vNumber) {
        this.vNumber = vNumber;
    }

    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public int getSeats() {
        return seats;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }
}
