package com.example.perfumeshop.mapper;

import com.example.perfumeshop.vos.ReviewVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Mapper
public interface ReviewMapper {

    // 리뷰 리스트 가져오기
    List<ReviewVO> review_list_get(int perfumeID);

    // 리뷰 등록
    void review_insert(ReviewVO vo);

}
