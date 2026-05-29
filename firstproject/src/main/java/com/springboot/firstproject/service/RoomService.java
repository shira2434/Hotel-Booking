package com.springboot.firstproject.service;

import com.springboot.firstproject.dto.RoomDTO;
import java.time.LocalDate;
import java.util.List;

public interface RoomService {
    void add(RoomDTO room);
    void update(RoomDTO room);
    void delete(int id);
    List<RoomDTO> getAll();
    RoomDTO getById(int id);
    List<RoomDTO> getByType(String type);
    List<RoomDTO> getAvailableRooms(LocalDate checkIn, LocalDate checkOut);
}
