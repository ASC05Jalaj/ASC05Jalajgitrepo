package com.example.travelmanagementsystem.service;

import com.example.travelmanagementsystem.Entity.CabsEntity;
import com.example.travelmanagementsystem.repository.CabsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CabsService {

    @Autowired
    private CabsRepository cabsRepository;

    private static int counter = 1;  // Static counter to keep track of the ID generation

    // Create a new cab with custom ID
    public CabsEntity createCab(CabsEntity cab) {
        // Generate a custom ID with format C + counter (e.g., C0001, C0002, etc.)
        String customId = "C" + String.format("%04d", counter++);
        cab.setId(customId);  // Set the generated ID

        return cabsRepository.save(cab);
    }

    // Get all cabs
    public List<CabsEntity> getAllCabs() {
        return cabsRepository.findAll();
    }

    // Get cab by ID
    public Optional<CabsEntity> getCabById(String id) {
        return cabsRepository.findById(id);
    }

    // Update an existing cab
    public CabsEntity updateCab(CabsEntity cab) {
        // Check if the cab exists in the repository
        if (cabsRepository.existsById(cab.getId())) {
            // Update and return the saved cab entity
            return cabsRepository.save(cab);
        } else {
            return null; // Return null if the cab doesn't exist
        }
    }

    // Delete a cab
    public void deleteCab(String id) {
        if (cabsRepository.existsById(id)) {
            cabsRepository.deleteById(id);
        }
    }
}
