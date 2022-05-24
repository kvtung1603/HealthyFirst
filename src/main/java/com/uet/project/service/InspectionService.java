package com.uet.project.service;

import com.uet.project.repository.InspectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InspectionService {
    private final InspectionRepository inspectionRepository;


}
