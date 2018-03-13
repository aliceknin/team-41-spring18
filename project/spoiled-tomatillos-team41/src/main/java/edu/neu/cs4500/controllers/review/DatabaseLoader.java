package edu.neu.cs4500.controllers.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final ReviewRepository reviewRepository;

    @Autowired
    public DatabaseLoader(ReviewRepository repository) {
        this.reviewRepository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
    }
}