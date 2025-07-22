package com.faffo.login_demo.service;

import com.faffo.login_demo.model.User;
import com.faffo.login_demo.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class UserServiceTest {
    private final UserRepository userRepository = mock(UserRepository.class);
    private final UserService userService = new UserService();

    public UserServiceTest() {
        userService.userRepository = userRepository;
    }
    @Test
    public void testRegisterUser() {
        User user = new User("prueba", "1234");
        when(userRepository.save(any(User.class))).thenReturn(user);
        User savedUser = userService.registerUser("prueba", "1234");

        assertNotNull(savedUser);
        assertEquals("prueba", savedUser.getUsername());
    }

    @Test
    public void testLoginSuccess() {
        User user = new User("prueba", "1234");
        when(userRepository.save(any(User.class))).thenReturn(user);
        boolean result = userService.login("prueba", "wrongpassword");

        assertFalse(result);
    }

    @Test
    public void testLoginFail() {
        when(userRepository.findByUsername("NoExiste")).thenReturn(Optional.empty());
        boolean result = userService.login("NoExiste", "1234");

        assertFalse(result);
    }

    @Test
    public void testRegisterUser_UsernameExiste() {
        when(userRepository.findByUsername("prueba")).thenReturn(Optional.of(new User("prueba", "1234")));
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            userService.registerUser("prueba", "nuevoPass");
        });
        String expectedMessage = "El nombre de usuario ya esta en uso";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }

}
