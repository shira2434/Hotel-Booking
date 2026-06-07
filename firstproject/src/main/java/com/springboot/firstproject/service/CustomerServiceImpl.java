package com.springboot.firstproject.service;

import com.springboot.firstproject.dto.CustomerDTO;
import com.springboot.firstproject.entity.Customer;
import com.springboot.firstproject.repository.CustomerRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.lang.reflect.Type;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository cr;

    @Autowired
    private ModelMapper mapper;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public void add(CustomerDTO customer) {
        if (cr.existsById(customer.getId()))
            throw new RuntimeException("Customer already exists!");
        cr.save(mapper.map(customer, Customer.class));
    }

    @Override
    public void update(CustomerDTO customer) {
        if (!cr.existsById(customer.getId()))
            throw new RuntimeException("Customer not found!");
        cr.save(mapper.map(customer, Customer.class));
    }

    @Override
    public void delete(int id) {
        cr.deleteById(id);
    }

    @Override
    public List<CustomerDTO> getAll() {
        Type listType = new TypeToken<List<CustomerDTO>>() {}.getType();
        return mapper.map(cr.findAll(), listType);
    }

    @Override
    public CustomerDTO getById(int id) {
        return mapper.map(cr.findById(id).orElseThrow(), CustomerDTO.class);
    }

    @Override
    public CustomerDTO getByEmail(String email) {
        return mapper.map(cr.findByEmail(email), CustomerDTO.class);
    }

    @Override
    public CustomerDTO register(CustomerDTO customer) {
        if (cr.findByEmail(customer.getEmail()) != null)
            throw new RuntimeException("Email already registered!");
        customer.setPassword(encoder.encode(customer.getPassword()));
        Customer saved = cr.save(mapper.map(customer, Customer.class));
        return mapper.map(saved, CustomerDTO.class);
    }

    @Override
    public CustomerDTO login(String email, String password) {
        Customer customer = cr.findByEmail(email);
        if (customer == null || !encoder.matches(password, customer.getPassword()))
            throw new RuntimeException("Invalid email or password!");
        return mapper.map(customer, CustomerDTO.class);
    }
}
