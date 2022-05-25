package com.uet.project.service;


import com.uet.project.repository.ActionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ActionService {
    private final ActionRepository actionRepository;



}
