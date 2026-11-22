package com.pointfex.traversebd.content.gallery;

import com.pointfex.traversebd.common.ContentStatus;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class GalleryController {
    private final GalleryRepository repository;

    public GalleryController(GalleryRepository repository) {
        this.repository = repository;
    }

    public record Request(@NotBlank String imageUrl, String caption, ContentStatus status, int sortOrder) {}

    @GetMapping("/public/gallery")
    public List<GalleryImage> published() {
        return repository.findAll().stream()
                .filter(item -> item.getStatus() == ContentStatus.PUBLISHED)
                .sorted((a, b) -> Integer.compare(a.getSortOrder(), b.getSortOrder()))
                .toList();
    }

    @GetMapping("/admin/gallery")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public List<GalleryImage> all() {
        return repository.findAll();
    }

    @PostMapping("/admin/gallery")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<GalleryImage> create(@RequestBody Request request) {
        GalleryImage image = new GalleryImage();
        apply(image, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(image));
    }

    @PutMapping("/admin/gallery/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public GalleryImage update(@PathVariable UUID id, @RequestBody Request request) {
        GalleryImage image = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found"));
        apply(image, request);
        return repository.save(image);
    }

    @DeleteMapping("/admin/gallery/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (!repository.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found");
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private void apply(GalleryImage image, Request request) {
        image.setImageUrl(request.imageUrl().trim());
        image.setCaption(request.caption());
        image.setStatus(request.status() == null ? ContentStatus.DRAFT : request.status());
        image.setSortOrder(request.sortOrder());
    }
}
