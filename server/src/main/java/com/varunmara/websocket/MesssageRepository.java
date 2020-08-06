package com.varunmara.websocket;

import org.springframework.stereotype.Component;

import java.util.ArrayDeque;

import java.util.Queue;

@Component
public class MesssageRepository {

    private Queue<String> cache = new ArrayDeque<>();

    public void add(String str){
    	while(cache.size() > 9) {
    		cache.poll();
    	}
        cache.add(str);
        
    }

    public Queue<String> getCache(){
        return this.cache;
    }
}
