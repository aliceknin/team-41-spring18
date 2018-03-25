package edu.neu.cs4500.controllers.recommendation;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name="recommendation")
public class Recommendation {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private int recFromUserId;
    private int recToUserId;
    private String IMDBMovieId;

    public Recommendation(int recFromUserId, int recToUserId, String IMDBMovieId) {
        this.recFromUserId = recFromUserId;
        this.recToUserId = recToUserId;
        this.IMDBMovieId = IMDBMovieId;
    }

    public Recommendation() {

    }

    public int getId() { return this.id; }

    public void setId(int id) { this.id = id; }

    public int getRecFromUserId() {
        return this.recFromUserId;
    }

    public void setRecFromUserId(int recFromUserId) {
        this.recFromUserId = recFromUserId;
    }

    public int getRecToUserId() {
        return this.recToUserId;
    }

    public void setRecToUserId(int recToUserId) {
        this.recToUserId = recToUserId;
    }

    public String getIMDBMovieId() {
        return this.IMDBMovieId;
    }

    public void setIMDBMovieId(String IMDBMovieId) {
        this.IMDBMovieId = IMDBMovieId;
    }
}
