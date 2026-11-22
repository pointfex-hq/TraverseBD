package com.pointfex.traversebd.content.departure;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.LocalDate;
import java.util.UUID;

public class DepartureDtos {
    public record Request(
            @NotNull UUID packageId,
            @NotNull @FutureOrPresent LocalDate departureDate,
            @NotNull @Positive Integer totalSeats,
            @NotNull @PositiveOrZero Integer bookedSeats,
            Integer priceOverride
    ) {}
}
