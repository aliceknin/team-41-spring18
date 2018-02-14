package edu.neu.cs4500.controllers.user;

import javax.persistence.Entity;

public class EndUser extends User {

	public EndUser(String username, String password, String email, String type) {
		super(username, password, email, type);
	}
}