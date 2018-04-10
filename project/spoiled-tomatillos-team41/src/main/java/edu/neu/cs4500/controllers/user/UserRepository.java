package edu.neu.cs4500.controllers.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer>{

	List<User> findById(int id);

	List<User> findByUsername(String username);

	List<User> findByEmail(String email);

	List<User> findByUsernameAndPassword(String username, String password);

	List<User> findByUsernameContaining(String username);
}
