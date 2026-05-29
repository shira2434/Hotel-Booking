package com.springboot.firstproject.service;

import com.springboot.firstproject.dto.BookingDTO;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface BookingService {
    void add(BookingDTO booking);
    void update(BookingDTO booking);
    List<BookingDTO> getAll();
    BookingDTO getById(int id);
    List<BookingDTO> getByCustomer(int customerId);
    void cancelBooking(int id);
    double getTotalRevenue();
    Map<String, Double> getRevenueByRoomType();
    void extendBooking(int id, LocalDate newCheckOut);
    Map<String, Object> getBookingStats();
}
