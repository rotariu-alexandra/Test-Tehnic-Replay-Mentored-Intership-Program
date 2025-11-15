package com.example.magazin.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(max = 255, message = "Name must be at most 255 characters")
    @Column(length = 255, nullable = false)
    private String name;

    @Size(max = 2000, message = "Description must be at most 2000 characters")
    @Column(length = 2000)
    private String description;

    @Size(max = 100, message = "Category must be at most 100 characters")
    @Column(length = 100)
    private String category;

    @Size(max = 100, message = "Subcategory must be at most 100 characters")
    @Column(length = 100)
    private String subcategory;

    @Size(max = 150, message = "Seller name must be at most 150 characters")
    @Column(length = 150)
    private String sellerName;

    @NotNull(message = "Price is required")
    @PositiveOrZero(message = "Price must be ≥ 0")
    @Column(nullable = false)
    private Double price;

    @NotNull(message = "Quantity is required")
    @PositiveOrZero(message = "Quantity must be ≥ 0")
    @Column(nullable = false)
    private Integer quantity;

    public Product() {}

    // getters & setters simple
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSubcategory() { return subcategory; }
    public void setSubcategory(String subcategory) { this.subcategory = subcategory; }

    public String getSellerName() { return sellerName; }
    public void setSellerName(String sellerName) { this.sellerName = sellerName; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
