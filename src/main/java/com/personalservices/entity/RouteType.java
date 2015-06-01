package com.personalservices.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "route_type")
public class RouteType {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "route_type_id")
    private int route_type_id;

    @Column(name = "route_type_name",length = 50)
    private String route_type_name;

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

    public RouteType() {
    }

    public RouteType(String route_type_name, int create_uid, Date create_date, int lastupd_uid, Date lastupd_date) {
        this.route_type_name = route_type_name;
        this.create_uid = create_uid;
        this.create_date = create_date;
        this.lastupd_uid = lastupd_uid;
        this.lastupd_date = lastupd_date;
    }

    public int getRoute_type_id() {
        return route_type_id;
    }

    public void setRoute_type_id(int route_type_id) {
        this.route_type_id = route_type_id;
    }

    public String getRoute_type_name() {
        return route_type_name;
    }

    public void setRoute_type_name(String route_type_name) {
        this.route_type_name = route_type_name;
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