package com.example.perfumeshop.controller;

import com.example.perfumeshop.dtos.UserDTO;
import com.example.perfumeshop.service.FileService;
import com.example.perfumeshop.service.PerfumeService;
import com.example.perfumeshop.vos.FileVO;
import com.example.perfumeshop.vos.PerfumeVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Log4j2
@Controller
public class MainCotroller {

    @Autowired
    PerfumeService perfumeService;

    @Autowired
    FileService fileService;


    @GetMapping("/")
    public String main_view(
            @AuthenticationPrincipal UserDTO userDTO
    ){
        log.info("헬로헬로 " +userDTO);
        return "/main/main";
    }

    @PostMapping("/")
    public String main_view_post(
            @AuthenticationPrincipal UserDTO userDTO
    ){         log.info("헬로헬로2 " +userDTO);
        return "/main/main"; }

    @ResponseBody
    @GetMapping("/main/perfume_all_get")
    public List<PerfumeVO> main_perfume_get(){
        return perfumeService.get_all_perfume_list();
    }

//    @ResponseBody
//    @GetMapping("/main/perfume_file_get/{perfumeID}")
//    public FileVO main_perfume_file_get(
//            @PathVariable int perfumeID
//    ){
//        return fileService.file_main_get(perfumeID);
//    }
}
