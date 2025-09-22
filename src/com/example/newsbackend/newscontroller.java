package com.example.newsbackend;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private List<Map<String, String>> articles = new ArrayList<>();

    @GetMapping
    public List<Map<String, String>> getNews() {
        return articles;
    }

    @PostMapping
    public Map<String, String> addNews(@RequestBody Map<String, String> article) {
        articles.add(0, article);
        return article;
    }
}
