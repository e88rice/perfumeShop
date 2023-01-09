package com.example.perfumeshop.security;

import com.example.perfumeshop.dtos.UserDTO;
import com.example.perfumeshop.service.UserService;
import com.example.perfumeshop.vos.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;

public class CustomizeAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Autowired
    private UserService userService;


    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        String msg = "";
        String ID = request.getParameter("username");
        String PW = request.getParameter("password");
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        UserVO vo = userService.find_user(ID);
        if(vo == null){
            msg = "UserNotFound";
        }
        msg = URLEncoder.encode(msg, "UTF-8");
        response.sendRedirect("/user/login?msg="+msg);

    }
}
