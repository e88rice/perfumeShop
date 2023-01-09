package com.example.perfumeshop.mapper;

import com.example.perfumeshop.vos.PerfumeVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PerfumeMapper {
    // 하나의 향수 정보 가져옴
    PerfumeVO get_perfume_info(int perfumeID);

    // 있는 향수 싹 다 가져옴
    List<PerfumeVO> get_all_perfume_list();

    // 특정 젠더를 기준으로 모든 향수 가져옴
    List<PerfumeVO> get_gender_perfume_list(String perfumeGender);

    // 특정 젠더 기준 카테고리 기능
    List<PerfumeVO> get_gender_ml_list(String perfumeGender, int perfumeML);
    List<PerfumeVO> get_gender_big_ml_list(String perfumeGender, int perfumeML);
    List<PerfumeVO> get_gender_price_list(String perfumeGender, String priceSetting);
    List<PerfumeVO> get_gender_ml_price_list(String perfumeGender, int perfumeML, String priceSetting);
    List<PerfumeVO> get_gender_big_ml_price_list(String perfumeGender, int perfumeML, String priceSetting);

    // 검색 결과로 향수 찾기
    List<PerfumeVO> search_perfume_list(String word);
    // 검색 결과 기준 카테고리 기능
    List<PerfumeVO> search_ml_perfume_list(String word, int perfumeML);
    List<PerfumeVO> search_big_ml_perfume_list(String word, int perfumeML);
    List<PerfumeVO> search_price_perfume_list(String word, String priceSetting);
    List<PerfumeVO> search_ml_price_perfume_list(String word, int perfumeML, String priceSetting);
    List<PerfumeVO> search_big_ml_price_perfume_list(String word, int perfumeML, String priceSetting);


    // 상품 등록 할 때
    boolean add_perfume(PerfumeVO vo);

    // 상품 등록 후 파일에도 등록하기 위해서 마지막으로 등록한 퍼퓸아이디를 가져옴
    int find_last_perfumeID();

}
