package com.uet.project.repository;

import com.uet.project.model.Assessment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AssessmentRespository extends CrudRepository<Assessment, Integer> {
    List<Assessment> findAssessmentByName(String name);

    List<Assessment> findAssessmentByAddress(String address);

}
