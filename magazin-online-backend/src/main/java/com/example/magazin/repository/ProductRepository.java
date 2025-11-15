package com.example.magazin.repository;

import com.example.magazin.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByPriceBetween(Double min, Double max);

    boolean existsByNameIgnoreCaseAndCategoryIgnoreCaseAndSubcategoryIgnoreCaseAndSellerNameIgnoreCase(
            String name, String category, String subcategory, String sellerName
    );
    boolean existsByNameIgnoreCaseAndCategoryIgnoreCaseAndSubcategoryIgnoreCaseAndSellerNameIgnoreCaseAndIdNot(
            String name,
            String category,
            String subcategory,
            String sellerName,
            Long id
    );
}
