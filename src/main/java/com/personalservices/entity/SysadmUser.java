package com.personalservices.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "sysadm_user")
public class SysadmUser {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "sysadm_uid")
    private int sysadm_uid;

    @Column(name = "first_name",length = 30)
    private String first_name;

    @Column(name = "last_name",length = 30)
    private String last_name;

    @Column(name = "username",length = 30)
    private String username;

    @Column(name = "password",length = 30)
    private String password;

    public SysadmUser() {
    }

    public int getSysadm_uid() {
        return sysadm_uid;
    }

    public void setSysadm_uid(int sysadm_uid) {
        this.sysadm_uid = sysadm_uid;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}