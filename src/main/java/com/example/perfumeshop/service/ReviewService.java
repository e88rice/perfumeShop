package com.example.perfumeshop.service;

import com.example.perfumeshop.mapper.ReviewMapper;
import com.example.perfumeshop.vos.ReviewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;
import java.util.UUID;

@Service
public class ReviewService {

    @Autowired
    ReviewMapper reviewMapper;

    // 리뷰 리스트 가져오기
    public List<ReviewVO> review_list_get(int perfumeID){
        return reviewMapper.review_list_get(perfumeID);
    }


    // 리뷰 작성
    public void review_insert(ReviewVO vo, MultipartFile file, HttpServletRequest request) throws Exception{

        // 저장할 경로를 미리 정해둔 후
        String reviewPath = System.getProperty("user.dir") + "/classes/static/image/review";
        // 랜덤 식별자
        UUID uuid = UUID.randomUUID();
        // 파일이름을 랜덤 식별자와 원래 파일이름 사이에 밑줄넣은 상태로 지정한다
        String fileName = uuid + "_" + file.getOriginalFilename();
        // 파일이 들어갈 껍데기를 생성
        File saveFile = new File(reviewPath, fileName);
        // 받아온 파일을 껍데기에 넣는다
        file.transferTo(saveFile);

        if(file.getOriginalFilename() != ""){ // 파일첨부를 했을때만
            vo.setFilename(fileName); // vo에 파일네임컬럼과
            vo.setFilepath("/image/review/"+fileName); // 파일패스컬럼을 채워준다
            // 그리고 매퍼한테 보냄
            reviewMapper.review_insert(vo);
        }
        else{ // 파일첨부를 안했다면 파일에 대한 정보없이 보냄
            reviewMapper.review_insert(vo);
        }
    }

}
