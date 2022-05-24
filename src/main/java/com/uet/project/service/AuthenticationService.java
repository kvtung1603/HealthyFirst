package com.uet.project.service;

import com.google.gson.Gson;
import com.uet.project.dto.UserDTO;
import com.uet.project.entity.AuthToken;
import com.uet.project.repository.AuthTokenRepsitory;
import com.uet.project.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {
    public static final long TIME_TO_LIVE = 5*60*60;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthTokenRepsitory authTokenRepsitory;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

//    public AuthToken registerUser(UserDTO loginUser) {
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginUser.getUsername(), loginUser.getPassword()));
//        final UserDetails user = userDetailsService.loadUserByUsername(loginUser.getUsername());
//        final String token = jwtTokenProvider.generateToken(user);
//
//        AuthToken authToken = authTokenRepsitory.findByUsername(user.getUsername());
//        if (authToken != null) {
//            authToken.setToken(token);
//            authToken.setUsername(user.getUsername());
//            authToken.setCreatedTime(new Date(System.currentTimeMillis()));
//            authToken.setExpireTime(new Date(System.currentTimeMillis() + TIME_TO_LIVE * 1000));
//            authToken.setIsExpired(false);
//            authTokenRepsitory.save(authToken);
//        } else {
//            authToken = new AuthToken();
//            authToken.setToken(token);
//            authToken.setUsername(user.getUsername());
//            authToken.setCreatedTime(new Date(System.currentTimeMillis()));
//            authToken.setExpireTime(new Date(System.currentTimeMillis() + TIME_TO_LIVE * 1000));
//            authToken.setIsExpired(false);
//            authTokenRepsitory.save(authToken);
//        }
//        return authToken;
//    }

    public AuthToken save(AuthToken token) {
        return authTokenRepsitory.save(token);
    }


    public String logout(String token) {
//
//        AuthToken authToken = authTokenRepsitory.findByUsername(username);
//        authToken.setToken(null);
//
//        HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
//                .currentRequestAttributes()).getRequest();
//        authTokenRepsitory.save(authToken);
//        Map<String, String> logoutSuccess = new HashMap<>();
//        logoutSuccess.put("Status", "logout Successfully");
//        Gson gson = new Gson();
//        String logoutSuccessMessageJson = gson.toJson(logoutSuccess);
//
//
//        return logoutSuccessMessageJson;

        AuthToken authToken = authTokenRepsitory.findByToken(token);
        authTokenRepsitory.deleteById(authToken.getId());

        return "Delete success";

    }

}
