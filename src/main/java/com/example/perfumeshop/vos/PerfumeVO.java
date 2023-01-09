package com.example.perfumeshop.vos;

import lombok.*;
import org.apache.ibatis.type.Alias;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PerfumeVO {
    private int perfumeID; // 인덱스값
    private String perfumeCompany; // 회사
    private String perfumeGender; // 추천성별
    private String perfumeTitle; // 제품명
    private String perfumeContent; // 제품 간단설명
    private String perfumeScent; // 제품향
    private int perfumePrice; // 제품 판매가격
    private int perfumeOriginPrice; // 제품 원래가격
    private int perfumeML; // 제품용량
    private String perfumeImage; // 제품 메인사진
}
