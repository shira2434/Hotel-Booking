package com.springboot.firstproject.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.springboot.firstproject.entity.Product;
//IoC//ה
//יודע ליצור מופע מממשק זה באופן אוטומטי בלי שנצטרך לממש את הפונקציות
@Repository
public interface ProductRepository extends CrudRepository<Product,Integer>{
    Product findByName(String name);  
}
