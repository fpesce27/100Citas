package com.example.Dates;

import com.example.Dates.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface repoUser extends JpaRepository<User, Long> {
    Optional<User> findById(Long id); // find by id
    User save(User user); // save user
    List<User> findAll(); // find all users
}
