package edu.neu.cs4500.controllers.system.recommendations;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SystemRecRepository extends JpaRepository<SystemRecommendation, Integer> {

    List<SystemRecommendation> findByUsername(String username);
}
