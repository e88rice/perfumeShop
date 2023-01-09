package com.example.perfumeshop.vos;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FileVO {

    private int index;
    private String filename;
    private String filepath;
    private int perfumeID;
}
