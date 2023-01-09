package com.example.perfumeshop.mapper;

import com.example.perfumeshop.dtos.PerfumeDTO;
import com.example.perfumeshop.vos.PerfumeVO;
import com.example.perfumeshop.vos.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Mapper
public interface UserMapper {

    // 로그인 할 때 유저 정보 가져오는거
    UserVO find_user(String userID);

    // 회원가입
    boolean register(UserVO vo);

    // 유저 이름으로 주문 내역 가져오기
    List<PerfumeDTO> get_user_order_list(String userID);

    // 유저 이름으로 장바구니 내역 가져오기
    List<PerfumeVO> get_user_basket_list(String userID);

    boolean del_basket(int index);

    boolean all_del_basket(String userID);

}
