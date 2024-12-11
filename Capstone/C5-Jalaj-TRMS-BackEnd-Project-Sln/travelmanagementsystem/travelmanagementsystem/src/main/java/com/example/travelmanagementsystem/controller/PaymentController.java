package com.example.travelmanagementsystem.controller;

import com.example.travelmanagementsystem.Entity.PaymentEntity;
import com.example.travelmanagementsystem.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Create a new payment
    @PostMapping
    public ResponseEntity<PaymentEntity> createPayment(@RequestBody PaymentEntity payment) {
        PaymentEntity createdPayment = paymentService.createPayment(payment);
        return new ResponseEntity<>(createdPayment, HttpStatus.CREATED);
    }

    // Get all payments
    @GetMapping
    public ResponseEntity<List<PaymentEntity>> getAllPayments() {
        List<PaymentEntity> payments = paymentService.getAllPayments();
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }

    // Get payment by ID
    @GetMapping("/{id}")
    public ResponseEntity<PaymentEntity> getPaymentById(@PathVariable("id") String id) {
        Optional<PaymentEntity> payment = paymentService.getPaymentById(id);
        if (payment.isPresent()) {
            return new ResponseEntity<>(payment.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update a payment
    @PutMapping("/{id}")
    public ResponseEntity<PaymentEntity> updatePayment(@PathVariable("id") String id, @RequestBody PaymentEntity payment) {
        Optional<PaymentEntity> existingPayment = paymentService.getPaymentById(id);
        if (existingPayment.isPresent()) {
            payment.setId(id); // Retain the existing ID
            PaymentEntity updatedPayment = paymentService.updatePayment(payment);
            return new ResponseEntity<>(updatedPayment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a payment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable("id") String id) {
        Optional<PaymentEntity> payment = paymentService.getPaymentById(id);
        if (payment.isPresent()) {
            paymentService.deletePayment(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
