package edu.neu.cs4500.controllers.user;

import javax.persistence.Entity;

public class AdminUser extends User {

	public AdminUser(String username, String password, String email, String type) {
		super(username, password, email, type);
	}
}
