package com.springboot.firstproject.controller;

import com.springboot.firstproject.dto.BookingDTO;
import com.springboot.firstproject.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bs;

    @GetMapping("/getAll")
    public List<BookingDTO> getAll() { return bs.getAll(); }

    @PostMapping("/add")
    public void add(@RequestBody BookingDTO booking) { bs.add(booking); }

    @PutMapping("/update")
    public void update(@RequestBody BookingDTO booking) { bs.update(booking); }

    @GetMapping("/getById/{id}")
    public BookingDTO getById(@PathVariable int id) { return bs.getById(id); }

    @GetMapping("/getByCustomer/{customerId}")
    public List<BookingDTO> getByCustomer(@PathVariable int customerId) {
        return bs.getByCustomer(customerId);
    }

    // פונקציה מעניינת #2
    @PutMapping("/cancel/{id}")
    public void cancelBooking(@PathVariable int id) { bs.cancelBooking(id); }

    // פונקציה מעניינת #3
    @GetMapping("/totalRevenue")
    public double getTotalRevenue() { return bs.getTotalRevenue(); }

    // פונקציה מעניינת #4
    @GetMapping("/revenueByRoomType")
    public Map<String, Double> getRevenueByRoomType() { return bs.getRevenueByRoomType(); }

    // פונקציה מעניינת #5
    @PutMapping("/extend/{id}")
    public void extendBooking(@PathVariable int id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate newCheckOut) {
        bs.extendBooking(id, newCheckOut);
    }

    // פונקציה מעניינת #6
    @GetMapping("/stats")
    public Map<String, Object> getBookingStats() { return bs.getBookingStats(); }
}
