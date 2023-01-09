package com.example.perfumeshop.service;

import com.example.perfumeshop.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    OrderMapper orderMapper;

    public boolean insert_order(String userID, int perfumeID, int count){return orderMapper.insert_order(userID, perfumeID, count);}

}
