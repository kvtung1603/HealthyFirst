package com.uet.project.controller;


import com.uet.project.entity.User;
import com.uet.project.model.Store;
import com.uet.project.service.StoreService;
import com.uet.project.service.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@RestController
public class StoreController {
    private final StoreService storeService;

    private final UserDetailsServiceImpl userDetailsService;

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

    @GetMapping("/store/{userId}")
    public Set<Store> getByUser(@PathVariable String userId) {
        User user = userDetailsService.findByUserName(userId);
        return user.getStores();
    }
}
