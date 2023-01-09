package com.example.perfumeshop.mapper;

import com.example.perfumeshop.vos.FileVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Mapper
public interface FileMapper {

    void add_file(FileVO fileVO);

    FileVO file_info_get(int perfumeID);
}
