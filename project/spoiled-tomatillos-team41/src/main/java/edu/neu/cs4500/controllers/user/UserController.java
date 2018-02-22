package edu.neu.cs4500.controllers.user;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.ws.WebServiceException;

@RestController
public class UserController {
	
	@Autowired
	UserRepository userRepository;

	// Inserts a static user example with username 'nicolepristin'
	@RequestMapping("/api/user/insert")
	public User insertUser() {
		User user = new User("nicolepristin", "pw", "pristin.n@husky.neu.edu", "Nicole Pristin", true);
		userRepository.save(user);
		return user;
	}

	// Creates an end user based on their username, password, email, fullname
	// This does not create an admin user, just a basic end user
	@RequestMapping("/api/user/create/{username}/{pw}/{email}/{fullName}")
	public ResponseEntity<Object> createEndUser(@PathVariable("username") String username, @PathVariable("pw") String pw,
						   @PathVariable("email") String email, @PathVariable("fullName") String fullName)
							throws URISyntaxException {

		if (userRepository.findByUsername(username).size() != 0) {
			throw new WebServiceException("A user with this username already exists");
		} else if (userRepository.findByEmail(email).size() != 0) {
			throw new WebServiceException("A user with this email already exists");
		} else {
			User user = new User(username, pw, email, fullName, false);
			userRepository.save(user);

			URI uri = new URI("http://localhost:8080/accountCreated.html");
			HttpHeaders httpHeaders = new HttpHeaders();
			httpHeaders.setLocation(uri);
			return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);

		}
	}

	// Returns all the users registered with the system
	@RequestMapping("/api/user/select/all")
	public List<User> selectAllUserObjects() {
		List<User> users = (List<User>) userRepository.findAll();
		return users;
	}

	// Verifies that the user can login by checking if the provided username and password match a record
	@RequestMapping("/api/user/verify/{username}/{password}")
	public boolean verifyLogin(@PathVariable("username") String username, @PathVariable("password") String pw) {
		 List<User> users = userRepository.findByUsernameAndPassword(username, pw);
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
