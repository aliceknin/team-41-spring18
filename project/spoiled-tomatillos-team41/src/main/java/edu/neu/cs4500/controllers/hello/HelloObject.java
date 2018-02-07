package edu.neu.cs4500.controllers.hello;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/*
 * Simple example of CRU services on an object.
 */
@Entity(name="hello")
public class HelloObject {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String message;
	
	public HelloObject(String message) {
		this.message = message;
	}
	
	public HelloObject() {
		
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message ) {
		this.message = message;
	}
}