package com.pointfex.traversebd.content.faq;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface FaqRepository extends JpaRepository<Faq, UUID> {}
