package edu.neu.cs4500.controllers.friend;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Integer> {

    List<Friend> findByUserIdAndFriendId(int userId, int friendId);
}
