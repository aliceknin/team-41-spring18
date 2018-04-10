package edu.neu.cs4500.controllers.system.recommendations;

import edu.neu.cs4500.controllers.review.Review;
import edu.neu.cs4500.controllers.review.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class SystemRecController {

    @Autowired
    SystemRecCalculator systemRecCalculator;

    @Autowired
    ReviewRepository reviewRepository;

    // use this method to retrieve the system recommendations for a user
    @RequestMapping("/api/system/recommendations/{username}")
    public List<String> getSystemRecommendationsForUser(@PathVariable("username") String username) {
        List<Review> reviews = reviewRepository.findAll();
        List<String> users = new ArrayList<>();
        List<String> movies = new ArrayList<>();
        for (Review review : reviews) {
            if (!users.contains(review.getUsername())) {
                users.add(review.getUsername());
            }
            if (!movies.contains(review.getImdbID())) {
                movies.add(review.getImdbID());
            }
        }
        int index = -1;
        for (int i = 0; i < users.size(); i++) {
            if (users.get(i).equals(username)) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            return new ArrayList<>();
        }
        Double[][] userMovieMatrix = systemRecCalculator.calculateCompleteUserMovieMatrix();
        Double[] userMatrix = userMovieMatrix[index];

        Map<String, Double> userMovieIDs = new HashMap<>();
        for (int i = 0; i < movies.size(); i++) {
            userMovieIDs.put(movies.get(i), userMatrix[i]);
        }

        List<Map.Entry<String, Double>> sortedMovies = userMovieIDs.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue())
                .collect(Collectors.toList());

        List<String> recommendedMovies = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            String movieId = sortedMovies.get(i).getKey();
            if (reviewRepository.findByImdbIDAndUsername(movieId, username) == null) {
                recommendedMovies.add(movieId);
            }
        }
        return recommendedMovies;
    }

    // just a test endpoint, won't actually use this
    @RequestMapping("/api/system/recommendations/test")
    public Double[][] getAllSystemRecommendations() {
        return systemRecCalculator.calculateCompleteUserMovieMatrix();
    }
}
