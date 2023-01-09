package com.example.perfumeshop.service;


import com.example.perfumeshop.dtos.UserDTO;
import com.example.perfumeshop.mapper.UserMapper;
import com.example.perfumeshop.vos.UserVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Log4j2
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;


    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info(" ------------- loadUserByUsername ----------------");
        log.info(username + "님이 로그인 시도하였습니다!");

        UserVO userVO = userMapper.find_user(username);

        if(userVO == null){
            throw new UsernameNotFoundException(username + ": 해당 유저는 존재하지 않습니다....");
        }

        return new UserDTO(
                    username,
                    userVO.getUserPW(),
                    userVO.getUserName(),
                    userVO.getUserNickname(),
                    userVO.getUserEmail(),
                    userVO.getUserTel(),
                    userVO.getRegisterDate(),
                    userVO.getRole(),
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_" + userVO.getRole()))
        );
    }
}
