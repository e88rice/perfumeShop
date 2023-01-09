package com.example.perfumeshop.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.time.LocalDate;
import java.util.Collection;

@Getter
@Setter
@ToString
public class UserDTO extends User {

    private String userID;
    private String userPW;
    private String userName;
    private String userNickname;
    private String userEmail;
    private String userTel;
    private LocalDate registerDate;
    private String role;

    public UserDTO(String username,
                   String password,
                   String userName,
                   String userNickname,
                   String userEmail,
                   String userTel,
                   LocalDate registerDate,
                   String role,
                   Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.userID = username;
        this.userPW = password;
        this.userName = userName;
        this.userNickname = userNickname;
        this.userEmail = userEmail;
        this.userTel = userTel;
        this.registerDate = registerDate;
        this.role = role;
    }
}
