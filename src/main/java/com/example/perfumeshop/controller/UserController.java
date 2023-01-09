package com.example.perfumeshop.controller;

import com.example.perfumeshop.dtos.UserDTO;
import com.example.perfumeshop.service.UserService;
import com.example.perfumeshop.vos.UserVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;

@Log4j2
@Controller
public class UserController {

    @Autowired
    UserService userService;

    // 로그인 뷰
    @GetMapping("/user/login")
    public void login_view(){}

    @PostMapping("/user/login")
    public String login_do(String username){
        log.info(username+"님이 로그인 시도하였습니다");
        return "redirect:/user/register";
    }

    // 회원가입 뷰
    @GetMapping("/user/register")
    public void register_view(){}

    // 회원가입 기능
    @PostMapping("/user/register")
    public String register_do(UserVO vo){
        log.info("========== user_register =========");
        log.info(vo);
        userService.register(vo);
        return "redirect:/";
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/user/mypage")
    public void mypage_view(
            @AuthenticationPrincipal UserDTO userDTO,
            Model model
            ){

        model.addAttribute("orderList", userService.get_user_order_list(userDTO.getUserID()));
        model.addAttribute("basketList", userService.get_user_basket_list(userDTO.getUserID()));

    }

    @GetMapping("/user/mypage/basket/del/{index}")
    public String mypage_basket_del(
            HttpServletRequest request,
            @AuthenticationPrincipal UserDTO userDTO,
            @PathVariable int index
    ){
        if(index == 0){ // 인덱스가 0으로 왔다면
            userService.all_del_basket(userDTO.getUserID());
        }
        else if(index > 0){ // 인덱스가 0 이상으로 도착했다면
            userService.del_basket(index);
        }
        String referer = request.getHeader("Referer"); // 이전 페이지로 이동시키기 위한 변수
        return "redirect:" + referer;
    }



}
