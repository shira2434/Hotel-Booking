package com.springboot.firstproject.service;

import java.lang.reflect.Type;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.firstproject.dto.ProductDTO;
import com.springboot.firstproject.entity.Product;
import com.springboot.firstproject.repository.ProductRepository;
@Service //IoC//באופן זה ה
//יודע שמדובר במחלקת שרות ויודע ליצור ממנו מופע ולהזריק לפי הצורך
public class ProductServiceImpl implements ProductService{

    @Autowired  //IoC //באופן זה ה
    //יודע להזריק את המופע המתאים לשדה
    private ProductRepository pr;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void add(ProductDTO p) {
        if(pr.existsById(p.getCode()))
            throw new RuntimeException("Product already exists!");
        pr.save(mapper.map(p,Product.class));
    }

    @Override
    public void update(ProductDTO p) {
        if(!pr.existsById(p.getCode()))
            throw new RuntimeException("Product does not exist!");
        pr.save(mapper.map(p,Product.class));
    }

    @Override
    public void delete(int code) {
        pr.deleteById(code);
    }

    @Override
    public List<ProductDTO> getAll() {
        Type listType = new TypeToken<List<ProductDTO>>(){}.getType();
        return mapper.map((List<Product>)pr.findAll(),listType);
    }

    @Override
    public ProductDTO getByCode(int code) {
        return mapper.map(pr.findById(code).orElseThrow(),ProductDTO.class);
    }

    @Override
    public ProductDTO getByName(String name) {
        return mapper.map(pr.findByName(name),ProductDTO.class);
    }
    
}
