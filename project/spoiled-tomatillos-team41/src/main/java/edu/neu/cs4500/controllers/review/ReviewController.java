package edu.neu.cs4500.controllers.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import javax.xml.ws.WebServiceException;

@RestController
public class ReviewController {

    @Autowired
    ReviewRepository reviewRepository;

    // Returns all reviews in the system
    @RequestMapping("/api/review/select/all")
    public List<Review> getReviews() {
        List<Review> reviews = (List<Review>) reviewRepository.findAll();
        return reviews;
    }

    // Adds a review for a movie with the given ImdbID
    @RequestMapping("/api/review/add/{imdbID}/{rating}/{review}/{username}")
    public Review addReview(@PathVariable("imdbID") String imdbID, @PathVariable("rating") int rating,
                            @PathVariable("review") String review, @PathVariable("username") String username) {
        try {
            Review newReview = new Review(imdbID, rating, review, username);
            reviewRepository.save(newReview);
            return newReview;
        } catch (Exception e) {
            throw new WebServiceException(e);
        }
    }

    // Returns all the reviews for a movie with the given ImdbID
    @RequestMapping("/api/review/select/{imdbID}")
    public List<Review> getReviewsForMovie(@PathVariable("imdbID") String imdbID) {
        List<Review> reviews = reviewRepository.findByImdbID(imdbID);
        return reviews;
    }

    // Deletes a review from a movie page
    @RequestMapping("/api/review/delete/{review_id}")
    public ResponseEntity<Review> deleteReview(@PathVariable("review_id") int id) {
        try {
            Review review = reviewRepository.findById(id);
            reviewRepository.delete(review);
            return ResponseEntity.ok(review);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
