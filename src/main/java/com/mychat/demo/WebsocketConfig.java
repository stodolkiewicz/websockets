package com.mychat.demo;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@Configuration
@EnableWebSocketMessageBroker
public class WebsocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config){
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }
//    enableSimpleBroker() to enable a simple memory-based
//    message broker to carry the greeting messages back
//    to the client on destinations prefixed with "/topic"

    // /app prefix will be used to define all the message
    // mappings; for example, "/app/hello" is the endpoint
    // that the GreetingController.greeting() method is
    // mapped to handle.


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/gs-guide-websocket")
                .setAllowedOrigins("http://127.0.0.1:8081")
                .setAllowedOrigins("http://localhost:8081")
                .withSockJS();
    }
//    The registerStompEndpoints() method registers the
//    "/gs-guide-websocket" endpoint, enabling SockJS
//    fallback options so that alternate transports may
//    be used if WebSocket is not available.

    //CORS - enable calls from another domain by -
    // .setAllowedOrigins("http://127.0.0.1:8081")
}
