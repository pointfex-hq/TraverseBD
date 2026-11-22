package com.pointfex.traversebd.content.travelpackage;

import com.pointfex.traversebd.common.ContentStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class TravelPackageDtos {
    public record ItemRequest(@NotBlank String type, @NotBlank String text, int sortOrder) {}
    public record Request(
            @NotBlank String title,
            String slug,
            UUID destinationId,
            UUID categoryId,
            @Positive Integer price,
            @Positive Integer durationDays,
            PriceMode priceMode,
            String shortDescription,
            String fullDescription,
            String coverImageUrl,
            ContentStatus status,
            boolean featured,
            boolean trending,
            @Valid List<ItemRequest> items
    ) {}
}
