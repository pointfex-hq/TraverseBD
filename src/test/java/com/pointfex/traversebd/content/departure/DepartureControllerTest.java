package com.pointfex.traversebd.content.departure;

import com.pointfex.traversebd.content.travelpackage.TravelPackageRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verifyNoInteractions;

class DepartureControllerTest {
    @Test
    void rejectsBookedSeatsGreaterThanCapacity() {
        DepartureRepository departures = mock(DepartureRepository.class);
        TravelPackageRepository packages = mock(TravelPackageRepository.class);
        DepartureController controller = new DepartureController(departures, packages);
        DepartureDtos.Request request = new DepartureDtos.Request(
                UUID.randomUUID(), LocalDate.now().plusDays(1), 10, 11, null);

        assertThatThrownBy(() -> controller.create(request))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Booked seats");
        verifyNoInteractions(departures, packages);
    }
}
