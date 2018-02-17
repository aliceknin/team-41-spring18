package edu.neu.cs4500.controllers.user;

public class AdminUser extends User {

	public AdminUser(String username, String password, String email, String fullName, boolean admin) {
		super(username, password, email, fullName, admin);
	}
}
