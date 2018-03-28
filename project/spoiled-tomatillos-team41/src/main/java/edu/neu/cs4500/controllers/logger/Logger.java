package edu.neu.cs4500.controllers.logger;

import javax.persistence.*;
import java.util.Date;

@Entity(name="log")
public class Logger {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String apiCall;
    private Date created;
    private Date updated;

    public Logger(String apiCall) {
        this.apiCall = apiCall;
    }

    public Logger() {

    }

    @PrePersist
    protected void onCreate() {
        created = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updated = new Date();
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getApiCall() {
        return this.apiCall;
    }

    public void setApiCall(String apiCall) {
        this.apiCall = apiCall;
    }

    public Date getCreated() {
        return this.created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return this.updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }
}
