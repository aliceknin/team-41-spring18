package edu.neu.cs4500;

import edu.neu.cs4500.controllers.recommendation.Recommendation;
import edu.neu.cs4500.controllers.recommendation.RecommendationController;
import edu.neu.cs4500.controllers.recommendation.RecommendationRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class RecommendationTest {

    @InjectMocks
    private RecommendationController recController;
    @Mock
    private RecommendationRepository recRepository;
   
}
