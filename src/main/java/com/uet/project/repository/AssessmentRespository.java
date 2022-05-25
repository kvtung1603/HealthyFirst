package com.uet.project.repository;

import com.uet.project.model.Assessment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AssessmentRespository extends CrudRepository<Assessment, Integer> {



}
