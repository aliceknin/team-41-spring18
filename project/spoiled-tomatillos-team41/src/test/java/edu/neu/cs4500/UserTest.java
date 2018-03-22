package edu.neu.cs4500;

import edu.neu.cs4500.controllers.user.User;
import edu.neu.cs4500.controllers.user.UserController;
import edu.neu.cs4500.controllers.user.UserRepository;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;


@RunWith(MockitoJUnitRunner.class)
public class UserTest {

    @InjectMocks
    private UserController userController;
    @Mock
    private User user;
    @Mock
    private UserRepository userRepository;


}
