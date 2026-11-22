package com.pointfex.traversebd.content.blog;

import com.pointfex.traversebd.common.BaseEntity;
import com.pointfex.traversebd.common.ContentStatus;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "blog_posts", uniqueConstraints = @UniqueConstraint(name = "uk_blog_slug", columnNames = "slug"))
public class BlogPost extends BaseEntity {
    @Column(nullable = false) private String title;
    @Column(nullable = false, unique = true) private String slug;
    @Column(columnDefinition = "text") private String excerpt;
    @Column(columnDefinition = "text", nullable = false) private String content;
    private String coverImageUrl;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private ContentStatus status = ContentStatus.DRAFT;
    private Instant publishedAt;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getExcerpt() { return excerpt; }
    public void setExcerpt(String excerpt) { this.excerpt = excerpt; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }
    public ContentStatus getStatus() { return status; }
    public void setStatus(ContentStatus status) { this.status = status; }
    public Instant getPublishedAt() { return publishedAt; }
    public void setPublishedAt(Instant publishedAt) { this.publishedAt = publishedAt; }
}
