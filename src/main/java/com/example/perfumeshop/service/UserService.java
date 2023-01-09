package com.example.perfumeshop.service;

import com.example.perfumeshop.dtos.PerfumeDTO;
import com.example.perfumeshop.mapper.UserMapper;
import com.example.perfumeshop.vos.PerfumeVO;
import com.example.perfumeshop.vos.UserVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 유저 로그인 할 때 정보 가져오는거
    public UserVO find_user(@Param("userID") String username){
        return userMapper.find_user(username);
    }

    // 유저 회원가입
    public boolean register(UserVO vo){
        vo.setUserPW(passwordEncoder.encode(vo.getUserPW()));
        return userMapper.register(vo);
    }

    // 유저 이름으로 주문 내역 리스트 가져오기
    public List<PerfumeDTO> get_user_order_list(String userID){return userMapper.get_user_order_list(userID);}

    // 유저 이름으로 장바구니 내역 가져오기
    public List<PerfumeVO> get_user_basket_list(String userID){return userMapper.get_user_basket_list(userID);}

    // 인덱스로 장바구니 상품 하나 삭제
    public boolean del_basket(int index){return userMapper.del_basket(index);}

    public boolean all_del_basket(String userID){return userMapper.all_del_basket(userID);}


}
