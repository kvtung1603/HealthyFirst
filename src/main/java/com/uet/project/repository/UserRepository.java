package com.uet.project.repository;

import com.uet.project.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    @Query(value = "Select user from User user where user.username=?1")
    User findByUsername(String username);

    Boolean existsByUsername(String username);

    User findByChangePasswordToken(String token);
}
