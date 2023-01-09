package com.example.perfumeshop.vos;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class OrderVO {
    private int index;
    private String orderUserID;
    private int orderPerfumeID;
    private int orderCount;
    private LocalDate orderDate;
}
