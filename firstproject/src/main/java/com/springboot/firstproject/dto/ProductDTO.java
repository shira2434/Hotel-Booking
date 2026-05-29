package com.springboot.firstproject.dto;

import lombok.Data;

@Data
public class ProductDTO {
    private int code;
    private String name;
    private double price;
    private int productCategoryCode;
    private String productCategoryName;   
}
