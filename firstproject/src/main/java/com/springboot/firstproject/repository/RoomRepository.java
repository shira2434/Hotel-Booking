package com.springboot.firstproject.repository;

import com.springboot.firstproject.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {

    List<Room> findByType(String type);

    @Query("SELECT r FROM Room r WHERE r.id NOT IN (" +
           "SELECT b.room.id FROM Booking b WHERE b.cancelled = false " +
           "AND b.checkIn < :checkOut AND b.checkOut > :checkIn)")
    List<Room> findAvailableRooms(@Param("checkIn") LocalDate checkIn,
                                   @Param("checkOut") LocalDate checkOut);
}
