package com.springboot.firstproject.service;

import java.util.List;

import com.springboot.firstproject.dto.ProductDTO;


public interface ProductService {
    void add(ProductDTO p);
    void update(ProductDTO p);
    void delete(int code);
    List<ProductDTO> getAll();
    ProductDTO getByCode(int code);
    ProductDTO getByName(String name);  
}
