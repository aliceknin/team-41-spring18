package edu.neu.cs4500;

import edu.neu.cs4500.controllers.friend.Friend;
import edu.neu.cs4500.controllers.friend.FriendController;
import edu.neu.cs4500.controllers.friend.FriendRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;

@RunWith(MockitoJUnitRunner.class)
public class FriendTest {

    @InjectMocks
    private FriendController friendController;
    @Mock
    private FriendRepository friendRepository;

    @Test
    public void addFriendTest() {
        Friend friend = new Friend(27, 138);
        ResponseEntity<Friend> responseEntity = new ResponseEntity<>(friend, HttpStatus.OK);

        Mockito.when(friendRepository.save(friend)).thenReturn(responseEntity.getBody());
        Friend addedFriend = friendController.addFriend(27, 138);

        assertEquals(addedFriend.getUserId(), 27);
        assertEquals(addedFriend.getFriendId(), 138);
    }

    @Test
    public void removeNotNullConditionFriendTest() {
        Friend friend = new Friend(25, 101);
        List<Friend> friends = new ArrayList<>();
        friends.add(friend);

        Mockito.when(friendRepository.findByUserIdAndFriendId(25, 101))
                .thenReturn(friends);

        friendController.removeFriend(25, 101);
        Mockito.verify(friendRepository, times(1)).delete(friend);
    }

    @Test
    public void removeNullConditionFriendTest() {
        Friend friend = new Friend(25, 101);
        List<Friend> friends = new ArrayList<>();
        friends.add(friend);

        Mockito.when(friendRepository.findByUserIdAndFriendId(101, 25))
                .thenReturn(null);
        Mockito.when(friendRepository.findByUserIdAndFriendId(25, 101))
                .thenReturn(friends);

        friendController.removeFriend(101, 25);
        Mockito.verify(friendRepository, times(1)).delete(friend);
    }

    @Test
    public void getFriendsForUserTest() {
        Friend friendYuliya = new Friend(13, 94);
        Friend friendJustin = new Friend(13, 76);
        Friend friendAlice = new Friend(47, 13);
        Friend friendKathleen = new Friend(107, 13);

        List<Friend> friends1 = new ArrayList<>();
        friends1.add(friendYuliya);
        friends1.add(friendJustin);

        List<Friend> friends2 = new ArrayList<>();
        friends2.add(friendAlice);
        friends2.add(friendKathleen);

        Mockito.when(friendRepository.findByUserId(13))
                .thenReturn(friends1);
        Mockito.when(friendRepository.findByFriendId(13))
                .thenReturn(friends2);

        List<Integer> friends = friendController.getFriendsForUser(13);
        assertEquals(friends.size(), 2);
        assertTrue(friends.contains(94));
        assertTrue(friends.contains(76));
        assertTrue(!friends.contains(47));
        assertTrue(!friends.contains(107));
    }

    @Test
    public void friendGettersAndSettersTest() {
        Friend friend = new Friend();
        friend.setId(13);
        friend.setUserId(938);
        friend.setFriendId(37);

        assertEquals(friend.getId(), 13);
        assertEquals(friend.getUserId(), 938);
        assertEquals(friend.getFriendId(), 37);
    }
}
