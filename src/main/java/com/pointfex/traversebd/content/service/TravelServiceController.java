package com.pointfex.traversebd.content.service;

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
public class TravelServiceController {
    private final TravelServiceRepository repository;
    public TravelServiceController(TravelServiceRepository repository) { this.repository = repository; }
    public record Request(@NotBlank String title, String description, String iconName,
                          ContentStatus status, int sortOrder) {}

    @GetMapping("/public/services")
    public List<TravelService> published() {
        return repository.findAll().stream()
                .filter(item -> item.getStatus() == ContentStatus.PUBLISHED)
                .sorted((a, b) -> Integer.compare(a.getSortOrder(), b.getSortOrder())).toList();
    }

    @GetMapping("/admin/services")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public List<TravelService> all() { return repository.findAll(); }

    @PostMapping("/admin/services")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<TravelService> create(@RequestBody Request request) {
        TravelService item = new TravelService(); apply(item, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(item));
    }

    @PutMapping("/admin/services/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public TravelService update(@PathVariable UUID id, @RequestBody Request request) {
        TravelService item = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found"));
        apply(item, request); return repository.save(item);
    }

    @DeleteMapping("/admin/services/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (!repository.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found");
        repository.deleteById(id); return ResponseEntity.noContent().build();
    }

    private void apply(TravelService item, Request request) {
        item.setTitle(request.title().trim()); item.setDescription(request.description());
        item.setIconName(request.iconName());
        item.setStatus(request.status() == null ? ContentStatus.DRAFT : request.status());
        item.setSortOrder(request.sortOrder());
    }
}
