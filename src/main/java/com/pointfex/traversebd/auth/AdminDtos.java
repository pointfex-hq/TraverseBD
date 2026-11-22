package com.pointfex.traversebd.auth;

import com.pointfex.traversebd.common.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AdminDtos {
    public record CreateRequest(@Email @NotBlank String email, String password,
                                @NotNull Role role) {}
    public record UpdateRequest(@Email @NotBlank String email, @NotNull Role role,
                                boolean active) {}
}
