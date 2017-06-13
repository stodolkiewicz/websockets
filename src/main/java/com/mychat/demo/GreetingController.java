package com.mychat.demo;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GreetingController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws InterruptedException {
        Thread.sleep(1000);
        System.out.println("hey ! Works!");
        return new Greeting(
                "This is our server speaking." +
                        " Hello" + message.getName() + "!");
    }

}
//    The @MessageMapping annotation ensures that if a
//    message is sent to destination "/hello",
//    then the greeting() method is called.
//
//    The return value is broadcast to all subscribers
//    to "/topic/greetings" as specified
//    in the @SendTo annotation.


