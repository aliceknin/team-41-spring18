package edu.neu.cs4500;

import edu.neu.cs4500.controllers.user.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.times;


@RunWith(MockitoJUnitRunner.class)
public class UserTest {

    @InjectMocks
    private UserController userController;
    @Mock
    private UserRepository userRepository;

    @Test
    public void selectAllUserObjectsTest() throws Exception {
        User user = new User("nicolepristin", "123123", "test@gmail.com",
                "Nicole Pristin", true);
        Mockito.when(userRepository.findAll()).thenReturn(Collections.singletonList(user));
        assertEquals(Collections.singletonList(user), userController.selectAllUserObjects());
    }

    @Test(expected = IllegalArgumentException.class)
    public void createUserWithExistingUsernameTest() throws URISyntaxException {
        User userNicole = new User("nicolepristin", "123123", "nicoletest@gmail.com",
                "Nicole Pristin", true);

        List<User> userResponse = new ArrayList<>();
        userResponse.add(userNicole);

        Mockito.when(userRepository.findByUsername("nicolepristin")).thenReturn(userResponse);

        // Should throw an illegal argument exception because we are creating a user with a username
        // that already exists in the repository
        userController.createEndUser("nicolepristin", "321321", "nicolep@yahoo.com",
                "Nika Pristin");
    }

    @Test(expected = IllegalArgumentException.class)
    public void createUserWithExistingEmailTest() throws URISyntaxException {
        User userNicole = new User("nicolepristin", "123123", "nicoletest@gmail.com",
                "Nicole Pristin", true);

        List<User> userResponse = new ArrayList<>();
        userResponse.add(userNicole);

        // Should throw an illegal argument exception because we are creating a user with an email
        // that already exists in the repository
        Mockito.when(userRepository.findByEmail("nicoletest@gmail.com")).thenReturn(userResponse);
        userController.createEndUser("testusertest", "123123", "nicoletest@gmail.com",
                "Nicole Pristin");
    }

    @Test
    public void createUserTest() throws URISyntaxException {
        User userNicole = new User("nicolepristin", "123123", "nicoletest@gmail.com",
                "Nicole Pristin", false);

        List<User> userResponse = new ArrayList<>();
        ResponseEntity<User> responseEntity = new ResponseEntity<>(userNicole, HttpStatus.OK);

        Mockito.when(userRepository.findByUsername("nicolepristin")).thenReturn(userResponse);
        Mockito.when(userRepository.findByEmail("nicoletest@gmail.com")).thenReturn(userResponse);
        Mockito.when(userRepository.save(userNicole)).thenReturn(responseEntity.getBody());

        userController.createEndUser(userNicole.getUsername(), userNicole.getPassword(),
                userNicole.getEmail(), userNicole.getFullName());
    }

    @Test
    public void verifyLoginSuccessTest() {
        User userNicole = new User("nicolepristin", "123123", "nicoletest@gmail.com",
                "Nicole Pristin", false);
        List<User> userResponse = new ArrayList<>();
        userResponse.add(userNicole);

        Mockito.when(userRepository.findByUsernameAndPassword
                ("nicolepristin", "123123")).thenReturn(userResponse);

        assertEquals(userController.verifyLogin("nicolepristin", "123123"), true);
    }

    @Test
    public void verifyLoginFailureTest() {
        User userNicole = new User("nicolepristin", "123123", "nicoletest@gmail.com",
                "Nicole Pristin", false);
        List<User> userResponse = new ArrayList<>();

        Mockito.when(userRepository.findByUsernameAndPassword
                ("nicolepristin", "123123")).thenReturn(userResponse);

        assertEquals(userController.verifyLogin("nicolepristin", "123123"), false);
    }

    @Test
    public void getUserInformationTest() {
        User userNicole = new User("nicolepristin", "123123", "nicoletest@gmail.com",
                "Nicole Pristin", false);
        List<User> userResponse = new ArrayList<>();
        userResponse.add(userNicole);

        Mockito.when(userRepository.findByUsername("nicolepristin")).thenReturn(userResponse);

        assertTrue(userController.getUserInformation("nicolepristin") != null);
    }

    @Test
    public void deleteUserTest() {
        User userNicole = new User("nicolepristin", "123123", "nicoletest@gmail.com",
                "Nicole Pristin", false);
        List<User> userResponse = new ArrayList<>();
        userResponse.add(userNicole);

        Mockito.when(userRepository.findByUsername("nicolepristin")).thenReturn(userResponse);

        userController.deleteUser("nicolepristin");
        Mockito.verify(userRepository, times(1)).delete(userNicole);
    }

    @Test
    public void selectUsernamesContainingQueryTest() {
        User userNicole = new User("nicolepristin", "123123", "nicoletest@gmail.com",
                "Nicole Pristin", true);
        User userLuna = new User("lunapristin", "321321", "luna@gmail.com", "Luna Pristin", false);
        List<User> userResponse = new ArrayList<>();
        userResponse.add(userNicole);
        userResponse.add(userLuna);

        Mockito.when(userRepository.findByUsernameContaining("query")).thenReturn(userResponse);
        List<String> usernames = userController.selectUsernamesContainingQuery("query");

        assertEquals(usernames.size(), 2);
        assertTrue(usernames.contains("lunapristin"));
        assertTrue(usernames.contains("nicolepristin"));
    }

    @Test
    public void testCreateEndAndAdminuser() {
        User endUser = new EndUser("lunapristin", "123456",
                "luna@yahoo.com", "Luna Pristin", false);
        User adminUser = new AdminUser("nicolepristin", "131313",
                "nicoletest@aim.com", "Nicole Pristin", true);
    }

    /*
    private int id;
	String username;
	String password;
	String email;
	String fullName;
	boolean admin;
     */

    @Test
    public void testUserSettersAndGetters() {
        User user = new User();
        user.setId(13);
        user.setUsername("nicolepristin");
        user.setPassword("87sdgj");
        user.setEmail("nicoletest@gmail.com");
        user.setFullName("Nicole Pristin");
        user.setAdmin(true);

        assertEquals(user.getId(), 13);
        assertEquals(user.getUsername(), "nicolepristin");
        assertEquals(user.getPassword(), "87sdgj");
        assertEquals(user.getEmail(), "nicoletest@gmail.com");
        assertEquals(user.getFullName(), "Nicole Pristin");
        assertEquals(user.getAdmin(), true);
    }
}
