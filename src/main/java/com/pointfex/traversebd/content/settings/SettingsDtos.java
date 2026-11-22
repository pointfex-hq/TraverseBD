package com.pointfex.traversebd.content.settings;

import jakarta.validation.constraints.NotBlank;
import java.util.Map;

public class SettingsDtos {
    public record UpdateRequest(@NotBlank String key, @NotBlank String value) {}
    public record UpdateMapRequest(Map<@NotBlank String, @NotBlank String> settings) {}
}
