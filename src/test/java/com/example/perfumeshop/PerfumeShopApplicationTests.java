package com.example.perfumeshop;

import com.example.perfumeshop.mapper.PerfumeMapper;
import com.example.perfumeshop.service.PerfumeService;
import com.example.perfumeshop.service.ReviewService;
import com.example.perfumeshop.service.UserService;
import com.example.perfumeshop.vos.ReviewVO;
import com.example.perfumeshop.vos.UserVO;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@Log4j2
@SpringBootTest
class PerfumeShopApplicationTests {
//
//    @Autowired
//    ReviewService reviewService;
//
//    @Autowired
//    UserService userService;
//
//    @Autowired
//    PerfumeService perfumeService;
//
//    @Test
//    void contextLoads() {
//        UserVO vo = new UserVO("e88rice", "test123!", "이현준", "e88",
//                "guswns8780@naver.com", "010-3697-2115", null, null);
//        userService.register(vo);
//    }
//
//    @Test
//    void test1(){
//        ReviewVO vo = new ReviewVO(1, 5, "ㅎㅇ", 6, null, "관리자",
//                null, null);
////        log.info(reviewService.review_insert(vo));
//    }
//
//    @Test
//    void test2(){
//        log.info(userService.find_user("e76rice"));
//
//    }
//
//    @Test
//    void test3(){
//        log.info(perfumeService.get_gender_ml_price_list("woman", 30, "DESC"));
//    }
//
//    @Test
//    void test4(){
//        log.info(perfumeService.get_gender_big_ml_price_list("woman", 30, "DESC"));
//    }
//
//    @Test
//    void test5(){
//        log.info(perfumeService.get_gender_big_ml_list("woman", 30));
//    }
}
