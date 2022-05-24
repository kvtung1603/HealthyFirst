package com.uet.project.repository;

import com.uet.project.entity.AuthToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AuthTokenRepsitory extends CrudRepository<AuthToken, Integer> {

    AuthToken findByToken(String token);

    void deleteById(int id);

    AuthToken save(AuthToken authToken);
}

