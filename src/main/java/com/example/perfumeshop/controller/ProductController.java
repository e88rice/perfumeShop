package com.example.perfumeshop.controller;

import com.example.perfumeshop.dtos.UserDTO;
import com.example.perfumeshop.service.*;
import com.example.perfumeshop.vos.PerfumeVO;
import com.example.perfumeshop.vos.ReviewVO;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Log4j2
@Controller
public class ProductController {

    @Autowired
    UserService userService;
    @Autowired
    ReviewService reviewService;
    @Autowired
    PerfumeService perfumeService;
    @Autowired
    FileService fileService;
    @Autowired
    OrderService orderService;
    @Autowired
    BasketService basketService;


    // 향수번호로 향수 상세페이지 보여줌
    @GetMapping({"/product/detail/{perfumeID}"})
    public String product_show_detail(
            @PathVariable(required = false) int perfumeID,
            Model model
    ){
        model.addAttribute("perfume_info", perfumeService.get_perfume_info(perfumeID));
        model.addAttribute("review_info", reviewService.review_list_get(perfumeID));
        model.addAttribute("file_info", fileService.file_info_get(perfumeID));
        return "product/detail";
    }

    // 향수번호로 향수의 리뷰들을 가져올 수 있는 rest 컨트롤러
    @ResponseBody
    @GetMapping("/product/detail/review.view/{perfumeID}")
    public List<ReviewVO> review_list_get(@PathVariable int perfumeID) {
        return reviewService.review_list_get(perfumeID);
    }

    // 리뷰 작성하면 데이터베이스에 추가. 이미지가 있으면 이미지 폴더에 생성해줌
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/product/detail/review.do")
    public String product_review_do(
            ReviewVO vo,
            MultipartFile file,
            Model model,
            HttpServletRequest request,
            @AuthenticationPrincipal UserDTO userDTO
    ) throws Exception{
        vo.setReviewUserNick(userDTO.getUserNickname());
        if(file != null) {
            log.info("ㅎㅇㅎㅇ" + vo);
            log.info("확인용 " + file);
            log.info("확인2 " + file.getOriginalFilename());
            if (file.getOriginalFilename() == "") {
                log.info("비었는데요??");
                log.info("현재 vo상태: " + vo);
                reviewService.review_insert(vo, file, request);
            } else {
                log.info("되는데요??");
                reviewService.review_insert(vo, file, request);
            }
        }
        String referer = request.getHeader("Referer"); // 이전 페이지로 이동시키기 위한 변수
        return "redirect:" + referer;
    }


    // 맨 처음 남성향수, 여성향수, 공용향수 누르고 들어오면 보여주는 뷰
    @GetMapping("/product/category/{perfumeGender}")
    public String category_products(
            @PathVariable String perfumeGender,
            Model model
    ){
        model.addAttribute("perfumes", perfumeService.get_gender_perfume_list(perfumeGender));

        return "product/category";
    }

    // 카테고리페이지 카테고리 기능
    @ResponseBody
    @GetMapping("/product/category/{perfumeGender}/{perfumeML}/{priceSetting}") // 세팅
    public List<PerfumeVO> category_setting(
            @PathVariable String perfumeGender,
            @PathVariable(required = false) int perfumeML,
            @PathVariable(required = false) String priceSetting)
    {
        
        // 일단 여기 도착을 했다면 뭐 하나라도 선택됐다는 뜻

        if(perfumeML==0){ // ml가 선택되지 않았다는 말
            return perfumeService.get_gender_price_list(perfumeGender, priceSetting); // 가격순 정렬
        }
        else if(priceSetting.equals("null")){ // 가격만 안왔을때
            if(perfumeML <= 50){ // 만약 전달된 ML가 50과 같거나 낮다면
                return perfumeService.get_gender_ml_list(perfumeGender, perfumeML);
            }
            else if(perfumeML >= 50){ // 만약 전달된 ML가 50과 같거나 높다면
                return perfumeService.get_gender_big_ml_list(perfumeGender, perfumeML);
            }
        }
        else{ // ml과 가격 둘 다 전달 되었을 경우
            if(perfumeML <= 50){ // 만약 전달된 ML가 50과 같거나 낮다면
                return perfumeService.get_gender_ml_price_list(perfumeGender, perfumeML, priceSetting);
            }
            else if(perfumeML >= 50){ // 만약 전달된 ML가 50과 같거나 높다면
                return perfumeService.get_gender_big_ml_price_list(perfumeGender, perfumeML, priceSetting);
            }
        }
        return null; // 여기까지 올 수가 없음
    }

