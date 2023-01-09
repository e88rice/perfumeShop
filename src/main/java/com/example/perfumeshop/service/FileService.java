package com.example.perfumeshop.service;

import com.example.perfumeshop.mapper.FileMapper;
import com.example.perfumeshop.mapper.PerfumeMapper;
import com.example.perfumeshop.vos.FileVO;
import com.example.perfumeshop.vos.ReviewVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@Log4j2
@Service
public class FileService {

    @Autowired
    FileMapper fileMapper;

    @Autowired
    PerfumeMapper perfumeMapper;

    public FileVO file_info_get(int perfumeID){
        return fileMapper.file_info_get(perfumeID);
    }

    public void add_file(List<FileVO> fileVOS) {
        for(FileVO fileVO:fileVOS){
            log.info("확인용 : "+fileVO);
            fileMapper.add_file(fileVO);
        }
    }
}
