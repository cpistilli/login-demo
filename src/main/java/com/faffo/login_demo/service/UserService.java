package com.faffo.login_demo.service;

import com.faffo.login_demo.model.User;
import com.faffo.login_demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User registerUser(String username, String password) {
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
          throw new IllegalArgumentException("El nombre de usuario ya esta en uso");
        }
        User user = new User(username, password);
        return userRepository.save(user);
    }
    public boolean login(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return  user.getPassword().equals(password);
        } else {
            return false;
        }
    }

}

//public User registerUser(String username, String password) {
  //  Optional<User> existingUser = userRepository.findByUsername(username);
    //if (existingUser.isPresent()) {
      //  throw new IllegalArgumentException("El nombre de usuario ya esta en uso");
    //}
    //User user = new User(username, password);
    //return userRepository.save(user);
//}
