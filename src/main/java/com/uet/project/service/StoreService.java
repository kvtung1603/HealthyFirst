package com.uet.project.service;


import com.uet.project.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class StoreService {
    private final StoreRepository storeRepository;
}
