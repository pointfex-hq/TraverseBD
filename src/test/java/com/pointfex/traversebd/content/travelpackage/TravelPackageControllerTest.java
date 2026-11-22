package com.pointfex.traversebd.content.travelpackage;

import com.pointfex.traversebd.content.category.CategoryRepository;
import com.pointfex.traversebd.content.destination.DestinationRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verifyNoInteractions;

class TravelPackageControllerTest {
    @Test
    void rejectsZeroPrice() {
        TravelPackageRepository packages = mock(TravelPackageRepository.class);
        DestinationRepository destinations = mock(DestinationRepository.class);
        CategoryRepository categories = mock(CategoryRepository.class);
        TravelPackageController controller = new TravelPackageController(packages, destinations, categories);
        TravelPackageDtos.Request request = new TravelPackageDtos.Request(
                "Test Tour", null, null, null, 0, 3, null, null, null, null,
                null, false, false, List.of());

        assertThatThrownBy(() -> controller.create(request))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Price");
    }
}
