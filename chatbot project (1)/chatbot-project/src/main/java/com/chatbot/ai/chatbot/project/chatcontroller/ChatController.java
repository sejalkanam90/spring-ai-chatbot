package com.chatbot.ai.chatbot.project.chatcontroller;

import org.springframework.web.bind.annotation.*;
import com.chatbot.ai.chatbot.project.chatservice.ChatService;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    // Test API
    @GetMapping
    public String api() {
        return "API is working";
    }

    // ✅ JSON Chat API
    @PostMapping
    public Map<String, String> message(@RequestBody Map<String, String> req) {

        String userMsg = req.get("message");   // JSON input

        String reply = chatService.ask(userMsg);

        return Map.of("response", reply);      // JSON output
    }
}