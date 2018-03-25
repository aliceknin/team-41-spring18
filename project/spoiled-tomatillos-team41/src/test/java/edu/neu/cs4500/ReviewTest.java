package edu.neu.cs4500;

import edu.neu.cs4500.controllers.review.Review;
import edu.neu.cs4500.controllers.review.ReviewController;
import edu.neu.cs4500.controllers.review.ReviewRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;

@RunWith(MockitoJUnitRunner.class)
public class ReviewTest {

    @InjectMocks
    private ReviewController reviewController;
    @Mock
    private ReviewRepository reviewRepository;

    @Test
    public void getReviewsTest() throws InstantiationException {
        Review posReview = new Review("235264", 8, "I love this movie",
                "nicolepristin", 0);
        Review negReview = new Review("9823598", 2, "This is the worst movie evah",
                "npristin", 0);
        List<Review> reviews = new ArrayList<>();
        reviews.add(posReview);
        reviews.add(negReview);

        Mockito.when(reviewRepository.findAll()).thenReturn(reviews);

        List<Review> reviewsFromController = reviewController.getReviews();
        assertEquals(reviews, reviewsFromController);
    }

    @Test
    public void createReviewTest() throws InstantiationException {
        Review review = new Review("235264", 8, "I love this movie",
                "nicolepristin", 0);

        ResponseEntity<Review> responseEntity = new ResponseEntity<>(review, HttpStatus.OK);
        Mockito.when(reviewRepository.save(review)).thenReturn(responseEntity.getBody());

        reviewController.addReview(review.getImdbID(), review.getRating(), review.getComment(),
                review.getUsername());
    }

    @Test(expected = InstantiationException.class)
    public void createReviewRatingOver10() throws InstantiationException {
        Review review = new Review("sdg23898", 15, "This is a very good movie",
                "nicolepristin", 0);
    }

    @Test(expected = InstantiationException.class)
    public void createReviewWithRatingUnder0() throws InstantiationException {
        Review review = new Review("sdg23898", -2, "This is a very good movie",
                "nicolepristin", 0);
    }

    @Test
    public void testGetReviewsForMovie() throws InstantiationException {
        Review posReview = new Review("235264", 8, "I love this movie",
                "nicolepristin", 0);
        Review negReview = new Review("9823598", 2, "This is the worst movie evah",
                "npristin", 0);
        List<Review> reviews = new ArrayList<>();
        reviews.add(posReview);
        reviews.add(negReview);

        ResponseEntity<List<Review>> responseEntity = new ResponseEntity<>(reviews, HttpStatus.OK);
        Mockito.when(reviewRepository.findByImdbID("235264")).thenReturn(responseEntity.getBody());

        List<Review> revs = reviewController.getReviewsForMovie("235264");
        assertEquals(revs.size(), reviews.size());
    }

    @Test
    public void testDeleteReview() throws InstantiationException {
        Review review = new Review("235264", 8, "I love this movie",
                "nicolepristin", 0);
        review.setId(13);

        ResponseEntity<Review> responseEntity = new ResponseEntity<>(review, HttpStatus.OK);
        Mockito.when(reviewRepository.findById(13)).thenReturn(responseEntity.getBody());

        reviewController.deleteReview(13);
        Mockito.verify(reviewRepository, times(1)).delete(review);
    }

    @Test
    public void testUpvoteReview() throws InstantiationException {
        Review review = new Review("235264", 8, "I love this movie",
                "nicolepristin", 0);
        Review reviewUpvoted = new Review("235264", 8, "I love this movie",
                "nicolepristin", 1);
        review.setId(7);

        ResponseEntity<Review> responseEntity = new ResponseEntity<>(review, HttpStatus.OK);
        ResponseEntity<Review> responseEntity1 = new ResponseEntity<>(reviewUpvoted, HttpStatus.OK);
        Mockito.when(reviewRepository.findById(7)).thenReturn(responseEntity.getBody());
        Mockito.when(reviewRepository.save(reviewUpvoted)).thenReturn(responseEntity1.getBody());

        reviewController.upvoteReview(7);
        assertEquals(review.getUpvotes(), 1);
    }

    @Test
    public void testGettersSetters() throws InstantiationException {
        Review rev1 = new Review();

        rev1.setId(98);
        rev1.setImdbID("9823dkgjl");
        rev1.setRating(5);
        rev1.setComment("This movie was decent");
        rev1.setUsername("npristin");
        rev1.setUpvotes(4);

        assertEquals(rev1.getId(), 98);
        assertEquals(rev1.getImdbID(), "9823dkgjl");
        assertEquals(rev1.getRating(), 5);
        assertEquals(rev1.getComment(), "This movie was decent");
        assertEquals(rev1.getUsername(), "npristin");
        assertEquals(rev1.getUpvotes(), 4);
    }
}
