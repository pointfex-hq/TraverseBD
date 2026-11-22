package com.pointfex.traversebd.common;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

class SlugUtilTest {
    @Test
    void createsUrlSafeSlug() {
        assertThat(SlugUtil.slugify("  Cox's Bazar Tour  "))
                .isEqualTo("cox-s-bazar-tour");
    }
}
