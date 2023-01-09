package com.example.perfumeshop.vos;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UserVO {
    private String userID;
    private String userPW;
    private String userName;
    private String userNickname;
    private String userEmail;
    private String userTel;
    private LocalDate registerDate;
    private String role;

}
