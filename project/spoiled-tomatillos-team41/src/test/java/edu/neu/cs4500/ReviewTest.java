package edu.neu.cs4500;

import edu.neu.cs4500.controllers.review.ReviewController;
import edu.neu.cs4500.controllers.review.ReviewRepository;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class ReviewTest {

    @InjectMocks
    private ReviewController reviewController;
    @Mock
    private ReviewRepository reviewRepository;
}
