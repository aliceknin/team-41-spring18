package edu.neu.cs4500;

import edu.neu.cs4500.controllers.review.Review;
import edu.neu.cs4500.controllers.review.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SystemRecCalculator {

    @Autowired
    ReviewRepository reviewRepository;

    public Double[][] calculateCompleteUserMovieMatrix() {
        Double[][] userMovieMatrix = calcUserMovieMatrix();
        Double[][] similarityMatrix = calculateMovieSimilarityMatrix(userMovieMatrix);
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

    private Double[][] calculateMovieSimilarityMatrix(Double[][] userMovieMatrix) {
        int numUsers = userMovieMatrix.length;
        int numMovies = userMovieMatrix[0].length;

        Double[][] similarityMatrix = new Double[numMovies][numMovies];
        for (int i = 0; i < numMovies; i++) {
            for (int j = 0; j < numMovies; j++) {
                if (i == j) {
                    similarityMatrix[i][j] = 1.0;
                }
                else if (similarityMatrix[i][j] == null || similarityMatrix[j][i] == null) {
                    List<Double> movies1 = new ArrayList<>();
                    List<Double> movies2 = new ArrayList<>();
                    for (int k = 0; k < numUsers; k++){
                        if (userMovieMatrix[k][i] != null & userMovieMatrix[k][j] != null) {
                            movies1.add(userMovieMatrix[k][i]);
                            movies2.add(userMovieMatrix[k][j]);
                        }
                    }

                    double similarity = cosineSimilarity(movies1, movies2);
                    similarityMatrix[i][j] = similarity;
                    similarityMatrix[j][i] = similarity;
                }
            }
        }
        return similarityMatrix;
    }

    private Double[][] calcUserMovieMatrix() {
        List<Review> reviews = reviewRepository.findAll();
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
                String username = users.get(i);
                String imdbID = movies.get(j);

                Review review = reviewRepository.findByImdbIDAndUsername(imdbID, username);
                if (review != null) {
                    double rating = review.getRating();
                    userMovieMatrix[i][j] = rating;
                }
            }
        }
        return userMovieMatrix;
    }

    private double cosineSimilarity(List<Double> vector1, List<Double> vector2) {
        int vectorDotProduct = computeVectorDotProduct(vector1, vector2);
        double vectorMagnitude1 = computeVectorMagnitude(vector1);
        double vectorMagnitude2 = computeVectorMagnitude(vector2);
        double vectorProduct = vectorMagnitude1 * vectorMagnitude2;
        return vectorDotProduct / vectorProduct;
    }

    private double computeVectorMagnitude(List<Double> vector) {
        int sum = 0;
        for (int i = 0; i < vector.size(); i++) {
            sum += Math.pow(vector.get(i), 2);
        }
        return Math.sqrt(sum);
    }

    private int computeVectorDotProduct(List<Double> vector1, List<Double> vector2) {
        int sum = 0;
        for (int i = 0; i < vector1.size(); i++) {
            sum += vector1.get(i) * vector2.get(i);
        }
        return sum;
    }
}
