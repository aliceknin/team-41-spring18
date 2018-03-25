package edu.neu.cs4500.controllers.user;

import java.net.URISyntaxException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	
	@Autowired
	UserRepository userRepository;

	// Creates an end user based on their username, password, email, fullname
	// This does not create an admin user, just a basic end user
	@RequestMapping("/api/user/create/{username}/{pw}/{email}/{fullName}")
	public ResponseEntity<User> createEndUser(@PathVariable("username") String username, @PathVariable("pw") String pw,
						   @PathVariable("email") String email, @PathVariable("fullName") String fullName)
			throws URISyntaxException, NoSuchAlgorithmException {

		if (userRepository.findByUsername(username).size() != 0) {
			throw new IllegalArgumentException("A user with this username already exists");
		} else if (userRepository.findByEmail(email).size() != 0) {
			throw new IllegalArgumentException("A user with this email already exists");
		} else {
			MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
			messageDigest.update(pw.getBytes());
			String encryptedString = new String(messageDigest.digest());

			User user = new User(username, encryptedString, email, fullName, false);
			userRepository.save(user);
			return new ResponseEntity<>(user, HttpStatus.OK);

		}
	}

	// Returns all the users registered with the system
	@RequestMapping("/api/user/select/all")
	public List<User> selectAllUserObjects() {
		List<User> users = userRepository.findAll();
		return users;
	}

	// Returns all usernames that contain the given query
	@RequestMapping("/api/user/select/{query}")
	public List<String> selectUsernamesContainingQuery(@PathVariable("query") String query) {
		List<User> users = userRepository.findByUsernameContaining(query);
		List<String> usernames = new ArrayList<>();
		for (User user : users) {
			usernames.add(user.username);
		}
		return usernames;
	}

	// Verifies that the user can login by checking if the provided username and password match a record
	@RequestMapping("/api/user/verify/{username}/{password}")
	public boolean verifyLogin(@PathVariable("username") String username, @PathVariable("password") String pw) throws NoSuchAlgorithmException {
		MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
		messageDigest.update(pw.getBytes());
		String encryptedString = new String(messageDigest.digest());

		List<User> users = userRepository.findByUsernameAndPassword(username, encryptedString);
		 return users.size() != 0;
	}

	// Gets all the user information for a username
	@RequestMapping("/api/user/info/{username}")
	public User getUserInformation(@PathVariable("username") String username) {
		 List<User> users = userRepository.findByUsername(username);
		 return users.get(0);
	}
	
	// Method for admin user only
	// Will be called when the admin is on a user profile and wants to delete the user
	@RequestMapping("/api/user/delete/{username}")
	public void deleteUser(@PathVariable("username") String username) {
		User user = userRepository.findByUsername(username).get(0);
		userRepository.delete(user);
	}
}