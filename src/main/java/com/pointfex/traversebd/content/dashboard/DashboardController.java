package com.pointfex.traversebd.content.dashboard;

import com.pointfex.traversebd.auth.AdminUserRepository;
import com.pointfex.traversebd.common.ContentStatus;
import com.pointfex.traversebd.content.category.CategoryRepository;
import com.pointfex.traversebd.content.destination.DestinationRepository;
import com.pointfex.traversebd.content.travelpackage.TravelPackageRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
@PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
public class DashboardController {
    private final DestinationRepository destinations;
    private final TravelPackageRepository packages;
    private final CategoryRepository categories;
    private final AdminUserRepository users;

    public DashboardController(DestinationRepository destinations, TravelPackageRepository packages,
                               CategoryRepository categories, AdminUserRepository users) {
        this.destinations = destinations;
        this.packages = packages;
        this.categories = categories;
        this.users = users;
    }

    @GetMapping
    public Map<String, Object> counts() {
        long publishedDestinations = destinations.findAll().stream()
                .filter(item -> item.getStatus() == ContentStatus.PUBLISHED).count();
        long publishedPackages = packages.findAll().stream()
                .filter(item -> item.getStatus() == ContentStatus.PUBLISHED).count();
        return Map.of(
                "destinations", destinations.count(),
                "publishedDestinations", publishedDestinations,
                "packages", packages.count(),
                "publishedPackages", publishedPackages,
                "categories", categories.count(),
                "admins", users.count()
        );
    }
}
