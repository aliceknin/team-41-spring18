package edu.neu.cs4500.controllers.recommendation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class RecommendationController {

    @Autowired
    RecommendationRepository recRepository;

    @RequestMapping("/api/recommendation/add/{from_user_id}/{to_user_id}/{movie_id")
    public Recommendation addRecommendation(@PathVariable("from_user_id") int recFromUserId,
                                            @PathVariable("to_user_id") int recToUserId,
                                            @PathVariable("movie_id") int movieId) {
        Recommendation rec = new Recommendation(recFromUserId, recToUserId, movieId);
        recRepository.save(rec);
        return rec;
    }

    @RequestMapping("/api/recommendation/{to_user_id}/select")
    public List<Recommendation> getUserRecommendations(@PathVariable("to_user_id") int userId) {
        List<Recommendation> recommendations = recRepository.findByRecToUserId(userId);
        return recommendations;
    }

    @RequestMapping("/api/recommendation/{to_user_id}/select/movies")
    public List<Integer> getUserRecommendedMovies(@PathVariable("to_user_id") int userId) {
        List<Integer> movies = new ArrayList<>();

        List<Recommendation> recommendations = recRepository.findByRecToUserId(userId);
        for (Recommendation rec : recommendations) {
            int movieId = rec.getMovieId();
            movies.add(movieId);
        }
        return movies;
    }
}
