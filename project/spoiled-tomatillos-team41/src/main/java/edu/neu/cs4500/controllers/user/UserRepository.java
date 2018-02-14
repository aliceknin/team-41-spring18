package edu.neu.cs4500.controllers.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer>{
	
	@Query("SELECT * FROM user WHERE user.username = ?1")
    public boolean userExists(String username);
}
