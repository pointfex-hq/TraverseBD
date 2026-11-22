package com.pointfex.traversebd.content.gallery;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface GalleryRepository extends JpaRepository<GalleryImage, UUID> {}
