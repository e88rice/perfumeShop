package com.example.perfumeshop.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BasketMapper {

    boolean insert_basket(String userID, int perfumeID);

}
