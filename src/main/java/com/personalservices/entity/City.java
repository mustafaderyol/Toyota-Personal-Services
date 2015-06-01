package com.personalservices.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "city")
public class City {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "city_id")
    private int city_id;

    @Column(name = "city_name",length = 50)
    private String city_name;

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

    public City() {
    }

    public City(String city_name, int create_uid, Date create_date, int lastupd_uid, Date lastupd_date) {
        this.city_name = city_name;
        this.create_uid = create_uid;
        this.create_date = create_date;
        this.lastupd_uid = lastupd_uid;
        this.lastupd_date = lastupd_date;
    }

    public int getCity_id() {
        return city_id;
    }

    public void setCity_id(int city_id) {
        this.city_id = city_id;
    }

    public String getCity_name() {
        return city_name;
    }

    public void setCity_name(String city_name) {
        this.city_name = city_name;
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