package com.booking.booking_management.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    /**
     * Users and Admins can view all bookings.
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<String> getAllBookings() {
        return List.of("Booking #101 - Main Hall", "Booking #102 - Creative Lab");
    }

    /**
     * Only Users can create a new booking.
     */
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public String createBooking(@RequestBody Map<String, Object> bookingData) {
        return "Booking created successfully!";
    }

    /**
     * Only Technicians can update the status of a booking.
     */
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('TECHNICIAN')")
    public String updateBookingStatus(@PathVariable String id, @RequestBody Map<String, String> statusUpdate) {
        return "Booking " + id + " status updated to: " + statusUpdate.get("status");
    }

    /**
     * Admins can perform maintenance or administrative overrides.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteBooking(@PathVariable String id) {
        return "Booking " + id + " deleted by Administrator.";
    }
}
