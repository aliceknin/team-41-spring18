package edu.neu.cs4500.controllers.friend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class FriendController {

    @Autowired
    FriendRepository friendRepository;

    @RequestMapping("/api/friend/add/{user_id}/{friend_id}")
    public Friend addFriend(@PathVariable("user_id") int userId, @PathVariable("friend_id") int friendId) {
        Friend friend = new Friend(userId, friendId);
        friendRepository.save(friend);
        return friend;
    }

    @RequestMapping("/api/friend/delete/{user_id}/{friend_id}")
    public void removeFriend(@PathVariable("user_id") int userId, @PathVariable("friend_id") int friendId) {
        List<Friend> friends = friendRepository.findByUserIdAndFriendId(userId, friendId);
        if (friends == null) {
            Friend friend = friendRepository.findByUserIdAndFriendId(friendId, userId).get(0);
            friendRepository.delete(friend);
        } else {
            friendRepository.delete(friends.get(0));
        }
    }

    @RequestMapping("/api/friend/select/{user_id}")
    public List<Integer> getFriendsForUser(@PathVariable("user_id") int userId) {
        List<Integer> userFriends = new ArrayList<>();

        List<Friend> friends = friendRepository.findByUserId(userId);
        List<Friend> friends2 = friendRepository.findByFriendId(userId);

        for (Friend f : friends) {
            int id = f.getFriendId();
            userFriends.add(id);
        }
        for (Friend f : friends2) {
            int id = f.getUserId();
            userFriends.add(id);
        }

        return userFriends;
    }


}
