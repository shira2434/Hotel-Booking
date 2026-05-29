package com.springboot.firstproject.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Customer {

    @Id
    @GeneratedValue
    private int id;

    private String fullName;
    private String email;
    private String phone;
}
