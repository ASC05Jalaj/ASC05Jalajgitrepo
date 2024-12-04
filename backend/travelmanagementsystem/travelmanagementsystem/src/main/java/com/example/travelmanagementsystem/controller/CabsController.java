package com.example.travelmanagementsystem.controller;

import com.example.travelmanagementsystem.Entity.CabsEntity;
import com.example.travelmanagementsystem.service.CabsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cabs")
public class CabsController {

    @Autowired
    private CabsService cabsService;

    // Create new cab
    @PostMapping
    public ResponseEntity<CabsEntity> createCab(@RequestBody CabsEntity cab) {
        CabsEntity createdCab = cabsService.createCab(cab);
        return new ResponseEntity<>(createdCab, HttpStatus.CREATED);
    }

    // Get all cabs
    @GetMapping
    public ResponseEntity<List<CabsEntity>> getAllCabs() {
        List<CabsEntity> cabs = cabsService.getAllCabs();
        return new ResponseEntity<>(cabs, HttpStatus.OK);
    }

    // Get cab by ID
    @GetMapping("/{id}")
    public ResponseEntity<CabsEntity> getCabById(@PathVariable("id") String id) {
        Optional<CabsEntity> cab = cabsService.getCabById(id);
        if (cab.isPresent()) {
            return new ResponseEntity<>(cab.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update cab
    @PutMapping("/{id}")
    public ResponseEntity<CabsEntity> updateCab(@PathVariable("id") String id, @RequestBody CabsEntity cab) {
        Optional<CabsEntity> existingCab = cabsService.getCabById(id);
        if (existingCab.isPresent()) {
            // Set the existing ID (do not change it)
            cab.setId(id);

            // Update the cab using the service
            CabsEntity updatedCab = cabsService.updateCab(cab);
            return new ResponseEntity<>(updatedCab, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete cab
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCab(@PathVariable("id") String id) {
        Optional<CabsEntity> cab = cabsService.getCabById(id);
        if (cab.isPresent()) {
            cabsService.deleteCab(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
