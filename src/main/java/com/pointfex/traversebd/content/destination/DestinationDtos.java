package com.pointfex.traversebd.content.destination;

import com.pointfex.traversebd.common.ContentStatus;
import jakarta.validation.constraints.NotBlank;

public class DestinationDtos {
    public record Request(
            @NotBlank String name,
            String slug,
            String region,
            String shortDescription,
            String fullDescription,
            String coverImageUrl,
            String highlights,
            ContentStatus status,
            boolean featured
    ) {}
}
