package com.example.perfumeshop.controller;

import com.example.perfumeshop.service.FileService;
import com.example.perfumeshop.service.PerfumeService;
import com.example.perfumeshop.vos.FileVO;
import com.example.perfumeshop.vos.PerfumeVO;
import lombok.extern.log4j.Log4j2;
import org.apache.coyote.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Log4j2
@Controller
public class AdminController {

    @Autowired
    PerfumeService perfumeService;

    @Autowired
    FileService fileService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/add_product")
    public void add_product_view() {
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/add_product")
    public void add_product_view_post() {
    }

    @PreAuthorize("hasRole('ADMIN')")
    // 상품 등록 (향수테이블, 파일테이블 둘 다)
    @PostMapping("/admin/add_product.do")
    public String add_product_do(
            PerfumeVO perfumeVO,
            List<MultipartFile> files,
            HttpServletRequest request
    ) throws Exception{

        UUID uuid = UUID.randomUUID();
        String productFilePath = request.getContextPath() +"/image/products";
        List<FileVO> fileVOS = new ArrayList<>();

        log.info("추가 전 마지막 퍼퓸 번호 확인: "+perfumeService.find_last_perfumeID());
        log.info("퍼퓸확인: " + perfumeVO);
        for(MultipartFile file : files){
            if(file.getOriginalFilename().contains("main")){
                log.info("향수이름 "+file.getOriginalFilename());
                perfumeVO.setPerfumeImage(uuid+"_"+file.getOriginalFilename());
                perfumeService.add_perfume(perfumeVO); // 새로운 퍼퓸 추가
            }
        }
        log.info("추가 후 마지막 퍼퓸 번호 확인: "+ perfumeService.find_last_perfumeID());



        for (MultipartFile file : files) {
            FileVO vo = new FileVO();
            log.info("-----멀티파트파일리스트 확인-----");
            log.info(file);
            String fileName = uuid + "_" + file.getOriginalFilename();
            File saveFile = new File(productFilePath, fileName);
            file.transferTo(saveFile);
            vo.setPerfumeID(perfumeService.find_last_perfumeID()); // 퍼퓸번호도 채워주고
            vo.setFilename(fileName); // vo에 파일네임컬럼과
            vo.setFilepath("/image/products/"+fileName); // 파일패스컬럼을 채워준다
            fileVOS.add(vo); // 그리고 리스트에 추가해줌

        }

        fileService.add_file(fileVOS); // 정보를 채워 넣은 완성된 리스트를 서비스에 보내줌


//        return "redirect:/admin/add_product";
            return "redirect:/admin/add_product";
        }


    }
