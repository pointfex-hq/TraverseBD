package com.pointfex.traversebd.content.settings;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "site_settings")
public class SiteSetting {
    @Id
    @Column(name = "setting_key", nullable = false)
    private String key;
    @Column(columnDefinition = "text", nullable = false)
    private String value;

    public String getKey() { return key; }
    public void setKey(String key) { this.key = key; }
    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }
}
