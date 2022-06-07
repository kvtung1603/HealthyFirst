package com.uet.project.controller;


import com.uet.project.dto.UserLoginDTO;
import com.uet.project.entity.Role;
import com.uet.project.entity.User;
import com.uet.project.security.JwtTokenProvider;
import com.uet.project.service.AuthenticationService;
import com.uet.project.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController()
public class RegisterController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserDetailsServiceImpl userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody UserLoginDTO userDTO) {
        User user;
        if (userService.existsByUsername(userDTO.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists.");
        }

        Set<Role> roles = new HashSet();
        roles.add(new Role("ROLE_USER"));

        user = new User(userDTO.getUsername(), passwordEncoder.encode(userDTO.getPassword()));
        user.setRoles(roles);
        user.setStatus("NEW");
        user.setEmail(userDTO.getEmail());
        userService.saveUser(user);

        UserDetails userDetails = userService.loadUserByUsername(userDTO.getUsername());
        String token = jwtTokenProvider.generateToken(userDetails);

        Map<String, Object> model = new HashMap<>();
        model.put("token", token);

        return new ResponseEntity(model, HttpStatus.CREATED);
    }
//    @PostMapping(value = "/register")
//    public ResponseEntity<AuthToken> register(@RequestBody UserDTO loginUser) {
//
//        AuthToken authToken = authenticationService.registerUser(loginUser);
//
//        return new ResponseEntity<>(authToken, HttpStatus.OK);
//    }

    @PostMapping(value = "/logout/{username}")
    public ResponseEntity<String> logout(@PathVariable String username) {

        String authToken = authenticationService.logout(username);

        return new ResponseEntity<>(authToken, HttpStatus.OK);

    }

    @GetMapping("/admin/new/user")
    @PreAuthorize("ADMIN")
    public List<User> findAllUserByStatus() {
        return userService.findByStatus("NEW");
    }

    @PutMapping("/admin/new/update")
    @PreAuthorize("ADMIN")
    public ResponseEntity<String> acceptAccount(@RequestBody User user) {
        User u = userService.findByUserName(user.getUsername());
        if (u.getStatus().equals("NEW")) {
            u.setStatus("ACTIVE");
        }
        var u1 = userService.saveUser(u);
        return ResponseEntity.status(HttpStatus.OK).body("Accepted Account!!!");
    }


}
