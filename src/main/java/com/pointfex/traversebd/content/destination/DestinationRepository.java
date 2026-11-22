package com.pointfex.traversebd.content.destination;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface DestinationRepository extends JpaRepository<Destination, UUID> {
    Optional<Destination> findBySlug(String slug);
}
