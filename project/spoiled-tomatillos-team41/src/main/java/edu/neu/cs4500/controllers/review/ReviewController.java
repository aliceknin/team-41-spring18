package edu.neu.cs4500.controllers.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class ReviewController {

    @Autowired
    ReviewRepository reviewRepository;

    // Returns all reviews in the system
    @RequestMapping("/api/review/select/all")
    public List<Review> getReviews() {
        return reviewRepository.findAll();
    }

    // Adds a review for a movie with the given ImdbID
    @RequestMapping("/api/review/add/{imdbID}/{rating}/{review}/{username}")
    public Review addReview(@PathVariable("imdbID") String imdbID, @PathVariable("rating") int rating,
                            @PathVariable("review") String review, @PathVariable("username") String username) throws InstantiationException {
        Review newReview = new Review(imdbID, rating, review, username, 0);
        reviewRepository.save(newReview);
        return newReview;
    }

    // Returns all the reviews for a movie with the given ImdbID
    @RequestMapping("/api/review/select/{imdbID}")
    public List<Review> getReviewsForMovie(@PathVariable("imdbID") String imdbID) {
        return reviewRepository.findByImdbID(imdbID);
    }

    // Deletes a review from a movie page
    @RequestMapping("/api/review/delete/{review_id}")
    public ResponseEntity<Review> deleteReview(@PathVariable("review_id") int id) {
        Review review = reviewRepository.findById(id);
        reviewRepository.delete(review);
        return ResponseEntity.ok(review);
    }

    // Upvotes a review from a movie page
    @RequestMapping("/api/review/upvote/{review_id}")
    public ResponseEntity<Review> upvoteReview(@PathVariable("review_id") int id) {
        Review review = reviewRepository.findById(id);
        review.setUpvotes(review.getUpvotes() + 1);
        reviewRepository.save(review);
        return ResponseEntity.ok(review);
    }

    // Returns all the reviews submitted by the given user
    @RequestMapping("/api/review/select/user/{username}")
    public List<Review> getReviewsForUser(@PathVariable("username") String username) {
        return reviewRepository.findByUsername(username);
    }
}
