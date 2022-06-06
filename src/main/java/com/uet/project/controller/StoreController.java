package com.uet.project.controller;


import com.uet.project.model.Store;
import com.uet.project.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class StoreController {
    private final StoreService storeService;

//    @GetMapping("/store/all-store")
//    public List<Store> findAll() {
//        return storeService.findAllStore();
//    }
//
//    @GetMapping("/store/{address}")
//    public List<Store> findStoreByAddress(@PathVariable("address") String address) {
//        return storeService.findStoreByAddress(address);
//    }

    @GetMapping("/find/store/restaurant")
    public List<Store> findAllRestaurant() {
        return storeService.findStoreByType("RESTAURANT");
    }

    @GetMapping("/find/store/manufacturing")
    public List<Store> findAllManufacturing() {
        return storeService.findStoreByType("MANUFACTURING");
    }

    @PostMapping("/store/registry")
    public Store save(@RequestBody Store store) {
        return storeService.save(store);
    }

    @DeleteMapping("/store")
    public void deleteStore(@RequestBody Store store) {
        storeService.delete(store);
    }


}
