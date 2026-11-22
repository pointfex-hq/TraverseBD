package com.pointfex.traversebd.content.destination;

import com.pointfex.traversebd.common.ContentStatus;
import com.pointfex.traversebd.common.SlugUtil;
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
public class DestinationController {
    private final DestinationRepository repository;

    public DestinationController(DestinationRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/public/destinations")
    public List<Destination> published() {
        return repository.findAll().stream()
                .filter(destination -> destination.getStatus() == ContentStatus.PUBLISHED)
                .toList();
    }

    @GetMapping("/public/destinations/{slug}")
    public Destination publishedOne(@PathVariable String slug) {
        return repository.findBySlug(slug)
                .filter(destination -> destination.getStatus() == ContentStatus.PUBLISHED)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Destination not found"));
    }

    @GetMapping("/admin/destinations")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public List<Destination> all() {
        return repository.findAll();
    }

    @PostMapping("/admin/destinations")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Destination> create(@Valid @RequestBody DestinationDtos.Request request) {
        Destination destination = new Destination();
        apply(destination, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(destination));
    }

    @PutMapping("/admin/destinations/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public Destination update(@PathVariable UUID id, @Valid @RequestBody DestinationDtos.Request request) {
        Destination destination = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Destination not found"));
        apply(destination, request);
        return repository.save(destination);
    }

    @DeleteMapping("/admin/destinations/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (!repository.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Destination not found");
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private void apply(Destination destination, DestinationDtos.Request request) {
        destination.setName(request.name().trim());
        destination.setSlug(request.slug() == null || request.slug().isBlank()
                ? SlugUtil.slugify(request.name()) : SlugUtil.slugify(request.slug()));
        destination.setRegion(request.region());
        destination.setShortDescription(request.shortDescription());
        destination.setFullDescription(request.fullDescription());
        destination.setCoverImageUrl(request.coverImageUrl());
        destination.setHighlights(request.highlights());
        destination.setStatus(request.status() == null ? ContentStatus.DRAFT : request.status());
        destination.setFeatured(request.featured());
    }
}
