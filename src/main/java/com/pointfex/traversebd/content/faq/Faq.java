package com.pointfex.traversebd.content.faq;

import com.pointfex.traversebd.common.BaseEntity;
import com.pointfex.traversebd.common.ContentStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "faqs")
public class Faq extends BaseEntity {
    @Column(nullable = false) private String question;
    @Column(nullable = false, columnDefinition = "text") private String answer;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private ContentStatus status = ContentStatus.DRAFT;
    @Column(nullable = false) private int sortOrder;
    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }
    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }
    public ContentStatus getStatus() { return status; }
    public void setStatus(ContentStatus status) { this.status = status; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
}
