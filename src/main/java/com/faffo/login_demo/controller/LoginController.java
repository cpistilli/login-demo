package com.faffo.login_demo.controller;

import com.faffo.login_demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.faffo.login_demo.dto.UserDTO;

@RestController
@CrossOrigin(origins = "http://localhost:3000")

    public class LoginController {
        @Autowired
        private UserService userService;

        @GetMapping("/login")
        public String showLoginForm() {
            return "login";
        }

        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
            boolean success = userService.login(userDTO.getUsername(), userDTO.getPassword());
            if (success) {
                return ResponseEntity.ok().body("{\"message\": \"¡Login exitoso!\"}");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"¡Credenciales invalidas!\"}");
            }
        }

        @PostMapping("/register")
        @ResponseBody
        public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
            userService.registerUser(userDTO.getUsername(), userDTO.getPassword());
            return ResponseEntity.ok().body("{\"message\": \"¡Usuario registrado con exito!\"}");
        }
    }

