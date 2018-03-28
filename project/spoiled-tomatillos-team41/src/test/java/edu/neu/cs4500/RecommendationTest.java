package edu.neu.cs4500;

import edu.neu.cs4500.controllers.logger.Logger;
import edu.neu.cs4500.controllers.logger.LoggerRepository;
import edu.neu.cs4500.controllers.recommendation.Recommendation;
import edu.neu.cs4500.controllers.recommendation.RecommendationController;
import edu.neu.cs4500.controllers.recommendation.RecommendationRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(MockitoJUnitRunner.class)
public class RecommendationTest {

    @InjectMocks
    private RecommendationController recController;
    @Mock
    private RecommendationRepository recRepository;
    @Mock
    private LoggerRepository loggerRepository;

    @Test
    public void addRecommendationTest() {
        Recommendation rec = new Recommendation(17, 41, "sdg8275");
        String apiCall = "/api/recommendation/add/" + 17 + "/" + 41 + "/" + "sdg8275";
        Logger log = new Logger(apiCall);

        Mockito.when(recRepository.save(rec)).thenReturn(rec);
        Mockito.when(loggerRepository.save(log)).thenReturn(log);
        Recommendation rec2 =
                recController.addRecommendation(17, 41, "sdg8275");
        assertEquals(rec2.getRecFromUserId(), 17);
        assertEquals(rec2.getRecToUserId(), 41);
        assertEquals(rec2.getIMDBMovieId(), "sdg8275");
    }

    @Test
    public void getUserRecommendationsTest() {
        Recommendation rec1 = new Recommendation(947, 163, "poiw284");
        Recommendation rec2 = new Recommendation(3728, 163, "ksdgj98");
        Recommendation rec3 = new Recommendation(17, 163, "BMNsd2873");

        List<Recommendation> recs = new ArrayList<>();
        recs.add(rec1);
        recs.add(rec2);
        recs.add(rec3);

        Mockito.when(recRepository.findByRecToUserId(163)).thenReturn(recs);
        List<Recommendation> recsForUser = recController.getUserRecommendations(163);

        assertEquals(recsForUser.size(),  3);
        assertTrue(recsForUser.contains(rec1));
        assertTrue(recsForUser.contains(rec2));
        assertTrue(recsForUser.contains(rec3));
    }

    /*
    @RequestMapping("/api/recommendation/{to_user_id}/select/movies")
    public List<String> getUserRecommendedMovies(@PathVariable("to_user_id") int userId) {
        List<String> movies = new ArrayList<>();

        List<Recommendation> recommendations = recRepository.findByRecToUserId(userId);
        for (Recommendation rec : recommendations) {
            String movieId = rec.getIMDBMovieId();
            movies.add(movieId);
        }
        return movies;
    }
     */
    @Test
    public void getUserRecommendedMoviesTest() {
        Recommendation rec1 = new Recommendation(947, 163, "poiw284");
        Recommendation rec2 = new Recommendation(3728, 163, "ksdgj98");
        Recommendation rec3 = new Recommendation(17, 163, "BMNsd2873");

        List<Recommendation> recs = new ArrayList<>();
        recs.add(rec1);
        recs.add(rec2);
        recs.add(rec3);

        Mockito.when(recRepository.findByRecToUserId(163)).thenReturn(recs);
        List<String> recommendedMovies  = recController.getUserRecommendedMovies(163);

        assertEquals(recommendedMovies.size(),  3);
        assertTrue(recommendedMovies.contains("poiw284"));
        assertTrue(recommendedMovies.contains("ksdgj98"));
        assertTrue(recommendedMovies.contains("BMNsd2873"));
    }

    @Test
    public void recommendationGettersAndSettersTest() {
        Recommendation rec = new Recommendation();
        rec.setId(83);
        rec.setRecFromUserId(91);
        rec.setRecToUserId(872);
        rec.setIMDBMovieId("sdkgj927");

        assertEquals(rec.getId(), 83);
        assertEquals(rec.getRecFromUserId(), 91);
        assertEquals(rec.getRecToUserId(), 872);
        assertEquals(rec.getIMDBMovieId(), "sdkgj927");
    }
}
