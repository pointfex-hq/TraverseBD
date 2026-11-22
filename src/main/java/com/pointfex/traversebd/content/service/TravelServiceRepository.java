package com.pointfex.traversebd.content.service;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface TravelServiceRepository extends JpaRepository<TravelService, UUID> {}
