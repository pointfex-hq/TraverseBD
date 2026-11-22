package com.pointfex.traversebd.content.faq;

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
public class FaqController {
    private final FaqRepository repository;
    public FaqController(FaqRepository repository) { this.repository = repository; }
    public record Request(@NotBlank String question, @NotBlank String answer,
                          ContentStatus status, int sortOrder) {}

    @GetMapping("/public/faqs")
    public List<Faq> published() {
        return repository.findAll().stream()
                .filter(item -> item.getStatus() == ContentStatus.PUBLISHED)
                .sorted((a, b) -> Integer.compare(a.getSortOrder(), b.getSortOrder())).toList();
    }

    @GetMapping("/admin/faqs")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public List<Faq> all() { return repository.findAll(); }

    @PostMapping("/admin/faqs")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Faq> create(@RequestBody Request request) {
        Faq item = new Faq(); apply(item, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(item));
    }

    @PutMapping("/admin/faqs/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public Faq update(@PathVariable UUID id, @RequestBody Request request) {
        Faq item = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "FAQ not found"));
        apply(item, request); return repository.save(item);
    }

    @DeleteMapping("/admin/faqs/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (!repository.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "FAQ not found");
        repository.deleteById(id); return ResponseEntity.noContent().build();
    }

    private void apply(Faq item, Request request) {
        item.setQuestion(request.question().trim()); item.setAnswer(request.answer().trim());
        item.setStatus(request.status() == null ? ContentStatus.DRAFT : request.status());
        item.setSortOrder(request.sortOrder());
    }
}
