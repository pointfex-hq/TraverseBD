package com.pointfex.traversebd.content.category;

import com.pointfex.traversebd.common.ContentStatus;
import com.pointfex.traversebd.common.SlugUtil;
import com.pointfex.traversebd.content.travelpackage.TravelPackageRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class CategoryController {
    private final CategoryRepository repository;
    private final TravelPackageRepository travelPackageRepository;

    public CategoryController(CategoryRepository repository, TravelPackageRepository travelPackageRepository) {
        this.repository = repository;
        this.travelPackageRepository = travelPackageRepository;
    }

    @GetMapping("/public/categories")
    public List<Category> published() {
        return repository.findAll().stream()
                .filter(category -> category.getStatus() == ContentStatus.PUBLISHED)
                .sorted((a, b) -> Integer.compare(a.getSortOrder(), b.getSortOrder()))
                .toList();
    }

    @GetMapping("/admin/categories")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public List<Category> all() {
        return repository.findAll();
    }

    @PostMapping("/admin/categories")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Category> create(@Valid @RequestBody CategoryDtos.Request request) {
        Category category = new Category();
        apply(category, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(category));
    }

    @PutMapping("/admin/categories/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public Category update(@PathVariable UUID id, @Valid @RequestBody CategoryDtos.Request request) {
        Category category = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
        apply(category, request);
        return repository.save(category);
    }

    @DeleteMapping("/admin/categories/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (!repository.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        boolean hasPackages = travelPackageRepository.findAll().stream()
                .anyMatch(item -> item.getCategory() != null && item.getCategory().getId().equals(id));
        if (hasPackages) throw new IllegalArgumentException("Category cannot be deleted while packages use it");
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private void apply(Category category, CategoryDtos.Request request) {
        category.setName(request.name().trim());
        category.setSlug(request.slug() == null || request.slug().isBlank()
                ? SlugUtil.slugify(request.name()) : SlugUtil.slugify(request.slug()));
        category.setStatus(request.status() == null ? ContentStatus.DRAFT : request.status());
        category.setSortOrder(request.sortOrder());
    }
}
