package com.pointfex.traversebd.content.service;

import com.pointfex.traversebd.common.BaseEntity;
import com.pointfex.traversebd.common.ContentStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "travel_services")
public class TravelService extends BaseEntity {
    @Column(nullable = false) private String title;
    @Column(columnDefinition = "text") private String description;
    private String iconName;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private ContentStatus status = ContentStatus.DRAFT;
    @Column(nullable = false) private int sortOrder;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getIconName() { return iconName; }
    public void setIconName(String iconName) { this.iconName = iconName; }
    public ContentStatus getStatus() { return status; }
    public void setStatus(ContentStatus status) { this.status = status; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
}
