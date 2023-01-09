package com.example.perfumeshop.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrderMapper {

    boolean insert_order(String userID, int perfumeID, int count);

}
