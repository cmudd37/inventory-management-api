package com.cam.inventory.controller;

import com.cam.inventory.entity.Category;
import com.cam.inventory.repository.CategoryRepository;
import com.cam.inventory.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    @GetMapping
    private List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
