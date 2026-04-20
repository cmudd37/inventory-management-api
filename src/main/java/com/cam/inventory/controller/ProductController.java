package com.cam.inventory.controller;

import com.cam.inventory.dto.ProductRequest;
import com.cam.inventory.dto.ProductResponse;
import com.cam.inventory.entity.Product;
import com.cam.inventory.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ProductResponse createProduct(@Valid @RequestBody ProductRequest request) {
        return productService.createProduct(request);
    }

    @GetMapping
    public List<ProductResponse> getProducts(
            @RequestParam(name = "name", required = false) String name
    ) {
        if (name != null && !name.trim().isEmpty()) {
            return productService.searchProducts(name);
        }
        return productService.getAllProducts();
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
    }
}
