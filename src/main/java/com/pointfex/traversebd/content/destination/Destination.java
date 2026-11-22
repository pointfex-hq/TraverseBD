package com.pointfex.traversebd.content.destination;

import com.pointfex.traversebd.common.BaseEntity;
import com.pointfex.traversebd.common.ContentStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "destinations", uniqueConstraints = @UniqueConstraint(name = "uk_destination_slug", columnNames = "slug"))
public class Destination extends BaseEntity {
    @Column(nullable = false) private String name;
    @Column(nullable = false, unique = true) private String slug;
    private String region;
    @Column(columnDefinition = "text") private String shortDescription;
    @Column(columnDefinition = "text") private String fullDescription;
    private String coverImageUrl;
    @Column(columnDefinition = "text") private String highlights;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private ContentStatus status = ContentStatus.DRAFT;
    @Column(nullable = false) private boolean featured = false;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }
    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }
    public String getHighlights() { return highlights; }
    public void setHighlights(String highlights) { this.highlights = highlights; }
    public ContentStatus getStatus() { return status; }
    public void setStatus(ContentStatus status) { this.status = status; }
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
}
