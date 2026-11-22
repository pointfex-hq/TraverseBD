package com.pointfex.traversebd.content.testimonial;

import com.pointfex.traversebd.common.ContentStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
public class TestimonialController {
    private final TestimonialRepository repository;
    public TestimonialController(TestimonialRepository repository) { this.repository = repository; }

    public record Request(@NotBlank String name, @NotBlank String quote,
                          @Min(1) @Max(5) Integer rating, ContentStatus status) {}

    @GetMapping("/public/testimonials")
    public List<Testimonial> published() {
        return repository.findAll().stream()
                .filter(item -> item.getStatus() == ContentStatus.PUBLISHED).toList();
    }

    @GetMapping("/admin/testimonials")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public List<Testimonial> all() { return repository.findAll(); }

    @PostMapping("/admin/testimonials")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Testimonial> create(@RequestBody Request request) {
        Testimonial item = new Testimonial();
        apply(item, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(item));
    }

    @PutMapping("/admin/testimonials/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public Testimonial update(@PathVariable UUID id, @RequestBody Request request) {
        Testimonial item = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Testimonial not found"));
        apply(item, request);
        return repository.save(item);
    }

    @DeleteMapping("/admin/testimonials/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (!repository.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Testimonial not found");
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private void apply(Testimonial item, Request request) {
        item.setName(request.name().trim());
        item.setQuote(request.quote().trim());
        item.setRating(request.rating());
        item.setStatus(request.status() == null ? ContentStatus.DRAFT : request.status());
    }
}
