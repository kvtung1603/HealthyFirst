package com.uet.project.controller;


import com.uet.project.dto.UserInfoDTO;
import com.uet.project.entity.User;
import com.uet.project.model.Store;
import com.uet.project.service.StoreService;
import com.uet.project.service.UserDetailsServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
public class UserController {

    @Autowired
    private UserDetailsServiceImpl userService;

    @Autowired
    private StoreService storeService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/find/user/active")
    public List<UserInfoDTO> findActiveUser() {
        var lstUser = userService.findByStatus("ACTIVE");
        return lstUser.stream().map(user -> modelMapper.map(user, UserInfoDTO.class)).collect(Collectors.toList());
    }

    @GetMapping("/find/user/new")
    public List<UserInfoDTO> findNewUser() {
        var lstUser = userService.findByStatus("NEW");
        return lstUser.stream().map(user -> modelMapper.map(user, UserInfoDTO.class)).collect(Collectors.toList());
    }


    @PutMapping("/update/user/{user_id}/store/{store_id}")
    public ResponseEntity<String> saveUser(@PathVariable long user_id, @PathVariable int store_id) {
        User user = userService.findById(user_id);

        var store = storeService.findStoreById(store_id);
        var stStore = user.getStores();
        stStore.add(store);
        user.setStores(stStore);

        userService.saveUser(user);

        return ResponseEntity.ok("ok");
    }
    //done
    @GetMapping("/find/store/{user_id}")
    public Set<Store> findAllStoreByUser(@PathVariable long user_id) {
        var user = userService.findById(user_id);
        var setStore = user.getStores();
        return setStore;
    }

    @DeleteMapping("/remove/user/{id}")
    public void removeUser(@PathVariable long id) {
        userService.delete(id);
    }

    @PutMapping("/update-status/user/{id}")
    public User update(@PathVariable long id) {
        User user = userService.findById(id);
        user.setStatus("ACTIVE");
        return userService.saveUser(user);
    }







}
