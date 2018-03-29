package edu.neu.cs4500.controllers.logger;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LoggerRepository extends JpaRepository<Logger, Integer> {

}