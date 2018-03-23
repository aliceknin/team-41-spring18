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

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

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


}
