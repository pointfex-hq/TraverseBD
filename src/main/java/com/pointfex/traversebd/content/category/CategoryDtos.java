package com.pointfex.traversebd.content.category;

import com.pointfex.traversebd.common.ContentStatus;
import jakarta.validation.constraints.NotBlank;

public class CategoryDtos {
    public record Request(@NotBlank String name, String slug, ContentStatus status, int sortOrder) {}
}
