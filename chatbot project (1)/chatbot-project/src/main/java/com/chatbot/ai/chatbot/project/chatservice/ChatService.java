package com.chatbot.ai.chatbot.project.chatservice;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatClient chatClient;

    public ChatService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String ask(String msg) {
        return chatClient.prompt().user(msg).call().content();
    }
}