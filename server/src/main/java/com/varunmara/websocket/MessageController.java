package com.varunmara.websocket;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RestController;

import java.util.Queue;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MessageController {

    @Autowired
    private MesssageRepository messageRepository;

    @CrossOrigin
    @MessageMapping("/history")
    @SendTo("/topic/cache")
    public Queue<String> store(@PathVariable String str) throws Exception{
        messageRepository.add(str);
        return messageRepository.getCache();
    }
    
    
    @GetMapping("/hello")
    public String greeting() {
    	return "Hello!";
    }
    
    
    @GetMapping("/cache")
    public Queue<String> getCache() {
    	return messageRepository.getCache();
    }
}
