package com.example.travelmanagementsystem.controller;

import com.example.travelmanagementsystem.Entity.TBookEntity;
import com.example.travelmanagementsystem.service.TBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class TBookController {

    @Autowired
    private TBookService tBookService;

    // Create a new booking
    @PostMapping
    public ResponseEntity<TBookEntity> createBooking(@RequestBody TBookEntity booking) {
        TBookEntity createdBooking = tBookService.createBooking(booking);
        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }

    // Get all bookings
    @GetMapping
    public ResponseEntity<List<TBookEntity>> getAllBookings() {
        List<TBookEntity> bookings = tBookService.getAllBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    // Get booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<TBookEntity> getBookingById(@PathVariable("id") String id) {
        Optional<TBookEntity> booking = tBookService.getBookingById(id);
        if (booking.isPresent()) {
            return new ResponseEntity<>(booking.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update a booking
    @PutMapping("/{id}")
    public ResponseEntity<TBookEntity> updateBooking(@PathVariable("id") String id, @RequestBody TBookEntity booking) {
        Optional<TBookEntity> existingBooking = tBookService.getBookingById(id);
        if (existingBooking.isPresent()) {
            booking.setId(id); // Retain the existing ID
            TBookEntity updatedBooking = tBookService.updateBooking(booking);
            return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a booking
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable("id") String id) {
        Optional<TBookEntity> booking = tBookService.getBookingById(id);
        if (booking.isPresent()) {
            tBookService.deleteBooking(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
