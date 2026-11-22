package com.pointfex.traversebd.content.travelpackage;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface PackageItemRepository extends JpaRepository<PackageItem, UUID> {}
