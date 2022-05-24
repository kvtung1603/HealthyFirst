package com.uet.project.controller;

import com.uet.project.dto.UserDTO;
import com.uet.project.entity.AuthToken;
import com.uet.project.entity.User;
import com.uet.project.security.JwtTokenProvider;
import com.uet.project.service.AuthenticationService;
import com.uet.project.service.UserDetailsServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginController {

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    private AuthenticationManager authenticationManagerBean;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody UserDTO userDTO ) {

        Authentication authentication = authenticationManagerBean.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtTokenProvider.generateToken(userDetails);

//        Optional<User> user = userService.findByName(userName);
//        if (!user.isPresent()) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unregistered Email.");
//        }
//        if (!user.get().getPassWord().equals(passWord)) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong password");
//        }
//        return new ResponseEntity<User>(user.get(), HttpStatus.OK);

        AuthToken authToken = authenticationService.save(new AuthToken(token));

        return ResponseEntity.ok(token);
    }

//
//    @PostMapping("/change_password/{user_id}")
//    public ResponseEntity changePassword(@PathVariable int user_id, @RequestParam String newPassword, @RequestParam String oldPassword) {
//        if (newPassword.isEmpty()) {
//            return new ResponseEntity("", HttpStatus.OK);
//        }
//        User user = userDetailsServiceImpl.findById(user_id);
//        if (user != null) {
//            if (!bCryptPasswordEncoder.matches(user.getPassword(), oldPassword)) {
//                return new ResponseEntity("wrong password", HttpStatus.OK);
//            }
//            userDetailsServiceImpl.updatePassword(user, newPassword);
//            return new ResponseEntity("change password success!!", HttpStatus.OK);
//        } else {
//            return new ResponseEntity("Can't find user by id", HttpStatus.CREATED);
//        }
//    }




}
