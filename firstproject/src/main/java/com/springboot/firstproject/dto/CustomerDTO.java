package com.springboot.firstproject.dto;

import lombok.Data;

@Data
public class CustomerDTO {
    private int id;
    private String fullName;
    private String email;
    private String phone;
    private String password;
}
