package edu.neu.cs4500.controllers.recommendation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecommendationRepository extends JpaRepository<Recommendation, Integer> {

    List<Recommendation> findByRecToUserId(int recToUserId);
}
