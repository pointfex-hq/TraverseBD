package com.pointfex.traversebd.content.travelpackage;

import com.pointfex.traversebd.common.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "package_items")
public class PackageItem extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id", nullable = false)
    private TravelPackage travelPackage;
    @Column(nullable = false) private String type;
    @Column(nullable = false, columnDefinition = "text") private String text;
    @Column(nullable = false) private int sortOrder;

    public TravelPackage getTravelPackage() { return travelPackage; }
    public void setTravelPackage(TravelPackage travelPackage) { this.travelPackage = travelPackage; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
}
