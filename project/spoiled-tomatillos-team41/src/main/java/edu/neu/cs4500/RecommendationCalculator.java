package edu.neu.cs4500;

import edu.neu.cs4500.controllers.review.Review;
import edu.neu.cs4500.controllers.review.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class RecommendationCalculator {

    @Autowired
    ReviewRepository reviewRepository;

    public Double[][] calculateUserMovieMatrix() {
        Double[][] userMovieMatrix = getUserMovieMatrix();
        Double[][] similarityMatrix = calculateMovieSimilarityMatrix();
        int numUsers = userMovieMatrix.length;
        int numMovies = userMovieMatrix[0].length;

        for (int i = 0; i < numUsers; i++) {
            Double[] usersMovieRatings = userMovieMatrix[i];
            for (int j = 0; j < numMovies; j++) {
                if (usersMovieRatings[j] == null) {
                    double numerator = 0;
                    double denominator = 0;
                    for (int k = 0; k < numMovies; k++) {
                        if (usersMovieRatings[k] != null) {
                            numerator += usersMovieRatings[k] * similarityMatrix[k][j];
                            denominator += similarityMatrix[k][j];
                        }
                    }
                    if (denominator != 0) {
                        userMovieMatrix[i][j] = numerator / denominator;
                    }
                }
            }
        }
        return userMovieMatrix;
    }

    private Double[][] calculateMovieSimilarityMatrix() {
        Double[][] userMovieMatrix = getUserMovieMatrix();
        int numMovies = userMovieMatrix[0].length;

        Double[][] similarityMatrix = new Double[numMovies][numMovies];
        for (int i = 0; i < numMovies; i++) {
            for (int j = 0; j < numMovies; j++) {
                if (i == j) {
                    similarityMatrix[i][j] = 1.0;
                }
                else {
                    Double[] movies1 = new Double[]{};
                    Double[] movies2 = new Double[]{};
                    int count = 0;
                    for (int k = 0; k < numMovies; k++){
                        movies1[count] = userMovieMatrix[k][i];
                        movies2[count] = userMovieMatrix[k][j];
                        count += 1;
                    }

                    double similarity = cosineSimilarity(movies1, movies2);
                    similarityMatrix[i][j] = similarity;
                    similarityMatrix[j][i] = similarity;
                }
            }
        }
        return similarityMatrix;
    }


    private Double[][] getUserMovieMatrix() {
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

        Double[][] userMovieMatrix = new Double[users.size()][movies.size()];
        for (int i = 0; i < users.size(); i++) {
            for (int j = 0; j < movies.size(); j++) {
                String userId = users.get(i);
                String imdbID = movies.get(j);

                Review review = reviewRepository.findByImdbIDAndUsername(userId, imdbID);
                if (review != null) {
                    double rating = review.getRating();
                    userMovieMatrix[i][j] = rating;
                }
            }
        }
        return userMovieMatrix;
    }

    private double cosineSimilarity(Double[] vector1, Double[] vector2) {
        int vectorDotProduct = computeVectorDotProduct(vector1, vector2);
        double vectorMagnitude1 = computeVectorMagnitude(vector1);
        double vectorMagnitude2 = computeVectorMagnitude(vector2);
        double vectorProduct = vectorMagnitude1 * vectorMagnitude2;
        return vectorDotProduct / vectorProduct;
    }

    private double computeVectorMagnitude(Double[] vector) {
        int sum = 0;
        for (int i = 0; i < vector.length; i++) {
            sum += Math.pow(vector[i], 2);
        }
        return Math.sqrt(sum);
    }

    private int computeVectorDotProduct(Double[] vector1, Double[] vector2) {
       int sum = 0;
       for (int i = 0; i < vector1.length; i++) {
           sum += vector1[i] * vector2[i];
       }
       return sum;
    }
}
