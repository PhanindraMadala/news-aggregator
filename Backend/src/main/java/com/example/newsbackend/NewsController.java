package com.example.newsbackend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import java.util.Map;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    @Value("${news.api.key}")
    private String apiKey;

    private static final String BASE_URL = "https://newsapi.org/v2/everything?q=%s&apiKey=%s";

    @GetMapping("/{topic}")
    public ResponseEntity<Map<String, Object>> getNewsByTopic(@PathVariable String topic) {
        String url = String.format(BASE_URL, topic, apiKey);
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        return ResponseEntity.ok(response);
    }
}
