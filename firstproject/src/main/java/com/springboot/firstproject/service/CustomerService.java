package com.springboot.firstproject.service;

import com.springboot.firstproject.dto.CustomerDTO;
import java.util.List;

public interface CustomerService {
    void add(CustomerDTO customer);
    void update(CustomerDTO customer);
    void delete(int id);
    List<CustomerDTO> getAll();
    CustomerDTO getById(int id);
    CustomerDTO getByEmail(String email);
    CustomerDTO register(CustomerDTO customer);
    CustomerDTO login(String email, String password);
}
