package com.example.travelmanagementsystem.service;

import com.example.travelmanagementsystem.Entity.TBookEntity;
import com.example.travelmanagementsystem.repository.TBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TBookService {

    @Autowired
    private TBookRepository tBookRepository;

    private static int counter = 1;  // Static counter to keep track of the ID generation

    // Create a new booking with custom ID
    public TBookEntity createBooking(TBookEntity booking) {
        String customId = "B" + String.format("%04d", counter++);  // Generate ID with prefix "B"
        booking.setId(customId);
        return tBookRepository.save(booking);
    }

    // Get all bookings
    public List<TBookEntity> getAllBookings() {
        return tBookRepository.findAll();
    }

    // Get booking by ID
    public Optional<TBookEntity> getBookingById(String id) {
        return tBookRepository.findById(id);
    }

    // Update an existing booking
    public TBookEntity updateBooking(TBookEntity booking) {
        if (tBookRepository.existsById(booking.getId())) {
            return tBookRepository.save(booking);
        } else {
            return null;
        }
    }

    // Delete a booking
    public void deleteBooking(String id) {
        if (tBookRepository.existsById(id)) {
            tBookRepository.deleteById(id);
        }
    }
}
