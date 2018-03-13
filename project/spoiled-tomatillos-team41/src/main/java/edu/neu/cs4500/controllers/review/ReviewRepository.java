package edu.neu.cs4500.controllers.review;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByImdbID(String imdbID);

    Review findById(int id);
}
