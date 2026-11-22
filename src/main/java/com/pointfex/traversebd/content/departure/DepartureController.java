package com.pointfex.traversebd.content.departure;

import com.pointfex.traversebd.content.travelpackage.TravelPackageRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class DepartureController {
    private final DepartureRepository repository;
    private final TravelPackageRepository packageRepository;

    public DepartureController(DepartureRepository repository, TravelPackageRepository packageRepository) {
        this.repository = repository;
        this.packageRepository = packageRepository;
    }

    @GetMapping("/public/packages/{packageId}/departures")
    public List<Departure> published(@PathVariable UUID packageId) {
        return repository.findAll().stream()
                .filter(departure -> departure.getTravelPackage() != null &&
                        departure.getTravelPackage().getId().equals(packageId))
                .toList();
    }

    @GetMapping("/admin/departures")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public List<Departure> all() {
        return repository.findAll();
    }

    @PostMapping("/admin/departures")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Departure> create(@Valid @RequestBody DepartureDtos.Request request) {
        if (request.bookedSeats() > request.totalSeats()) {
            throw new IllegalArgumentException("Booked seats cannot exceed total seats");
        }
        Departure departure = new Departure();
        apply(departure, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(departure));
    }

    @PutMapping("/admin/departures/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public Departure update(@PathVariable UUID id, @Valid @RequestBody DepartureDtos.Request request) {
        Departure departure = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Departure not found"));
        if (request.bookedSeats() > request.totalSeats()) {
            throw new IllegalArgumentException("Booked seats cannot exceed total seats");
        }
        apply(departure, request);
        return repository.save(departure);
    }

    @DeleteMapping("/admin/departures/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (!repository.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Departure not found");
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private void apply(Departure departure, DepartureDtos.Request request) {
        departure.setTravelPackage(packageRepository.findById(request.packageId())
                .orElseThrow(() -> new IllegalArgumentException("Package not found")));
        departure.setDepartureDate(request.departureDate());
        departure.setTotalSeats(request.totalSeats());
        departure.setBookedSeats(request.bookedSeats());
        departure.setPriceOverride(request.priceOverride());
    }
}
