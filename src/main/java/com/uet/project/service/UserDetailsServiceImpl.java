package com.uet.project.service;

import com.uet.project.entity.User;
import com.uet.project.entity.UserDetailsIm;
import com.uet.project.model.Store;
import com.uet.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public boolean existsByUsername(String name) {
        return userRepository.existsByUsername(name);
    }

    public User findByUserName(String name) {
        return userRepository.findByUsername(name);
    }

    public User saveUser(User u) {
        return userRepository.save(u);
    }

    public List<User> findAll() {
        return (List<User>) userRepository.findAll();
    }

    public User findById(long user_id) {
        return userRepository.findById(user_id).get();
    }

    public List<User> findByStatus(String status) {
        return userRepository.findByStatus(status);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        var user = findByUserName(name);
        if (user == null) {
            throw new UsernameNotFoundException("Username not found " + name);
        }
        return UserDetailsIm.build(user);
    }

//    public void resetPassword(String token, String username) {
//        User user = findByUserName(username);
//        if (user != null) {
//            user.setChangePasswordToken(token);
//            saveUser(user);
//        }
//    }

    public User findByChangePasswordToken(String token) {
        return userRepository.findByChangePasswordToken(token);
    }

    public void updatePassword(User user, String newPassword) {
        user.setPassword(bCryptPasswordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public Set<Store> findAllStoreByUser(long user_id) {
        var user = userRepository.findById(user_id).get();
        return user.getStores();
    }

    public void delete(long id) {
        userRepository.deleteById(id);
    }


}
