package edu.neu.cs4500;

import edu.neu.cs4500.controllers.review.Review;
import edu.neu.cs4500.controllers.review.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class RecommendationCalculator {

    @Autowired
    ReviewRepository reviewRepository;

    public Double[][] calculateMovieSimilarityMatrix() {
        Integer[][] userMovieMatrix = getUserMovieMatrix();
        int numMovies = userMovieMatrix[0].length;

        Double[][] similarityMatrix = new Double[numMovies][numMovies];
        for (int i = 0; i < numMovies; i++) {
            for (int j = 0; j < numMovies; j++) {
                if (i == j) {
                    similarityMatrix[i][j] = 1.0;
                }
                else {
                    Integer[] movie1 = userMovieMatrix[i];
                    Integer[] movie2 = userMovieMatrix[j];

                    for (int k = 0; k < movie1.length; k++) {
                        if (movie1[k] != null & movie2[k] != null) {
                            similarityMatrix[i][j] = cosineSimilarity(movie1, movie2);
                        }
                    }
                }
            }
        }
        return similarityMatrix;
    }


    private Integer[][] getUserMovieMatrix() {
        List<Review> reviews = reviewRepository.findAll();

        // create the matrix of movie id x username with the rating as the value
        List<String> movies = new ArrayList<>();
        List<String> users = new ArrayList<>();

        for (Review review : reviews) {
            if (!movies.contains(review.getImdbID())) {
                movies.add((review.getImdbID()));
            }
            if (!users.contains(review.getUsername())) {
                users.add(review.getUsername());
            }
        }

        Integer[][] userMovieMatrix = new Integer[users.size()][movies.size()];
        for (int i = 0; i < users.size(); i++) {
            for (int j = 0; j < movies.size(); j++) {
                String userId = users.get(i);
                String imdbID = movies.get(j);

                Review review = reviewRepository.findByImdbIDAndUsername(userId, imdbID);
                if (review != null) {
                    int rating = review.getRating();
                    userMovieMatrix[i][j] = rating;
                }
            }
        }
        return userMovieMatrix;
    }

    private double cosineSimilarity(Integer[] vector1, Integer[] vector2) {
        int vectorDotProduct = computeVectorDotProduct(vector1, vector2);
        double vectorMagnitude1 = computeVectorMagnitude(vector1);
        double vectorMagnitude2 = computeVectorMagnitude(vector2);
        double vectorProduct = vectorMagnitude1 * vectorMagnitude2;
        return vectorDotProduct / vectorProduct;
    }

    private double computeVectorMagnitude(Integer[] vector) {
        int sum = 0;
        for (int i = 0; i < vector.length; i++) {
            sum += Math.pow(vector[i], 2);
        }
        return Math.sqrt(sum);
    }

    private int computeVectorDotProduct(Integer[] vector1, Integer[] vector2) {
       int sum = 0;
       for (int i = 0; i < vector1.length; i++) {
           sum += vector1[i] * vector2[i];
       }
       return sum;
    }
}
