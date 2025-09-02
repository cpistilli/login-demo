package com.faffo.login_demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class weatherService {
    private final WebClient webClient;

    @Value("${openweather.api.key}")
    private String apikey;

    public weatherService(
            WebClient.Builder builder,
            @Value("${openweather.api.base}") String baseUrl) {
        this.webClient = builder.baseUrl(baseUrl).build();
    }


    public Mono<String> getCurrentWeather(String city, String units) {
        return webClient.get()
                .uri(uri -> uri
                        .path("/weather")
                        .queryParam("q", city)
                        .queryParam("appid", apikey)
                        .queryParam("units", units)
                        .build())
                .retrieve()
                .bodyToMono(String.class);

    }
}
