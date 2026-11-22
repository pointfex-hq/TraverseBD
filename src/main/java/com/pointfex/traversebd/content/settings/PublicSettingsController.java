package com.pointfex.traversebd.content.settings;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public/settings")
public class PublicSettingsController {
    private final SiteSettingRepository repository;

    public PublicSettingsController(SiteSettingRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public Map<String, String> getPublicSettings() {
        Map<String, String> result = new LinkedHashMap<>();
        for (String key : List.of("contact_phone", "contact_email", "address", "social_links",
                "whatsapp_number", "whatsapp_message", "hero_title", "hero_subtitle",
                "footer_text", "brand_name")) {
            repository.findById(key).ifPresent(setting ->
                    result.put(setting.getKey(), setting.getValue()));
        }
        return result;
    }
}
