package com.example.travelmanagementsystem.controller;

import com.example.travelmanagementsystem.Entity.admin_entity;
import com.example.travelmanagementsystem.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Create new admin
    @PostMapping
    public ResponseEntity<admin_entity> createAdmin(@RequestBody admin_entity admin) {
        admin_entity createdAdmin = adminService.createAdmin(admin);
        return new ResponseEntity<>(createdAdmin, HttpStatus.CREATED);
    }

    // Get all admins
    @GetMapping
    public ResponseEntity<List<admin_entity>> getAllAdmins() {
        List<admin_entity> admins = adminService.getAllAdmins();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    // Get admin by ID
    @GetMapping("/{id}")
    public ResponseEntity<admin_entity> getAdminById(@PathVariable("id") String id) {
        Optional<admin_entity> admin = adminService.getAdminById(id);
        if (admin.isPresent()) {
            return new ResponseEntity<>(admin.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update admin
    @PutMapping("/{id}")
    public ResponseEntity<admin_entity> updateAdmin(@PathVariable("id") String id, @RequestBody admin_entity admin) {
        Optional<admin_entity> existingAdmin = adminService.getAdminById(id);
        if (existingAdmin.isPresent()) {
            // Set the existing ID (do not change it)
            admin.setId(id);

            // Update the admin using the service
            admin_entity updatedAdmin = adminService.updateAdmin(admin);
            return new ResponseEntity<>(updatedAdmin, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete admin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable("id") String id) {
        Optional<admin_entity> admin = adminService.getAdminById(id);
        if (admin.isPresent()) {
            adminService.deleteAdmin(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
