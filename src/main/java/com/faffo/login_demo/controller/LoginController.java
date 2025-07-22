package com.faffo.login_demo.controller;

import com.faffo.login_demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class LoginController {
    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }
    @PostMapping("/login")
    public String login(@RequestParam String username,
                        @RequestParam String password,
                        Model model) {
        boolean success = userService.login(username, password);
        if (success) {
            model.addAttribute("mensaje", "Login exitoso");
            return "success";
        } else {
            model.addAttribute("error", "Usuario o Contraseña incorrectos");
            return "login";
        }
    }
    @PostMapping("/register")
    @ResponseBody
    public String register(@RequestParam String username,
                           @RequestParam String password) {
        userService.registerUser(username, password);
        return "Usuario registrado exitosamente";
    }
}
