package com.springboot.firstproject.repository;

import com.springboot.firstproject.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<Booking> findByCustomerId(int customerId);

    List<Booking> findByCancelledFalse();
}
