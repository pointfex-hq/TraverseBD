package com.pointfex.traversebd.content.departure;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface DepartureRepository extends JpaRepository<Departure, UUID> {}
