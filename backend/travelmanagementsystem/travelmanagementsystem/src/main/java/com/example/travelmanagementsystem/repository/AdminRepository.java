package com.example.travelmanagementsystem.repository;

import com.example.travelmanagementsystem.Entity.admin_entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<admin_entity, String> {
    // Custom query methods can be added here if needed
}

