package com.springboot.firstproject.service;

import com.springboot.firstproject.dto.BookingDTO;
import com.springboot.firstproject.entity.Booking;
import com.springboot.firstproject.entity.Customer;
import com.springboot.firstproject.entity.Room;
import com.springboot.firstproject.repository.BookingRepository;
import com.springboot.firstproject.repository.CustomerRepository;
import com.springboot.firstproject.repository.RoomRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.LinkedHashMap;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository br;

    @Autowired
    private CustomerRepository cr;

    @Autowired
    private RoomRepository rr;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void add(BookingDTO dto) {
        Customer customer = cr.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found!"));
        Room room = rr.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found!"));

        // בדיקה שהחדר פנוי בתאריכים הנבחרים
        boolean roomTaken = br.findByCancelledFalse().stream().anyMatch(b ->
                b.getRoom().getId() == room.getId() &&
                b.getCheckIn().isBefore(dto.getCheckOut()) &&
                b.getCheckOut().isAfter(dto.getCheckIn()));

        if (roomTaken)
            throw new RuntimeException("Room is not available for selected dates!");

        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setRoom(room);
        booking.setCheckIn(dto.getCheckIn());
        booking.setCheckOut(dto.getCheckOut());
        booking.setCancelled(false);
        br.save(booking);
    }

    @Override
    public void update(BookingDTO dto) {
        Booking booking = br.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Booking not found!"));
        booking.setCheckIn(dto.getCheckIn());
        booking.setCheckOut(dto.getCheckOut());
        br.save(booking);
    }

    @Override
    public List<BookingDTO> getAll() {
        return br.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public BookingDTO getById(int id) {
        return toDTO(br.findById(id).orElseThrow());
    }

    @Override
    public List<BookingDTO> getByCustomer(int customerId) {
        return br.findByCustomerId(customerId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    // פונקציה מעניינת #2 - ביטול הזמנה רק אם עוד לא הגיע תאריך הצ'ק-אין
    @Override
    public void cancelBooking(int id) {
        Booking booking = br.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found!"));
        if (booking.isCancelled())
            throw new RuntimeException("Booking is already cancelled!");
        if (!LocalDate.now().isBefore(booking.getCheckIn()))
            throw new RuntimeException("Cannot cancel after check-in date!");
        booking.setCancelled(true);
        br.save(booking);
    }

    // פונקציה מעניינת #3 - סך הכנסות מכל ההזמנות הפעילות
    @Override
    public double getTotalRevenue() {
        return br.findByCancelledFalse().stream()
                .mapToDouble(b -> ChronoUnit.DAYS.between(b.getCheckIn(), b.getCheckOut()) * b.getRoom().getPricePerNight())
                .sum();
    }

    // פונקציה מעניינת #4 - הכנסות לפי סוג חדר
    @Override
    public Map<String, Double> getRevenueByRoomType() {
        Map<String, Double> result = new HashMap<>();
        for (Booking b : br.findByCancelledFalse()) {
            double nights = ChronoUnit.DAYS.between(b.getCheckIn(), b.getCheckOut());
            result.merge(b.getRoom().getType(), nights * b.getRoom().getPricePerNight(), Double::sum);
        }
        return result;
    }

    // פונקציה מעניינת #5 - הארכת הזמנה עם בדיקת זמינות
    @Override
    public void extendBooking(int id, LocalDate newCheckOut) {
        Booking booking = br.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found!"));
        if (booking.isCancelled())
            throw new RuntimeException("Cannot extend a cancelled booking!");
        if (!newCheckOut.isAfter(booking.getCheckOut()))
            throw new RuntimeException("New check-out must be after current check-out!");
        boolean conflict = br.findByCancelledFalse().stream().anyMatch(b ->
                b.getId() != id &&
                b.getRoom().getId() == booking.getRoom().getId() &&
                b.getCheckIn().isBefore(newCheckOut) &&
                b.getCheckOut().isAfter(booking.getCheckOut()));
        if (conflict)
            throw new RuntimeException("Room is not available for the extended period!");
        booking.setCheckOut(newCheckOut);
        br.save(booking);
    }

    // פונקציה מעניינת #6 - סטטיסטיקות הזמנות
    @Override
    public Map<String, Object> getBookingStats() {
        List<Booking> all = br.findAll();
        List<Booking> active = br.findByCancelledFalse();
        long cancelled = all.stream().filter(Booking::isCancelled).count();
        double revenue = active.stream()
                .mapToDouble(b -> ChronoUnit.DAYS.between(b.getCheckIn(), b.getCheckOut()) * b.getRoom().getPricePerNight())
                .sum();
        Map<String, Long> byType = active.stream()
                .collect(Collectors.groupingBy(b -> b.getRoom().getType(), Collectors.counting()));
        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalBookings", all.size());
        stats.put("activeBookings", active.size());
        stats.put("cancelledBookings", cancelled);
        stats.put("totalRevenue", revenue);
        stats.put("bookingsByRoomType", byType);
        return stats;
    }

    // מיפוי ידני מ-Entity ל-DTO (כולל שדות מחושבים)
    private BookingDTO toDTO(Booking b) {
        BookingDTO dto = new BookingDTO();
        dto.setId(b.getId());
        dto.setCustomerId(b.getCustomer().getId());
        dto.setCustomerName(b.getCustomer().getFullName());
        dto.setRoomId(b.getRoom().getId());
        dto.setRoomNumber(b.getRoom().getRoomNumber());
        dto.setRoomType(b.getRoom().getType());
        dto.setCheckIn(b.getCheckIn());
        dto.setCheckOut(b.getCheckOut());
        dto.setCancelled(b.isCancelled());
        long nights = ChronoUnit.DAYS.between(b.getCheckIn(), b.getCheckOut());
        dto.setTotalPrice(nights * b.getRoom().getPricePerNight());
        return dto;
    }
}
