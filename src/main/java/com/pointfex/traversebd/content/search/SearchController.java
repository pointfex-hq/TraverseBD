package com.pointfex.traversebd.content.search;

import com.pointfex.traversebd.common.ContentStatus;
import com.pointfex.traversebd.content.destination.DestinationRepository;
import com.pointfex.traversebd.content.travelpackage.TravelPackageRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/api/public/search")
public class SearchController {
    private final DestinationRepository destinations;
    private final TravelPackageRepository packages;

    public SearchController(DestinationRepository destinations, TravelPackageRepository packages) {
        this.destinations = destinations;
        this.packages = packages;
    }

    @GetMapping
    public Map<String, Object> search(@RequestParam String q) {
        String keyword = q.trim().toLowerCase(Locale.ROOT);
        if (keyword.isBlank()) return Map.of("destinations", List.of(), "packages", List.of());
        var destinationResults = destinations.findAll().stream()
                .filter(item -> item.getStatus() == ContentStatus.PUBLISHED)
                .filter(item -> item.getName().toLowerCase(Locale.ROOT).contains(keyword) ||
                        (item.getRegion() != null && item.getRegion().toLowerCase(Locale.ROOT).contains(keyword)))
                .toList();
        var packageResults = packages.findAll().stream()
                .filter(item -> item.getStatus() == ContentStatus.PUBLISHED)
                .filter(item -> item.getTitle().toLowerCase(Locale.ROOT).contains(keyword) ||
                        (item.getDestination() != null && item.getDestination().getName()
                                .toLowerCase(Locale.ROOT).contains(keyword)) ||
                        (item.getCategory() != null && item.getCategory().getName()
                                .toLowerCase(Locale.ROOT).contains(keyword)))
                .toList();
        return Map.of("destinations", destinationResults, "packages", packageResults);
    }
}
