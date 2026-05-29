package com.springboot.firstproject.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import lombok.Data;


@Data //באופן זה נוצר גטרים וסטרים לשדות, טוסטרינג ועוד
@Entity
/* 
@AllArgsConstructor
@NoArgsConstructor*/
//@Table(name="products")
public class Product {

    @Id //כך מגדירים שהשדה מתחת הוא שדה מפתח
    @GeneratedValue
    private int code;
    //@Column(name = "name_product")
    private String name;
    private double price;

    @ManyToOne //המחלקה הנוכחית היא הרבים והיחיד הוא האובייקט שצוין למטה
    //@JsonIgnore//השדה הזה לא יכלל באובייקט //Json//באופן זה כאשר האובייקט יתורגם ל
    private Category productCategory;
    
}
