package com.uet.project.service;

import com.uet.project.model.Inspection;
import com.uet.project.repository.InspectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InspectionService {
    private final InspectionRepository inspectionRepository;

    public Inspection save(Inspection inspection) {
        return inspectionRepository.save(inspection);
    }

    public List<Inspection> findInspectionByStatus(String status) {
        return inspectionRepository.findInspectionByStatus(status);
    }

    public Inspection findById(int id) {
        return inspectionRepository.findById(id).get();
    }


    public Inspection findByName(String name) {
        return inspectionRepository.findByName(name);
    }

}
