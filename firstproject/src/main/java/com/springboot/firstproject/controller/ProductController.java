package com.springboot.firstproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.firstproject.dto.ProductDTO;

import com.springboot.firstproject.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired //IoC//כך נעשית הזרקה אוטומטית של המופע המתאים על ידי ה
    private ProductService ps;
    @GetMapping("/getAll")
    public List<ProductDTO> getAll()
    {
        return ps.getAll();
    }

    @PostMapping("/add")
    public void add(@RequestBody ProductDTO p)
    {
        ps.add(p);
    }

    @PutMapping("/update")
    public void update(@RequestBody ProductDTO p)
    {
        ps.update(p);
    }

    @DeleteMapping("/delete/{code}")
    public void delete(@PathVariable int code)
    {
        ps.delete(code);
    }

    @GetMapping("/getById/{code}")
    public ProductDTO getByCode(@PathVariable int code)
    {
        return ps.getByCode(code);
    }

    @GetMapping("/getByName/{name}")
    public ProductDTO getByName(@PathVariable String name)
    {
        return ps.getByName(name);
    }
    
}
