package com.example.magazin.controller;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.example.magazin.model.Product;
import com.example.magazin.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<Product> getAllProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        if (name == null && minPrice == null && maxPrice == null) {
            return productRepository.findAll();
        }

        List<Product> products = (name != null && !name.isBlank())
                ? productRepository.findByNameContainingIgnoreCase(name)
                : productRepository.findAll();

        return products.stream()
                .filter(p -> {
                    if (p.getPrice() == null) return false;
                    boolean ok = true;
                    if (minPrice != null) ok = ok && p.getPrice() >= minPrice;
                    if (maxPrice != null) ok = ok && p.getPrice() <= maxPrice;
                    return ok;
                })
                .toList();
    }

    @PostMapping
    public Product createProduct(@RequestBody @Valid Product product) {
        boolean dup = productRepository
                .existsByNameIgnoreCaseAndCategoryIgnoreCaseAndSubcategoryIgnoreCaseAndSellerNameIgnoreCase(
                        product.getName(), product.getCategory(), product.getSubcategory(), product.getSellerName()
                );
        if (dup) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Produsul există deja.");
        }
        return productRepository.save(product);
    }

    // edit
    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody @Valid Product product
    ) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Produsul nu a fost găsit.")
                );

        // verificăm duplicatele (alt produs cu aceleași câmpuri)
        boolean dup = productRepository
                .existsByNameIgnoreCaseAndCategoryIgnoreCaseAndSubcategoryIgnoreCaseAndSellerNameIgnoreCaseAndIdNot(
                        product.getName(),
                        product.getCategory(),
                        product.getSubcategory(),
                        product.getSellerName(),
                        id
                );
        if (dup) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Există deja un produs cu aceleași detalii.");
        }

        // actualizare
        existing.setName(product.getName());
        existing.setDescription(product.getDescription());
        existing.setCategory(product.getCategory());
        existing.setSubcategory(product.getSubcategory());
        existing.setSellerName(product.getSellerName());
        existing.setPrice(product.getPrice());
        existing.setQuantity(product.getQuantity());

        return productRepository.save(existing);
    }

    // stergere
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Long id) {
        boolean exists = productRepository.existsById(id);
        if (!exists) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produsul nu a fost găsit.");
        }
        productRepository.deleteById(id);
    }
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Produsul nu a fost găsit.")
                );
    }

}
