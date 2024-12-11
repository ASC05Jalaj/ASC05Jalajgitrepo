package com.example.travelmanagementsystem.service;

import com.example.travelmanagementsystem.Entity.admin_entity;
import com.example.travelmanagementsystem.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    private static int counter = 1;  // Static counter to keep track of the ID generation

    // Create a new admin with custom ID
    public admin_entity createAdmin(admin_entity admin) {
        // Generate a custom ID with format CNNNN (C + counter with 4 digits)
        String customId = "A" + String.format("%04d", counter++);  // Increment the counter with each creation
        admin.setId(customId);  // Set the generated ID

        return adminRepository.save(admin);
    }

    // Get all admins
    public List<admin_entity> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Get admin by ID
    public Optional<admin_entity> getAdminById(String id) {
        return adminRepository.findById(id);
    }

    // Update an existing admin
    public admin_entity updateAdmin(admin_entity admin) {
        // Check if the admin exists in the repository
        if (adminRepository.existsById(admin.getId())) {
            // Update and return the saved admin entity
            return adminRepository.save(admin);
        } else {
            return null; // Return null if the admin doesn't exist
        }
    }

    // Delete an admin
    public void deleteAdmin(String id) {
        if (adminRepository.existsById(id)) {
            adminRepository.deleteById(id);
        }
    }
}
