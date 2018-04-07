package edu.neu.cs4500.controllers.system.recommendations;

import edu.neu.cs4500.SystemRecCalculator;
import edu.neu.cs4500.controllers.review.Review;
import edu.neu.cs4500.controllers.review.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class SystemRecController {

    @Autowired
    SystemRecRepository systemRecRepository;

    @Autowired
    SystemRecCalculator systemRecCalculator;

    @RequestMapping("/api/system/recommendations/{username}")
    public List<SystemRecommendation> getSystemRecommendationsForUser(@PathVariable("username") String username) {
        return systemRecRepository.findByUsername(username);
    }

    @RequestMapping("/api/system/recommendations/test")
    public Double[][] getAllSystemRecommendations() {
        return systemRecCalculator.calculateUserMovieMatrix();
    }
}
