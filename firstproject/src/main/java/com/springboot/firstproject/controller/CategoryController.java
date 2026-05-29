package com.springboot.firstproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.firstproject.dto.CategoryDTO;

import com.springboot.firstproject.service.CategoryService;

import lombok.RequiredArgsConstructor;
@RequestMapping("/categories")
@RestController
@RequiredArgsConstructor
public class CategoryController {
    //@Autowired
    private final CategoryService cs;


    @GetMapping("/getAll")
    public List<CategoryDTO> getAll()
    {
        return cs.getAll();
    }
    
}
