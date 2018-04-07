package edu.neu.cs4500.controllers.system.recommendations;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name="system_recommendation")
public class SystemRecommendation {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String username;
    private String imdbID;

    public SystemRecommendation(String username, String imdbID) {
        this.username = username;
        this.imdbID = imdbID;
    }

    public SystemRecommendation() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getImdbID() {
        return imdbID;
    }

    public void setImdbID(String imdbID) {
        this.imdbID = imdbID;
    }
}
