package com.pointfex.traversebd.media;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/media")
@PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
public class MediaController {
    private final String supabaseUrl;
    private final String serviceRoleKey;
    private final String bucket;

    public MediaController(@Value("${app.supabase.url}") String supabaseUrl,
                           @Value("${app.supabase.service-role-key}") String serviceRoleKey,
                           @Value("${app.supabase.storage-bucket}") String bucket) {
        this.supabaseUrl = supabaseUrl;
        this.serviceRoleKey = serviceRoleKey;
        this.bucket = bucket;
    }

    @PostMapping("/upload")
    public Map<String, String> upload(@RequestParam("file") MultipartFile file) throws Exception {
        if (file.isEmpty()) throw new IllegalArgumentException("File is required");
        if (file.getSize() > 5 * 1024 * 1024) throw new IllegalArgumentException("File exceeds 5 MB");
        String contentType = file.getContentType();
        String extension = validateAndGetExtension(contentType, file.getBytes());
        if (!StringUtils.hasText(supabaseUrl) || !StringUtils.hasText(serviceRoleKey)) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "Supabase Storage is not configured");
        }
        String objectName = UUID.randomUUID() + "." + extension;
        URI uri = URI.create(supabaseUrl.replaceAll("/$", "") +
                "/storage/v1/object/" + bucket + "/" + objectName);
        HttpRequest request = HttpRequest.newBuilder(uri)
                .header("apikey", serviceRoleKey)
                .header("Authorization", "Bearer " + serviceRoleKey)
                .header("Content-Type", contentType)
                .header("x-upsert", "false")
                .POST(HttpRequest.BodyPublishers.ofByteArray(file.getBytes()))
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient()
                .send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() >= 300) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY,
                    "Supabase Storage rejected the upload");
        }
        String publicUrl = supabaseUrl.replaceAll("/$", "") + "/storage/v1/object/public/" +
                bucket + "/" + objectName;
        return Map.of("url", publicUrl, "objectName", objectName);
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestParam("objectName") String objectName) throws Exception {
        if (!objectName.matches("[A-Za-z0-9_-]+\\.(jpg|jpeg|png|webp)")) {
            throw new IllegalArgumentException("Invalid object name");
        }
        URI uri = URI.create(supabaseUrl.replaceAll("/$", "") +
                "/storage/v1/object/" + bucket + "/" + objectName);
        HttpRequest request = HttpRequest.newBuilder(uri)
                .header("apikey", serviceRoleKey)
                .header("Authorization", "Bearer " + serviceRoleKey)
                .DELETE().build();
        HttpResponse<String> response = HttpClient.newHttpClient()
                .send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() >= 300) throw new ResponseStatusException(HttpStatus.BAD_GATEWAY,
                "Supabase Storage rejected the delete");
        return ResponseEntity.noContent().build();
    }

    private String validateAndGetExtension(String contentType, byte[] bytes) {
        if (!("image/jpeg".equals(contentType) || "image/png".equals(contentType) ||
                "image/webp".equals(contentType))) {
            throw new IllegalArgumentException("Only JPG, PNG or WebP images are allowed");
        }
        boolean jpeg = bytes.length >= 3 && (bytes[0] & 255) == 255 &&
                (bytes[1] & 255) == 216 && (bytes[2] & 255) == 255;
        boolean png = bytes.length >= 8 && (bytes[0] & 255) == 137 &&
                bytes[1] == 80 && bytes[2] == 78 && bytes[3] == 71;
        boolean webp = bytes.length >= 12 && bytes[0] == 82 && bytes[1] == 73 &&
                bytes[2] == 70 && bytes[8] == 87 && bytes[9] == 69 &&
                bytes[10] == 66 && bytes[11] == 80;
        if ("image/jpeg".equals(contentType) && jpeg) return "jpg";
        if ("image/png".equals(contentType) && png) return "png";
        if ("image/webp".equals(contentType) && webp) return "webp";
        throw new IllegalArgumentException("The file contents do not match its declared image type");
    }
}
