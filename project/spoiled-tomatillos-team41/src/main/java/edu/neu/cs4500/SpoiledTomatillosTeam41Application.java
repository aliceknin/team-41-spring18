package edu.neu.cs4500;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class SpoiledTomatillosTeam41Application extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(SpoiledTomatillosTeam41Application.class);
	}
	
	public static void main(String[] args) {
		SpringApplication.run(SpoiledTomatillosTeam41Application.class, args);
	}
}
