package com.personalservices.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "route")
public class Route {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "route_id")
    private int route_id;

    @Column(name = "route_name",length = 50)
    private String route_name;

    @Column(name = "city_id")
    private int city_id;

    @Column(name = "route_type_id")
    private int route_type_id;

    @Column(name = "tot_duration")
    private int tot_duration;

    @Column(name = "peron_no")
    private int peron_no;

    @Column(name = "vehicle_type",length = 1)
    private int vehicle_type;

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

    public Route() {
    }

    public Route(String route_name, int city_id, int route_type_id, int tot_duration, int peron_no, int vehicle_type, int create_uid, Date create_date, int lastupd_uid, Date lastupd_date) {
        this.route_name = route_name;
        this.city_id = city_id;
        this.route_type_id = route_type_id;
        this.tot_duration = tot_duration;
        this.peron_no = peron_no;
        this.vehicle_type = vehicle_type;
        this.create_uid = create_uid;
        this.create_date = create_date;
        this.lastupd_uid = lastupd_uid;
        this.lastupd_date = lastupd_date;
    }

    public int getRoute_id() {
        return route_id;
    }

    public void setRoute_id(int route_id) {
        this.route_id = route_id;
    }

    public String getRoute_name() {
        return route_name;
    }

    public void setRoute_name(String route_name) {
        this.route_name = route_name;
    }

    public int getCity_id() {
        return city_id;
    }

    public void setCity_id(int city_id) {
        this.city_id = city_id;
    }

    public int getRoute_type_id() {
        return route_type_id;
    }

    public void setRoute_type_id(int route_type_id) {
        this.route_type_id = route_type_id;
    }

    public int getTot_duration() {
        return tot_duration;
    }

    public void setTot_duration(int tot_duration) {
        this.tot_duration = tot_duration;
    }

    public int getPeron_no() {
        return peron_no;
    }

    public void setPeron_no(int peron_no) {
        this.peron_no = peron_no;
    }

    public int getVehicle_type() {
        return vehicle_type;
    }

    public void setVehicle_type(int vehicle_type) {
        this.vehicle_type = vehicle_type;
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