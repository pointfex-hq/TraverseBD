package com.pointfex.traversebd.content.settings;

import com.pointfex.traversebd.common.SlugUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/settings")
@PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
public class SettingsController {
    private final SiteSettingRepository repository;

    public SettingsController(SiteSettingRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public Map<String, String> getAll() {
        Map<String, String> result = new LinkedHashMap<>();
        repository.findAll().forEach(setting -> result.put(setting.getKey(), setting.getValue()));
        return result;
    }


    @PutMapping
    public ResponseEntity<Map<String, String>> update(@Valid @RequestBody SettingsDtos.UpdateMapRequest request) {
        request.settings().forEach((key, value) -> {
            String normalized = key.trim();
            if (!normalized.matches("[a-z0-9_]+")) {
                throw new IllegalArgumentException("Setting key must contain only lowercase letters, digits and underscores");
            }
            SiteSetting setting = repository.findById(normalized).orElseGet(SiteSetting::new);
            setting.setKey(normalized);
            setting.setValue(value);
            repository.save(setting);
        });
        Map<String, String> result = new LinkedHashMap<>();
        repository.findAll().forEach(setting -> result.put(setting.getKey(), setting.getValue()));
        return ResponseEntity.ok(result);
    }
}
