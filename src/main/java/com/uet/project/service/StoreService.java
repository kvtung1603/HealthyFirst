package com.uet.project.service;


import com.uet.project.model.Store;
import com.uet.project.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class StoreService {
    private final StoreRepository storeRepository;

    public List<Store> findAllStore() {
        return (List<Store>) storeRepository.findAll();
    }

    public Store save(Store store) {
        return storeRepository.save(store);
    }

    public List<Store> findStoreByAddress(String address) {
        return (List<Store>) storeRepository.findStoreByAddress(address);
    }

    public List<Store> findStoreByType(String type) {
        return (List<Store>) storeRepository.findStoreByType(type);
    }

    public void delete(Store store) {
        storeRepository.delete(store);
    }

    public Store findStoreById(int id) {
        return storeRepository.findById(id).get();
    }

    
}
