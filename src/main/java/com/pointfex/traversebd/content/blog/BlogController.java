package com.pointfex.traversebd.content.blog;

import com.pointfex.traversebd.common.ContentStatus;
import com.pointfex.traversebd.common.SlugUtil;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class BlogController {
    private final BlogRepository repository;

    public BlogController(BlogRepository repository) {
        this.repository = repository;
    }

    public record Request(@NotBlank String title, String slug, String excerpt,
                          @NotBlank String content, String coverImageUrl, ContentStatus status) {}

    @GetMapping("/public/blog")
    public List<BlogPost> published() {
        return repository.findAll().stream()
                .filter(post -> post.getStatus() == ContentStatus.PUBLISHED)
                .sorted((a, b) -> b.getPublishedAt().compareTo(a.getPublishedAt()))
                .toList();
    }

    @GetMapping("/public/blog/{slug}")
    public BlogPost publishedOne(@PathVariable String slug) {
        return repository.findBySlug(slug)
                .filter(post -> post.getStatus() == ContentStatus.PUBLISHED)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Blog post not found"));
    }

    @GetMapping("/admin/blog")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public List<BlogPost> all() {
        return repository.findAll();
    }

    @PostMapping("/admin/blog")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<BlogPost> create(@Valid @RequestBody Request request) {
        BlogPost post = new BlogPost();
        apply(post, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(post));
    }

    @PutMapping("/admin/blog/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public BlogPost update(@PathVariable UUID id, @Valid @RequestBody Request request) {
        BlogPost post = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Blog post not found"));
        apply(post, request);
        return repository.save(post);
    }

    @DeleteMapping("/admin/blog/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (!repository.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Blog post not found");
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private void apply(BlogPost post, Request request) {
        post.setTitle(request.title().trim());
        post.setSlug(request.slug() == null || request.slug().isBlank()
                ? SlugUtil.slugify(request.title()) : SlugUtil.slugify(request.slug()));
        post.setExcerpt(request.excerpt());
        post.setContent(request.content());
        post.setCoverImageUrl(request.coverImageUrl());
        post.setStatus(request.status() == null ? ContentStatus.DRAFT : request.status());
        if (post.getStatus() == ContentStatus.PUBLISHED && post.getPublishedAt() == null) {
            post.setPublishedAt(Instant.now());
        }
        if (post.getStatus() == ContentStatus.DRAFT) post.setPublishedAt(null);
    }
}
