package com.example.perfumeshop.service;

import com.example.perfumeshop.mapper.PerfumeMapper;
import com.example.perfumeshop.vos.PerfumeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PerfumeService {
    @Autowired
    PerfumeMapper perfumeMapper;
    // 하나의 향수 정보 가져오기
    public PerfumeVO get_perfume_info(int perfumeID){ return perfumeMapper.get_perfume_info(perfumeID); }

    // 있는 향수 싹 다 가져옴
    public List<PerfumeVO> get_all_perfume_list(){
        return perfumeMapper.get_all_perfume_list();
    }

    // 특정 젠더를 기준으로 모든 향수 가져옴
    public List<PerfumeVO> get_gender_perfume_list(String perfumeGender){ return perfumeMapper.get_gender_perfume_list(perfumeGender);}

    // 특정 젠더 기준 카테고리 기능
    public List<PerfumeVO> get_gender_ml_list(String perfumeGender, int perfumeML){return perfumeMapper.get_gender_ml_list(perfumeGender, perfumeML);}
    public List<PerfumeVO> get_gender_big_ml_list(String perfumeGender, int perfumeML){return perfumeMapper.get_gender_big_ml_list(perfumeGender, perfumeML);}
    public List<PerfumeVO> get_gender_price_list(String perfumeGender, String priceSetting){return perfumeMapper.get_gender_price_list(perfumeGender, priceSetting);}
    public List<PerfumeVO> get_gender_ml_price_list(String perfumeGender, int perfumeML, String priceSetting){return perfumeMapper.get_gender_ml_price_list(perfumeGender, perfumeML, priceSetting);}
    public List<PerfumeVO> get_gender_big_ml_price_list(String perfumeGender, int perfumeML, String priceSetting){return perfumeMapper.get_gender_big_ml_price_list(perfumeGender, perfumeML, priceSetting);}

    // 검색 결과로 향수 찾기
    public List<PerfumeVO> search_perfume_list(String word){return perfumeMapper.search_perfume_list(word);}

    // 검색 결과 기준 카테고리 기능
    public List<PerfumeVO> search_ml_perfume_list(String word, int perfumeML){return perfumeMapper.search_ml_perfume_list(word, perfumeML);}
    public List<PerfumeVO> search_big_ml_perfume_list(String word, int perfumeML){return perfumeMapper.search_big_ml_perfume_list(word, perfumeML);}
    public List<PerfumeVO> search_price_perfume_list(String word, String priceSetting){return perfumeMapper.search_price_perfume_list(word, priceSetting);}
    public List<PerfumeVO> search_ml_price_perfume_list(String word, int perfumeML, String priceSetting){return perfumeMapper.search_ml_price_perfume_list(word, perfumeML, priceSetting);}
    public List<PerfumeVO> search_big_ml_price_perfume_list(String word, int perfumeML, String priceSetting){return perfumeMapper.search_big_ml_price_perfume_list(word, perfumeML, priceSetting);}





    // 상품 등록 할 때
    public boolean add_perfume(PerfumeVO vo){
        return perfumeMapper.add_perfume(vo);
    }

    // 상품 등록 후 파일에도 등록하기 위해서 마지막으로 등록한 퍼퓸아이디를 가져옴
    public int find_last_perfumeID(){
        return perfumeMapper.find_last_perfumeID();
    }



}
