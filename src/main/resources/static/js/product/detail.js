const request = new XMLHttpRequest(); // 여기서 컨트롤러에 접근 가능

// 메인과 서브이미지들 자리를 교체하려고 만들었지만 현재 안쓰고 있는 변수들
const mainImage = document.getElementById("main-image");
const subImage = [...document.getElementsByClassName("sub-image")];

// 상품 수량조절과 관련된 변수들
const productCountInput = document.getElementById("product-count-input");
const countPlusBtn = document.getElementById("count-plus-btn");
const countMinusBtn = document.getElementById("count-minus-btn");
const productPriceText = document.getElementById("product-price-text");
const productSavePrice = document.getElementById("product-save-price-hidden");
const productOriginPriceText = document.getElementById("product-origin-price-text");

// 상세정보, 상품후기 버튼과 관련된 변수들
const infoImagePage = document.getElementById("product-info-image");
const infoImagePageBtn = document.getElementById("product-info-image-btn");
const reviewPage = document.getElementById("review-container");
const reviewPageBtn = document.getElementById("product-review-btn");
const reviewReadContainer = document.getElementById("review-read-container");

// ajax로 리뷰 가져올 때 쓰는 변수들
const savePerfumeID = document.getElementById("save_perfumeID");
const reviewWrap = document.getElementById("review-read-wrap");
const reviewNullContainer = document.getElementById("null-review-container");

// 리뷰 코멘트 상세정보 펼치기에 쓰는 변수들
const reviewComments = [...document.getElementsByClassName("review-comment")];
const reviewAllComments = [...document.getElementsByClassName("review-all-comment")];

// 주문하기 버튼
const orderBtn = document.getElementById("order-btn");
// 장바구니 담기 버튼
const basketBtn = document.getElementById("basket-btn");

// 상세정보
infoImagePageBtn.onclick = () => {
    infoImagePage.style.display = "block";
    infoImagePageBtn.style.fontWeight = "bold";
    infoImagePageBtn.style.color = "black";

    reviewPage.setAttribute("hidden", true);
    reviewPageBtn.style.fontWeight = "normal";
    reviewPageBtn.style.color = "rgba(0,0,0,0.7)";

    reviewNullContainer.setAttribute("hidden", true);

    reviewReadContainer.setAttribute("hidden", true);
}
// 상품후기
reviewPageBtn.onclick = () => {
    infoImagePage.style.display = "none";
    infoImagePageBtn.style.fontWeight = "normal";
    infoImagePageBtn.style.color = "rgba(0,0,0,0.7)";

    reviewPage.removeAttribute("hidden");
    reviewPageBtn.style.fontWeight = "bold";
    reviewPageBtn.style.color = "black";

    reviewNullContainer.removeAttribute("hidden");


    reviewReadContainer.removeAttribute("hidden");
}

let review_index_count = 1;

// 리뷰 가져오는거
window.onload = () => {
    productPriceText.textContent = parseInt(productPriceText.textContent).toLocaleString();
    productOriginPriceText.textContent = parseInt(productOriginPriceText.textContent).toLocaleString();
    request.open('GET', 'http://localhost:8080/product/detail/review.view/'+savePerfumeID.value);
    request.send();
    request.onload = () => {
        reviewWrap.innerHTML = '';
        const reviewObj = JSON.parse(request.response);
        if(reviewObj.length === 0){ // 만약 리뷰가 하나도 없다면
            reviewReadContainer.innerHTML = ''; // 리뷰를 저장하는 컨테이너 삭제
        }
        else { // 리뷰가 하나 이상이라면
            reviewNullContainer.innerHTML = ''; // 아무것도 없을 때 띄우는 메세지 컨테이너 삭제
        }
        reviewObj.forEach(obj => {
            create_review(obj)
        })
    }

}

