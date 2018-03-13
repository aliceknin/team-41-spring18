package edu.neu.cs4500.controllers.friend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        Friend friend = friendRepository.findByUserIdAndFriendId(userId, friendId).get(0);
        if (friend == null) {
            friend = friendRepository.findByUserIdAndFriendId(friendId, userId).get(0);
        }
        friendRepository.delete(friend);
    }
}
