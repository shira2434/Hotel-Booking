package com.springboot.firstproject.repository;



import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.springboot.firstproject.entity.Category;
@Repository
public interface CategoryRepository extends CrudRepository<Category,Integer>{
    
}
