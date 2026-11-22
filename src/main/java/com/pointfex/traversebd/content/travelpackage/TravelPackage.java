package com.pointfex.traversebd.content.travelpackage;

import com.pointfex.traversebd.common.BaseEntity;
import com.pointfex.traversebd.common.ContentStatus;
import com.pointfex.traversebd.content.category.Category;
import com.pointfex.traversebd.content.destination.Destination;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "packages", uniqueConstraints = @UniqueConstraint(name = "uk_package_slug", columnNames = "slug"))
public class TravelPackage extends BaseEntity {
    @Column(nullable = false) private String title;
    @Column(nullable = false, unique = true) private String slug;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "destination_id") private Destination destination;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "category_id") private Category category;
    @Column(nullable = false) private Integer price;
    @Column(nullable = false) private Integer durationDays;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PriceMode priceMode = PriceMode.FIXED;
    @Column(columnDefinition = "text") private String shortDescription;
    @Column(columnDefinition = "text") private String fullDescription;
    private String coverImageUrl;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private ContentStatus status = ContentStatus.DRAFT;
    @Column(nullable = false) private boolean featured = false;
    @Column(nullable = false) private boolean trending = false;

    @OneToMany(mappedBy = "travelPackage", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PackageItem> items = new ArrayList<>();

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public Destination getDestination() { return destination; }
    public void setDestination(Destination destination) { this.destination = destination; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    public Integer getPrice() { return price; }
    public void setPrice(Integer price) { this.price = price; }
    public Integer getDurationDays() { return durationDays; }
    public void setDurationDays(Integer durationDays) { this.durationDays = durationDays; }
    public PriceMode getPriceMode() { return priceMode; }
    public void setPriceMode(PriceMode priceMode) { this.priceMode = priceMode; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }
    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }
    public ContentStatus getStatus() { return status; }
    public void setStatus(ContentStatus status) { this.status = status; }
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
    public boolean isTrending() { return trending; }
    public void setTrending(boolean trending) { this.trending = trending; }
    public List<PackageItem> getItems() { return items; }
}
