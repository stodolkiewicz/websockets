package com.mychat.demo;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import javax.inject.Inject;

@Controller
public class ChatController {


    private SimpMessagingTemplate template;

    @Inject
    public ChatController(SimpMessagingTemplate template){
        this.template = template;
    }

    @MessageMapping("/hello")
    @SendTo("/chat/all")
    public Message sendMessageToEveryone(Message message) throws InterruptedException {
        System.out.println("msg" + message.getCurrentTime());
        return message;
    }

    @MessageMapping("/pm/{user}")
    @SendTo("/chat/{user}")
    public Message relayMessage(Message message, @DestinationVariable String user){
        System.out.println("msg" + message.getMessage() + user);
        return message;
    }
}