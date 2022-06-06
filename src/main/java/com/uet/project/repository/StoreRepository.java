package com.uet.project.repository;

import com.uet.project.model.Store;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends CrudRepository<Store, Integer> {

    Store findStoreByName(String name);

    @Query(value = "select s from Store s where s.type=?1")
    List<Store> findStoreByType(String type);

    List<Store> findStoreByAddress(String address);




}
