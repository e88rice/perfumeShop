package com.example.perfumeshop.service;

import com.example.perfumeshop.mapper.BasketMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BasketService {

    @Autowired
    BasketMapper basketMapper;

    public boolean insert_basket(String userID, int perfumeID){return basketMapper.insert_basket(userID, perfumeID);}

}
