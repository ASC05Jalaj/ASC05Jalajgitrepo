package com.example.travelmanagementsystem.service;

import com.example.travelmanagementsystem.Entity.PaymentEntity;
import com.example.travelmanagementsystem.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    private static int counter = 1;  // Static counter to keep track of the ID generation

    // Create a new payment with custom ID
    public PaymentEntity createPayment(PaymentEntity payment) {
        String customId = "P" + String.format("%04d", counter++);  // Generate ID with prefix "P"
        payment.setId(customId);
        return paymentRepository.save(payment);
    }

    // Get all payments
    public List<PaymentEntity> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Get payment by ID
    public Optional<PaymentEntity> getPaymentById(String id) {
        return paymentRepository.findById(id);
    }

    // Update an existing payment
    public PaymentEntity updatePayment(PaymentEntity payment) {
        if (paymentRepository.existsById(payment.getId())) {
            return paymentRepository.save(payment);
        } else {
            return null;
        }
    }

    // Delete a payment
    public void deletePayment(String id) {
        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
        }
    }
}
