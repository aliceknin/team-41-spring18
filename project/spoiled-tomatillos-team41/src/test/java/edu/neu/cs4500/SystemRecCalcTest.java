package edu.neu.cs4500;

import edu.neu.cs4500.controllers.review.Review;
import edu.neu.cs4500.controllers.review.ReviewRepository;
import edu.neu.cs4500.controllers.system.recommendations.SystemRecCalculator;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class SystemRecCalcTest {

    @InjectMocks
    private SystemRecCalculator recCalculator;
    @Mock
    private ReviewRepository reviewRepository;

    @Test
    public void testCosineSimilarity() {
        List<Double> vector1 = new ArrayList<>();
        List<Double> vector2 = new ArrayList<>();

        vector1.add(2.0);
        vector1.add(3.7);
        vector2.add(5.8);
        vector2.add(9.2);

        recCalculator.cosineSimilarity(vector1, vector2);
    }

    @Test
    public void testCalcUserMovieMatrix() throws InstantiationException {
        Review review1 = new Review("tt0111161", 5, "", "testUser", 0);
        Review review2 = new Review("tt2294629", 3, "", "testUser", 0);
        Review review3 = new Review("tt1130884", 2, "", "testUser", 0);
        Review review4 = new Review("tt0111161", 4, "", "anotherTestUser", 0);
        Review review5 = new Review("tt2294629", 7, "", "anotherTestUser", 0);
        Review review6 = new Review("tt0111161", 7, "", "thirdTestUser", 0);
        Review review7 = new Review("tt1130884", 8, "", "thirdTestUser", 0);

        List<Review> reviews = new ArrayList<>();
        reviews.add(review1);
        reviews.add(review2);
        reviews.add(review3);
        reviews.add(review4);
        reviews.add(review5);
        reviews.add(review6);
        reviews.add(review7);

        Mockito.when(reviewRepository.findAll()).thenReturn(reviews);
        Mockito.when(reviewRepository.findByImdbIDAndUsername("tt0111161", "testUser"))
                .thenReturn(review1);
        Mockito.when(reviewRepository.findByImdbIDAndUsername("tt2294629", "testUser"))
                .thenReturn(review2);
        Mockito.when(reviewRepository.findByImdbIDAndUsername("tt1130884", "testUser"))
                .thenReturn(review3);
        Mockito.when(reviewRepository.findByImdbIDAndUsername("tt0111161", "anotherTestUser"))
                .thenReturn(review4);
        Mockito.when(reviewRepository.findByImdbIDAndUsername("tt2294629", "anotherTestUser"))
                .thenReturn(review5);
        Mockito.when(reviewRepository.findByImdbIDAndUsername("tt0111161", "thirdTestUser"))
                .thenReturn(review6);
        Mockito.when(reviewRepository.findByImdbIDAndUsername("tt1130884", "thirdTestUser"))
                .thenReturn(review7);

        recCalculator.calculateCompleteUserMovieMatrix();

    }
}
