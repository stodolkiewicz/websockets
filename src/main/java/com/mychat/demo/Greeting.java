package com.mychat.demo;

//from server
public class Greeting {

    private String content;

    public Greeting(){}

    public Greeting(String content){
        this.content = content;
    }

    public String getContent(){
        return content;
    }

}
