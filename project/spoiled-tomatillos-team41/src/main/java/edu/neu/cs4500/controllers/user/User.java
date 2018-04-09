package edu.neu.cs4500.controllers.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;
import javax.persistence.PrePersist;

@Entity(name="user")
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	String username;
	String password;
	String email;
	String fullName;
	String bio;
	boolean admin;
	Date joined;
	
	public User(String username, String password, String email, String fullName, String bio, boolean admin) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.fullName = fullName;
		this.bio = bio;
		this.admin = admin;
	}
	
	public User() {
		
	}

  @PrePersist
  protected void onCreate() {
    joined = new Date();
  }

	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email ) {
		this.email = email;
	}

	public String getFullName() { return fullName; }

	public void setFullName(String fullName) { this.fullName = fullName; }

	public String getBio() { return bio; }

	public void setBio(String bio) { this.bio = bio; }
	
	public boolean getAdmin() { return admin; }
	
	public void setAdmin(boolean admin) {
		this.admin = admin;
	}
}
