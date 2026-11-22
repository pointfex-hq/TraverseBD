package com.pointfex.traversebd.config;

import com.pointfex.traversebd.auth.AdminUser;
import com.pointfex.traversebd.auth.AdminUserRepository;
import com.pointfex.traversebd.common.Role;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SeedConfig {
    @Bean
    CommandLineRunner seedAdmin(AdminUserRepository users, PasswordEncoder encoder,
                                @Value("${app.seed.admin.email}") String email,
                                @Value("${app.seed.admin.password}") String password) {
        return args -> users.findByEmailIgnoreCase(email).orElseGet(() -> {
            AdminUser admin = new AdminUser();
            admin.setEmail(email.trim().toLowerCase());
            admin.setPasswordHash(encoder.encode(password));
            admin.setRole(Role.SUPER_ADMIN);
            admin.setActive(true);
            return users.save(admin);
        });
    }
}
