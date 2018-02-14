package edu.neu.cs4500.controllers.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.neu.cs4500.controllers.hello.HelloObject;

@RestController
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@RequestMapping("/api/user/insert")
	public User insertUser() {
		User user = new User("nicolepristin", "pw", "pristin.n@husky.neu.edu", "admin");
		userRepository.save(user);
		return user;
	}
	
	@RequestMapping("/api/user/create/admin/{username}/{pw}/{email}")
	public User createAdminUser(@PathVariable("username") String username, @PathVariable("pw") String pw,
								@PathVariable("email") String email) {
		
		User user = new User(username, pw, email, "admin");
		userRepository.save(user);
		return user;
	}
	
	@RequestMapping("/api/user/create/end/{username}/{pw}/{email}")
	public User createEndUser(@PathVariable("username") String username, @PathVariable("pw") String pw,
			@PathVariable("email") String email) {
		User user = new User(username, pw, email, "end");
		userRepository.save(user);
		return user;
	}
	
	@RequestMapping("/api/user/select/all")
	public List<User> selectAllUserObjects() {
		List<User> users = (List<User>) userRepository.findAll();
		return users;
	}
	
	@RequestMapping("/api/user/verify/{username}")
	public boolean verifyLogin(@PathVariable("username") String username) {
		 List<User> users = userRepository.findByUsername(username);
		 return users.size() != 0;
	}
}
