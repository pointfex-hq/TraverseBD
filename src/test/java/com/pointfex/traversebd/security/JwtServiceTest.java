package com.pointfex.traversebd.security;

import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class JwtServiceTest {
    @Test
    void createsAndValidatesSessionToken() {
        JwtService service = new JwtService("test-jwt-secret-that-is-at-least-32-bytes", 60);
        UUID id = UUID.randomUUID();

        String token = service.generateToken(id, "admin@traversebd.local", "SUPER_ADMIN");
        Claims claims = service.parse(token);

        assertThat(claims.getSubject()).isEqualTo(id.toString());
        assertThat(claims.get("email")).isEqualTo("admin@traversebd.local");
        assertThat(claims.get("role")).isEqualTo("SUPER_ADMIN");
    }
}
