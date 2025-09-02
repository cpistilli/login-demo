package com.faffo.login_demo.controller;

import com.faffo.login_demo.service.weatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "http://localhost:3000")
public class WeatherController {
    private final weatherService weatherService;
    public WeatherController(weatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping
    public Mono<String> getWeather(@RequestParam String city,
                                   @RequestParam(defaultValue = "standard") String units) {
        return weatherService.getCurrentWeather(city, units);
    }
}


