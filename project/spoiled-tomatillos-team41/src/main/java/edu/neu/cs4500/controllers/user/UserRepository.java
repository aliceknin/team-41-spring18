package edu.neu.cs4500.controllers.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer>{

	public List<User> findByUsername(String username);
}
