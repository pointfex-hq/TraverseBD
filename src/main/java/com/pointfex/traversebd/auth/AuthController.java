package com.pointfex.traversebd.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.pointfex.traversebd.security.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AdminUserRepository users;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final String googleClientId;
    private final boolean cookieSecure;
    private final String cookieSameSite;

    public AuthController(AdminUserRepository users, PasswordEncoder passwordEncoder,
                          JwtService jwtService,
                          @Value("${app.google.client-id}") String googleClientId,
                          @Value("${app.cookie.secure:false}") boolean cookieSecure,
                          @Value("${app.cookie.same-site:Lax}") String cookieSameSite) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.googleClientId = googleClientId;
        this.cookieSecure = cookieSecure;
        this.cookieSameSite = cookieSameSite;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDtos.AuthResponse> login(@Valid @RequestBody AuthDtos.LoginRequest request,
                                                        HttpServletResponse response) {
        AdminUser user = users.findByEmailIgnoreCase(request.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
        if (!user.isActive() || user.getPasswordHash() == null ||
                !passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
        return authenticated(user, response);
    }

    @PostMapping("/google")
    public ResponseEntity<AuthDtos.AuthResponse> google(@Valid @RequestBody AuthDtos.GoogleRequest request,
                                                        HttpServletResponse response) {
        if (googleClientId == null || googleClientId.isBlank()) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Google sign-in is not configured");
        }
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(), GsonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();
            GoogleIdToken token = verifier.verify(request.idToken());
            if (token == null) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Google token");
            GoogleIdToken.Payload payload = token.getPayload();
            String email = payload.getEmail();
            String subject = payload.getSubject();
            AdminUser user = users.findByEmailIgnoreCase(email)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                            "Google account is not provisioned in TraverseBD"));
            if (!user.isActive()) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account disabled");
            user.setGoogleSubject(subject);
            users.save(user);
            return authenticated(user, response);
        } catch (ResponseStatusException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Google token", ex);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("ADMIN_SESSION", "")
                .httpOnly(true).secure(cookieSecure).sameSite(cookieSameSite)
                .path("/").maxAge(0).build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.noContent().build();
    }

    private ResponseEntity<AuthDtos.AuthResponse> authenticated(AdminUser user, HttpServletResponse response) {
        String token = jwtService.generateToken(user.getId(), user.getEmail(), user.getRole().name());
        ResponseCookie cookie = ResponseCookie.from("ADMIN_SESSION", token)
                .httpOnly(true).secure(cookieSecure).sameSite(cookieSameSite)
                .path("/").maxAge(60 * 60).build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(new AuthDtos.AuthResponse(token, user.getEmail(), user.getRole().name()));
    }
}
