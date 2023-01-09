package com.example.perfumeshop.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

// 디폴트어쩌고 상속받아서 커스텀 할거임
@Log4j2
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Override // 일단 상속받으셈
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // userRequest에 로그인한 정보가 들어있음
        log.info("-------------------- OAuth2User loadUser --------------------");
        ClientRegistration clientRegistration = userRequest.getClientRegistration();
        // OAuth2User 로그인한 클라이언트의 이름 => 카카오 로그인이므로 kakao가 나옴
        // 클라이언트의 이름을 가져옴 (kakao임 google 이나 daum 일수도있고)
        String clientName = clientRegistration.getClientName();
        log.info("clientName: "+clientName);
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> paramMap = oAuth2User.getAttributes();
        paramMap.forEach((k , v) -> {
            log.info("key = "+k);
            log.info("value = "+v);
        });

        String email = null;
        String nickname = null;

        switch (clientName){
            case "kakao":
                nickname = get_kakao_nickname(paramMap);
                email = get_kakao_email(paramMap);
                break;
            default:
                break;
        }
        log.info("닉네임 : " + nickname);
        log.info("이메일 : " + email);
        return oAuth2User;
    }

    private String get_kakao_email(Map<String, Object> paramMap){
        return (String)((Map)paramMap.get("kakao_account")).get("email");
    }

    private String get_kakao_nickname(Map<String, Object> paramMap){
        return (String)((Map)paramMap.get("properties")).get("nickname");
    }

}
