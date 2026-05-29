package com.springboot.firstproject.controller;

import com.springboot.firstproject.dto.RoomDTO;
import com.springboot.firstproject.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService rs;

    @GetMapping("/getAll")
    public List<RoomDTO> getAll() { return rs.getAll(); }

    @PostMapping("/add")
    public void add(@RequestBody RoomDTO room) { rs.add(room); }

    @PutMapping("/update")
    public void update(@RequestBody RoomDTO room) { rs.update(room); }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) { rs.delete(id); }

    @GetMapping("/getById/{id}")
    public RoomDTO getById(@PathVariable int id) { return rs.getById(id); }

    @GetMapping("/getByType/{type}")
    public List<RoomDTO> getByType(@PathVariable String type) { return rs.getByType(type); }

    // פונקציה מעניינת #1
    @GetMapping("/available")
    public List<RoomDTO> getAvailableRooms(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut) {
        return rs.getAvailableRooms(checkIn, checkOut);
    }
}
