package com.springboot.firstproject.service;

import java.lang.reflect.Type;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.springboot.firstproject.dto.CategoryDTO;
import com.springboot.firstproject.entity.Category;
import com.springboot.firstproject.repository.CategoryRepository;
@Service
public class CategoryServiceImpl implements CategoryService{
    @Autowired
    private CategoryRepository cr;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<CategoryDTO> getAll() {
        Type listType = new TypeToken<List<CategoryDTO>>(){}.getType();
        return mapper.map((List<Category>)cr.findAll(),listType);
    }

    
}
