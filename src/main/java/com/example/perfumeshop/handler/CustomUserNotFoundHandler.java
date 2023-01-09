package com.example.perfumeshop.handler;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomUserNotFoundHandler extends UsernameNotFoundException {

    public CustomUserNotFoundHandler(String msg) {
        super(msg);
    }
    private void customUserNotFoundHandler(){

    }
}
