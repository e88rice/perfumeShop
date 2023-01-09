package com.example.perfumeshop.vos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class BasketVO {
    private int index;
    private String basketUserID;
    private int basketPerfumeID;
}
