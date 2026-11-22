package com.pointfex.traversebd.content.travelpackage;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface TravelPackageRepository extends JpaRepository<TravelPackage, UUID> {
    Optional<TravelPackage> findBySlug(String slug);
}
