package com.springboot.firstproject.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
@Entity
@Data
public class Category {
    @Id //מפתח ראשי
    @GeneratedValue //מיספור אוטומטי
    private int code;
    private String name;

    @OneToMany(mappedBy = "productCategory") //לקטגוריה אחת יש הרבה מוצרים
    //@JsonIgnore
    private List<Product> listProducts;
    
}