// 리뷰 작성 폼
function create_review(object){
    const review_grade_width = parseInt(object.reviewGrade*10); // 점수만큼 보이게 할 변수


    // 이미지 있는 경우
    const review_Image_form = "<div class=\"review-list\">\n" +
        "                <span class=\"review review-index\">" + review_index_count + "</span>\n" +
        "                <span class=\"review-grade-wrap\">\n" +
        "                    ★★★★★\n" +
        "                    <span class=\"review review-grade\" style=\"width:"+review_grade_width + '%' +"\">★★★★★</span>\n" +
        "                </span>\n" +
        "                <span class=\"review review-userNick\"> " + object.reviewUserNick + " </span>\n" +
        "                <span class=\"review review-comment\" onclick='review_open(this)' >\n" +
        "                  <span>"+ object.reviewContent +"</span>   \n"+
        "                  <i class=\"fa-solid fa-image\"></i>   \n"+
        "               </span>\n" +
        "                <span class=\"review review-date\"> " + object.reviewDate + " </span>\n" +
        "            </div>\n" +
        "            <div class=\"review-all-comment\" style=\"display: none\">\n" +
        "                <img src=\"../../image/review/" + object.filename +"\" alt=\"상품사진\">\n" +
        "                <span>\n" +
        "                    "+ object.reviewContent +"\n" +
        "                </span>\n" +
        "            </div>";

    // 이미지 없는 경우
    const review_form = "<div class=\"review-list\">\n" +
        "                <span class=\"review review-index\">" + review_index_count + "</span>\n" +
        "                <span class=\"review-grade-wrap\">\n" +
        "                    ★★★★★\n" +
        "                    <span class=\"review review-grade\" style=\"width:"+review_grade_width + '%' +"\">★★★★★</span>\n" +
        "                </span>\n" +
        "                <span class=\"review review-userNick\"> " + object.reviewUserNick + " </span>\n" +
        "                <span class=\"review review-comment\" onclick='review_open(this)' >\n" +
        "                  <span>"+ object.reviewContent +"</span>   \n"+
        "               </span>\n" +
        "                <span class=\"review review-date\"> " + object.reviewDate + " </span>\n" +
        "            </div>\n" +
        "            <div class=\"review-all-comment\" style=\"display: none\">\n" +
        "                <span>\n" +
        "                    "+ object.reviewContent +"\n" +
        "                </span>\n" +
        "            </div>";
    if(object.filename === null){
        reviewWrap.insertAdjacentHTML('afterbegin', review_form); // 이미지 없는 리뷰 폼으로 불러오기
    }
    else{
        reviewWrap.insertAdjacentHTML('afterbegin', review_Image_form); // 이미지 리뷰 폼으로 불러오기
    }
    review_index_count++;
}


// 별점 슬라이드 이벤트
const drawStar = (target) => {
    document.querySelector(`.star span`).style.width = `${target.value * 10}%`;
    console.log(target.value);
}

// 코멘트 상세정보 펼치기 기능
function review_open(event){
    // console.log(event)
    const allComment = event.parentElement.nextElementSibling;
    const allCommentList = [...document.getElementsByClassName("review-all-comment")];
    if(allComment.style.display === "none"){ // 펼쳐져 있지 않을 때
        allCommentList.forEach(function (element){
            element.style.display = "none" // 일단 펼쳐져 있는거 다 접고
        })
        allComment.style.display = "block"; // 선택한 친구만 펼쳐줌
        }
    else if(allComment.style.display === "block"){ // 펼쳐져 있을 때
        allComment.style.display = "none"; // 닫음
    }

}



// 플러스 버튼 누르면 상품개수 밸류+1, 상품 가격도 올라감
countPlusBtn.onclick = () => {
    productCountInput.value = parseInt(productCountInput.value) + 1;
    const priceSaveText = productSavePrice.value; // 원래 가격 저장해놓고
    let priceTextPart = productPriceText.textContent.split(','); // 현재 상품가격 밸류의 쉼표를 제거
    let resultPrice = '';
    for (let i=0; i<priceTextPart.length; i++){
        resultPrice += priceTextPart[i];
    }
    productPriceText.textContent = (parseInt(resultPrice)+parseInt(priceSaveText)).toLocaleString(); // 현재 가격 + 원래 가격

    if(parseInt(productCountInput.value) > 20){ // 일단 최대 20개 까지만
        productCountInput.value = parseInt(productCountInput.value) - 1;
        console.log(productCountInput.value);

    }
}

// 마이너스 버튼 누르면 상품개수 밸류-1
countMinusBtn.onclick = () => {
    if(parseInt(productCountInput.value) !== 1){ // 상품 갯수 1 이하로는 못떨굼
        const priceSaveText = productSavePrice.value;
        let priceTextPart = productPriceText.textContent.split(','); // 쉼표를 제거
        let resultPrice = '';
        for (let i=0; i<priceTextPart.length; i++){
            resultPrice += priceTextPart[i];
        }
        productPriceText.textContent = (parseInt(resultPrice)-parseInt(priceSaveText)).toLocaleString();

        productCountInput.value = parseInt(productCountInput.value) - 1;
    }
}

orderBtn.onclick = () => {
    const perfumeID = [];
    perfumeID.push(savePerfumeID.value); // 향수 아이디
    const count = [];
    count.push(productCountInput.value); // 상품 개수

    location.href = `/product/basket/all/order/${perfumeID}/${count}`;
}

basketBtn.onclick = () => {
    const perfumeID = savePerfumeID.value; // 향수 아이디

    location.href = `/product/basket/${perfumeID}`;
}







// // 메인 이미지 바뀌는 이벤트
// subImage.forEach(item => {
//     item.onclick = () => {
//         const itemPath = item.getAttribute("src");
//         const mainPath = mainImage.getAttribute("src");
//         mainImage.setAttribute("src", itemPath);
//         item.setAttribute("src", mainPath);
//
//
//     }
// })
