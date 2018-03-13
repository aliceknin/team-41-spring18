package edu.neu.cs4500.controllers.review;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name="review")
public class Review {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    private String imdbID;
    private int rating;
    private String comment;
    private String username;

    public Review(String imdbID, int rating, String comment, String username) throws InstantiationException {
        if (rating < 0 || rating > 10) {
            throw new InstantiationException("Rating for review must be in the range 0-10.");
        }
        this.imdbID = imdbID;
        this.rating = rating;
        this.comment = comment;
        this.username = username;
    }

    public Review() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImdbID() {
        return imdbID;
    }

    public void setImdbID(String imdbID) {
        this.imdbID = imdbID;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
