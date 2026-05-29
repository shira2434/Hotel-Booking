package com.springboot.firstproject.controller;

import com.springboot.firstproject.dto.CustomerDTO;
import com.springboot.firstproject.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerService cs;

    @GetMapping("/getAll")
    public List<CustomerDTO> getAll() { return cs.getAll(); }

    @PostMapping("/add")
    public void add(@RequestBody CustomerDTO customer) { cs.add(customer); }

    @PutMapping("/update")
    public void update(@RequestBody CustomerDTO customer) { cs.update(customer); }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) { cs.delete(id); }

    @GetMapping("/getById/{id}")
    public CustomerDTO getById(@PathVariable int id) { return cs.getById(id); }

    @GetMapping("/getByEmail/{email}")
    public CustomerDTO getByEmail(@PathVariable String email) { return cs.getByEmail(email); }
}
