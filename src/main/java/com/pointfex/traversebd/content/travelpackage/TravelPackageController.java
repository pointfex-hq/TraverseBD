package com.pointfex.traversebd.content.travelpackage;

import com.pointfex.traversebd.common.ContentStatus;
import com.pointfex.traversebd.common.SlugUtil;
import com.pointfex.traversebd.content.category.CategoryRepository;
import com.pointfex.traversebd.content.destination.DestinationRepository;
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
public class TravelPackageController {
    private final TravelPackageRepository repository;
    private final DestinationRepository destinationRepository;
    private final CategoryRepository categoryRepository;

    public TravelPackageController(TravelPackageRepository repository,
                                   DestinationRepository destinationRepository,
                                   CategoryRepository categoryRepository) {
        this.repository = repository;
        this.destinationRepository = destinationRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/public/packages")
    public List<TravelPackage> published(
            @RequestParam(required = false) UUID destinationId,
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) Integer durationDays) {
        return repository.findAll().stream()
                .filter(item -> item.getStatus() == ContentStatus.PUBLISHED)
                .filter(item -> destinationId == null || item.getDestination() != null &&
                        item.getDestination().getId().equals(destinationId))
                .filter(item -> categoryId == null || item.getCategory() != null &&
                        item.getCategory().getId().equals(categoryId))
                .filter(item -> minPrice == null || item.getPrice() >= minPrice)
                .filter(item -> maxPrice == null || item.getPrice() <= maxPrice)
                .filter(item -> durationDays == null || item.getDurationDays().equals(durationDays))
                .toList();
    }

    @GetMapping("/public/packages/{slug}")
    public TravelPackage publishedOne(@PathVariable String slug) {
        return repository.findBySlug(slug)
                .filter(item -> item.getStatus() == ContentStatus.PUBLISHED)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found"));
    }

    @GetMapping("/admin/packages")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public List<TravelPackage> all() {
        return repository.findAll();
    }

    @PostMapping("/admin/packages")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<TravelPackage> create(@Valid @RequestBody TravelPackageDtos.Request request) {
        TravelPackage travelPackage = new TravelPackage();
        apply(travelPackage, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(travelPackage));
    }

    @PutMapping("/admin/packages/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public TravelPackage update(@PathVariable UUID id, @Valid @RequestBody TravelPackageDtos.Request request) {
        TravelPackage travelPackage = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found"));
        apply(travelPackage, request);
        return repository.save(travelPackage);
    }

    @DeleteMapping("/admin/packages/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (!repository.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found");
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private void apply(TravelPackage travelPackage, TravelPackageDtos.Request request) {
        if (request.price() == null || request.price() <= 0) {
            throw new IllegalArgumentException("Price must be greater than zero");
        }
        if (request.durationDays() == null || request.durationDays() <= 0) {
            throw new IllegalArgumentException("Duration must be greater than zero");
        }
        travelPackage.setTitle(request.title().trim());
        travelPackage.setSlug(request.slug() == null || request.slug().isBlank()
                ? SlugUtil.slugify(request.title()) : SlugUtil.slugify(request.slug()));
        travelPackage.setPrice(request.price());
        travelPackage.setDurationDays(request.durationDays());
        travelPackage.setPriceMode(request.priceMode() == null ? PriceMode.FIXED : request.priceMode());
        travelPackage.setShortDescription(request.shortDescription());
        travelPackage.setFullDescription(request.fullDescription());
        travelPackage.setCoverImageUrl(request.coverImageUrl());
        travelPackage.setStatus(request.status() == null ? ContentStatus.DRAFT : request.status());
        travelPackage.setFeatured(request.featured());
        travelPackage.setTrending(request.trending());
        if (request.destinationId() != null) {
            travelPackage.setDestination(destinationRepository.findById(request.destinationId())
                    .orElseThrow(() -> new IllegalArgumentException("Destination not found")));
        } else {
            travelPackage.setDestination(null);
        }
        if (request.categoryId() != null) {
            travelPackage.setCategory(categoryRepository.findById(request.categoryId())
                    .orElseThrow(() -> new IllegalArgumentException("Category not found")));
        } else {
            travelPackage.setCategory(null);
        }
        travelPackage.getItems().clear();
        if (request.items() != null) {
            for (TravelPackageDtos.ItemRequest itemRequest : request.items()) {
                PackageItem item = new PackageItem();
                item.setTravelPackage(travelPackage);
                item.setType(itemRequest.type().trim().toLowerCase());
                item.setText(itemRequest.text().trim());
                item.setSortOrder(itemRequest.sortOrder());
                travelPackage.getItems().add(item);
            }
        }
    }
}
