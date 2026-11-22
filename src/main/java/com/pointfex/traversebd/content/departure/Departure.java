package com.pointfex.traversebd.content.departure;

import com.pointfex.traversebd.common.BaseEntity;
import com.pointfex.traversebd.content.travelpackage.TravelPackage;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "departures")
public class Departure extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id", nullable = false)
    private TravelPackage travelPackage;
    @Column(nullable = false) private LocalDate departureDate;
    @Column(nullable = false) private Integer totalSeats;
    @Column(nullable = false) private Integer bookedSeats = 0;
    @Column(nullable = false) private Integer priceOverride;

    public TravelPackage getTravelPackage() { return travelPackage; }
    public void setTravelPackage(TravelPackage travelPackage) { this.travelPackage = travelPackage; }
    public LocalDate getDepartureDate() { return departureDate; }
    public void setDepartureDate(LocalDate departureDate) { this.departureDate = departureDate; }
    public Integer getTotalSeats() { return totalSeats; }
    public void setTotalSeats(Integer totalSeats) { this.totalSeats = totalSeats; }
    public Integer getBookedSeats() { return bookedSeats; }
    public void setBookedSeats(Integer bookedSeats) { this.bookedSeats = bookedSeats; }
    public Integer getPriceOverride() { return priceOverride; }
    public void setPriceOverride(Integer priceOverride) { this.priceOverride = priceOverride; }
}
