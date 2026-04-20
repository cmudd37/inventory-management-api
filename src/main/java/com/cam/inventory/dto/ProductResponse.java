package com.cam.inventory.dto;

public class ProductResponse {
    private Long id;
    private String name;
    private double price;
    private int quantity;
    private Long categoryId;
    private String categoryName;

    public ProductResponse(Long id, String name, double price, int quantity,
                           Long categoryId, String categoryName) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }
}
