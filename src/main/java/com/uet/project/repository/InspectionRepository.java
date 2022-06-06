package com.uet.project.repository;

import com.uet.project.model.Inspection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InspectionRepository extends CrudRepository<Inspection, Integer> {
    List<Inspection> findInspectionByStatus(String status);

}
