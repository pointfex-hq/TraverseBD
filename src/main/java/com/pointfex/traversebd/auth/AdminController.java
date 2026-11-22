package com.pointfex.traversebd.auth;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class AdminController {
    private final AdminUserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AdminController(AdminUserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public List<AdminUser> all() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<AdminUser> create(@Valid @RequestBody AdminDtos.CreateRequest request) {
        String email = request.email().trim().toLowerCase();
        if (repository.findByEmailIgnoreCase(email).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Admin email already exists");
        }
        AdminUser user = new AdminUser();
        user.setEmail(email);
        user.setRole(request.role());
        user.setActive(true);
        if (request.password() != null && !request.password().isBlank()) {
            user.setPasswordHash(passwordEncoder.encode(request.password()));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(user));
    }

    @PutMapping("/{id}")
    public AdminUser update(@PathVariable UUID id, @Valid @RequestBody AdminDtos.UpdateRequest request) {
        AdminUser user = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found"));
        user.setEmail(request.email().trim().toLowerCase());
        user.setRole(request.role());
        user.setActive(request.active());
        return repository.save(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        long activeSuperAdmins = repository.findAll().stream()
                .filter(AdminUser::isActive)
                .filter(user -> user.getRole().name().equals("SUPER_ADMIN"))
                .count();
        AdminUser user = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found"));
        if (user.getRole().name().equals("SUPER_ADMIN") && activeSuperAdmins <= 1) {
            throw new IllegalArgumentException("At least one active Super Admin must remain");
        }
        repository.delete(user);
        return ResponseEntity.noContent().build();
    }
}
