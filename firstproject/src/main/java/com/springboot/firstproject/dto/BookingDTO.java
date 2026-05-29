package com.springboot.firstproject.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class BookingDTO {
    private int id;
    private int customerId;
    private String customerName;
    private int roomId;
    private String roomNumber;
    private String roomType;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private boolean cancelled;
    private double totalPrice;
}
