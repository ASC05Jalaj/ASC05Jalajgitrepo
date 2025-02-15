package com.example.travelmanagementsystem.repository;

import com.example.travelmanagementsystem.Entity.CabsEntity;
import com.example.travelmanagementsystem.Entity.TBookEntity;
import com.example.travelmanagementsystem.Entity.admin_entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TBookRepository extends JpaRepository<TBookEntity, String> {
    // Custom query methods can be added here if needed
}