    // 서치 기능
    @GetMapping("/product/search/{word}")
    public String searchView(
            @PathVariable String word,
            Model model
    ){
        model.addAttribute("perfumes", perfumeService.search_perfume_list(word));


        return "product/search";
    }

    // 서치에서 카테고리 기능
    @ResponseBody
    @GetMapping("/product/search/{word}/{perfumeML}/{priceSetting}") // 세팅
    public List<PerfumeVO> search_setting(
            @PathVariable String word,
            @PathVariable(required = false) int perfumeML,
            @PathVariable(required = false) String priceSetting)
    {

        // 일단 여기 도착을 했다면 뭐 하나라도 선택됐다는 뜻

        if(perfumeML==0){ // ml가 선택되지 않았다는 말
            return perfumeService.search_price_perfume_list(word, priceSetting); // 가격순 정렬
        }
        else if(priceSetting.equals("null")){ // 가격만 안왔을때
            if(perfumeML <= 50){ // 만약 전달된 ML가 50과 같거나 낮다면
                return perfumeService.search_ml_perfume_list(word, perfumeML);
            }
            else if(perfumeML >= 50){ // 만약 전달된 ML가 50과 같거나 높다면
                return perfumeService.search_big_ml_perfume_list(word, perfumeML);
            }
        }
        else{ // ml과 가격 둘 다 전달 되었을 경우
            if(perfumeML <= 50){ // 만약 전달된 ML가 50과 같거나 낮다면
                return perfumeService.search_ml_price_perfume_list(word, perfumeML, priceSetting);
            }
            else if(perfumeML >= 50){ // 만약 전달된 ML가 50과 같거나 높다면
                return perfumeService.search_big_ml_price_perfume_list(word, perfumeML, priceSetting);
            }
        }
        return null; // 여기까지 올 수가 없음
    }
    // 하나 구매
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/product/order/{perfumeID}/{count}")
    public String order(
            @AuthenticationPrincipal UserDTO userDTO,
            @PathVariable int perfumeID,
            @PathVariable int count
    ){
        orderService.insert_order(userDTO.getUserID(), perfumeID, count);

        return "redirect:/user/mypage";
    }

    // 장바구니 넣기
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/product/basket/{perfumeID}")
    public String basket(
            @AuthenticationPrincipal UserDTO userDTO,
            @PathVariable int perfumeID
    ){
        basketService.insert_basket(userDTO.getUserID(), perfumeID);

        return "redirect:/user/mypage";
    }

    // 장바구니 전부 주문할 수 있는 페이지
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/product/basket/all/order/{perfumeIDS}/{counts}")
    public String basket_all_order(
            @PathVariable List<Integer> perfumeIDS,
            @PathVariable List<Integer> counts,
            Model model
    ){
        List<PerfumeVO> perfumes = new ArrayList<>(); // VO로 만들어주고
        for (int i=0; i<perfumeIDS.size(); i++){
            PerfumeVO vo = perfumeService.get_perfume_info(perfumeIDS.get(i));
            perfumes.add(vo);
        }
        model.addAttribute("perfumes", perfumes);
        model.addAttribute("counts", counts);
        return "product/order";
    }
    // 장바구니 전부 주문!
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/product/basket/allbuy/{perfumeIDS}/{counts}")
    public String basket_all_buy(
            @AuthenticationPrincipal UserDTO userDTO,
            @PathVariable List<Integer> perfumeIDS,
            @PathVariable List<Integer> counts
    ){
        // 주문 내역으로 하나씩 추가한다
        for (int i = 0; i < perfumeIDS.size(); i++) {
            orderService.insert_order(userDTO.getUserID(), perfumeIDS.get(i), counts.get(i));
        }
        // 추가 했으니 장바구니는 모두 비운다
        userService.all_del_basket(userDTO.getUserID());

        return "redirect:/user/mypage";
    }

}
