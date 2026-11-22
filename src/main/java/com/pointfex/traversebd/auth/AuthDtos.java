package com.pointfex.traversebd.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthDtos {
    public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}
    public record GoogleRequest(@NotBlank String idToken) {}
    public record AuthResponse(String accessToken, String email, String role) {}
}
