package com.personalservices.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "station")
public class Station {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "station_id")
    private int station_id;

    @Column(name = "station_name",length = 50)
    private String station_name;

    @Column(name = "route_id")
    private int route_id;

    @Column(name = "station_no")
    private int station_no;

    @Column(name = "arrival_time",length = 5)
    private String arrival_time;

    @Column(name = "departure_time",length = 5)
    private String departure_time;

    @Column(name = "create_uid")
    private int create_uid;

    @Temporal(TemporalType.DATE)
    @Column(name = "create_date")
    private Date create_date;

    @Column(name = "lastupd_uid")
    private int lastupd_uid;

    @Temporal(TemporalType.DATE)
    @Column(name = "lastupd_date")
    private Date lastupd_date;

    public Station() {
    }

    public Station(String station_name, int route_id, int station_no, String arrival_time, String departure_time, int create_uid, Date create_date, int lastupd_uid, Date lastupd_date) {
        this.station_name = station_name;
        this.route_id = route_id;
        this.station_no = station_no;
        this.arrival_time = arrival_time;
        this.departure_time = departure_time;
        this.create_uid = create_uid;
        this.create_date = create_date;
        this.lastupd_uid = lastupd_uid;
        this.lastupd_date = lastupd_date;
    }

    public int getStation_id() {
        return station_id;
    }

    public void setStation_id(int station_id) {
        this.station_id = station_id;
    }

    public String getStation_name() {
        return station_name;
    }

    public void setStation_name(String station_name) {
        this.station_name = station_name;
    }

    public int getRoute_id() {
        return route_id;
    }

    public void setRoute_id(int route_id) {
        this.route_id = route_id;
    }

    public int getStation_no() {
        return station_no;
    }

    public void setStation_no(int station_no) {
        this.station_no = station_no;
    }

    public String getArrival_time() {
        return arrival_time;
    }

    public void setArrival_time(String arrival_time) {
        this.arrival_time = arrival_time;
    }

    public String getDeparture_time() {
        return departure_time;
    }

    public void setDeparture_time(String departure_time) {
        this.departure_time = departure_time;
    }

    public int getCreate_uid() {
        return create_uid;
    }

    public void setCreate_uid(int create_uid) {
        this.create_uid = create_uid;
    }

    public Date getCreate_date() {
        return create_date;
    }

    public void setCreate_date(Date create_date) {
        this.create_date = create_date;
    }

    public int getLastupd_uid() {
        return lastupd_uid;
    }

    public void setLastupd_uid(int lastupd_uid) {
        this.lastupd_uid = lastupd_uid;
    }

    public Date getLastupd_date() {
        return lastupd_date;
    }

    public void setLastupd_date(Date lastupd_date) {
        this.lastupd_date = lastupd_date;
    }
}