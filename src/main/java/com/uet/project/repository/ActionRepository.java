//package com.uet.project.repository;
//
//import com.uet.project.model.Action;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.CrudRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.Date;
//import java.util.List;
//
//@Repository
//public interface ActionRepository extends CrudRepository<Action, Integer> {
//
//
//    @Query(value = "select a from Action a where a.endDate < ?1")
//    List<Action> findActionByEndDateBefore(Date date);
//}
