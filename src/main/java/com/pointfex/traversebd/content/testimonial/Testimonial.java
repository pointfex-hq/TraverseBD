package com.pointfex.traversebd.content.testimonial;

import com.pointfex.traversebd.common.BaseEntity;
import com.pointfex.traversebd.common.ContentStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "testimonials")
public class Testimonial extends BaseEntity {
    @Column(nullable = false) private String name;
    @Column(nullable = false, columnDefinition = "text") private String quote;
    private Integer rating;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private ContentStatus status = ContentStatus.DRAFT;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getQuote() { return quote; }
    public void setQuote(String quote) { this.quote = quote; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public ContentStatus getStatus() { return status; }
    public void setStatus(ContentStatus status) { this.status = status; }
}
