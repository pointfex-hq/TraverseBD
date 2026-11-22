package com.pointfex.traversebd.content.gallery;

import com.pointfex.traversebd.common.BaseEntity;
import com.pointfex.traversebd.common.ContentStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "gallery_images")
public class GalleryImage extends BaseEntity {
    @Column(nullable = false) private String imageUrl;
    private String caption;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private ContentStatus status = ContentStatus.DRAFT;
    @Column(nullable = false) private int sortOrder;

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getCaption() { return caption; }
    public void setCaption(String caption) { this.caption = caption; }
    public ContentStatus getStatus() { return status; }
    public void setStatus(ContentStatus status) { this.status = status; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
}
