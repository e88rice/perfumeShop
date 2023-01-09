const productsContainer = document.getElementsByClassName('products_container').item(0); // 상품들이 보이는 컨테이너
const recommendWrap = document.getElementById("recommend-wrap");
const bestWrap = document.getElementById("best-wrap");
const request = new XMLHttpRequest(); // 여기서 컨트롤러에 접근 가능


window.onload = () => { // 페이지가 처음 열렸을 때
    request.open('GET', 'http://localhost:8080/main/perfume_all_get'); // rest컨트롤러에 get방식의 main을 방문
    request.send();
    request.onload = () => { // 요청과 응답을 정상적으로 처리했다면
        productsContainer.innerHTML = ''; // 미리 존재했던 상품들 전체를 없앤다. 제로베이스로 만듬
        const perfumeObj = JSON.parse(request.response); // 응답으로 받았던 response에 있는 객체를 자바스크립트 객체로 변환
        perfumeObj.forEach(obj => { // 받은 객체는 리스트이기 때문에 포이치로 순회
            create_product(obj); // 상품의 기본생성틀을 가지고 있는 함수에 알맞은 데이터를 넣어 각각 생성
        })
    }
}


let count = 1;



function create_product(object){
    // Wrap 태그들안에 productsContainer를 찾아서 거기다가 insert 해주기 위한 변수
    const recommendProductsContainer = recommendWrap.firstElementChild.nextElementSibling;
    const bestProductsContainer = bestWrap.firstElementChild.nextElementSibling;
    // 상품명앞에 그 상품의 상호명을 가질 변수
    const perfumeCompanyText = "[" + object.perfumeCompany + "] ";
    const perfumePriceText = object.perfumePrice.toLocaleString()+"원";
    // 생성틀을 가진 변수
    const perfumeForm =
        "      <a href=\"/product/detail/" + object.perfumeID + "\">\n" +
        "        <div class=\"product_wrap\">\n" +
        "          <img class=\"product_thumbnail\" src=\"/image/products/" + object.perfumeImage + "\" alt=\"상품사진\">\n" +
        "          <div class=\"product_title\">" + perfumeCompanyText + object.perfumeTitle + "</div>\n" +
        "          <div class=\"product_content\"> " + object.perfumeContent + "</div>\n" +
        "          <div class=\"product_price\"> " + perfumePriceText + "</div>\n" +
        "        </div>\n" +
        "      </a>";


    if(count <= 8){ // 1~8번 향수까지는 추천태그에
        recommendProductsContainer.insertAdjacentHTML('beforeend', perfumeForm);  // 완성된 상품을 컨테이너 마지막에 추가
    }
    else if(count > 8 && count <= 16){ // 9~16 까지는 베스트 아이템에
        bestProductsContainer.insertAdjacentHTML('beforeend', perfumeForm);  // 완성된 상품을 컨테이너 마지막에 추가
    }
    count++;
}

