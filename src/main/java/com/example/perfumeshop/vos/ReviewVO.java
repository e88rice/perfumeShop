package com.example.perfumeshop.vos;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ReviewVO {
    private int reviewPerfumeID;    // 리뷰를 등록한 상품의 번호
    private int reviewNo;           // 리뷰의 순차정보 (인덱스)
    private String reviewContent;   // 리뷰의 내용
    private int reviewGrade;        // 1~10을 담고 있는 리뷰의 별점 밸류 1이면 별0.5개
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate reviewDate;   // 리뷰 작성일
    private String reviewUserNick;  // 리뷰 작성자 닉네임
    private String filename;        // 리뷰 파일이름
    private String filepath;        // 리뷰 파일경로
}
