package edu.neu.cs4500.controllers.recommendation;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name="recommendation")
public class Recommendation {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int recFromUserId;
    private int recToUserId;
    private int movieId;

    public Recommendation(int recFromUserId, int recToUserId, int movieId) {
        this.recFromUserId = recFromUserId;
        this.recToUserId = recToUserId;
        this.movieId = movieId;
    }

    public Recommendation() {

    }

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

    public int getMovieId() {
        return this.movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }
}
