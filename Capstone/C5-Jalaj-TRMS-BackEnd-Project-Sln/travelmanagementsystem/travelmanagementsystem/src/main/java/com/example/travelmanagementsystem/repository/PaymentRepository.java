package com.example.travelmanagementsystem.repository;

import com.example.travelmanagementsystem.Entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, String> {
    // Custom query methods can be added here if needed
}
