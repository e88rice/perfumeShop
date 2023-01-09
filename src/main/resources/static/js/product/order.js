// 정보 세팅
const prices = [...document.getElementsByClassName("product_price")];
const totalOrderPrice = document.getElementById("total_order_price");

const tel1 = document.getElementById("user_tel_1");
const tel2 = document.getElementById("user_tel_2");
const tel3 = document.getElementById("user_tel_3");

const addressTel1 = document.getElementById("address_tel_1");
const addressTel2 = document.getElementById("address_tel_2");
const addressTel3 = document.getElementById("address_tel_3");

const tel = document.getElementById("user_tel");

// 주문
const orderBtn = document.getElementById("order_btn");
const perfumeIDS = [...document.getElementsByClassName("save_perfumeID")];
const counts = [...document.getElementsByClassName("save_count")];


const request = new XMLHttpRequest();

window.onload = () => {
    let result = 0;

    prices.forEach(function (e){
        result += parseInt(e.textContent);
    })
    result += perfumeIDS.length*2500;
    totalOrderPrice.textContent = parseInt(result).toLocaleString()+"원";

    prices.forEach(function (e){ // 가격 구분점 달아주고
        e.textContent = parseInt(e.textContent).toLocaleString()+"원";
    })

    console.log(tel.value)

    // 번호들 다 채워주고
    tel1.value = tel.value.substr(0,3);
    tel2.value = tel.value.substr(3,4);
    tel3.value = tel.value.substr(7,4);

    addressTel1.value = tel.value.substr(0,3);
    addressTel2.value = tel.value.substr(3,4);
    addressTel3.value = tel.value.substr(7,4);


}

orderBtn.onclick = () => {
    let perfumeID_Array = []; // 향수 번호 배열 그릇
    let productCount_Array = []; // 상품 개수 배열 그릇
    perfumeIDS.forEach(function (e){
        perfumeID_Array.push(e.value); // 그릇 배열의 끝에 향수 번호를 추가 저장함
    })

    counts.forEach(function (e){
        productCount_Array.push(e.value); // 그릇 배열의 끝에 상품 개수를 추가 저장함
    })
    // 모든 배열이 다 준비 됐다면 리스트를 보내서 주문내역으로 인서트함
    console.log(perfumeID_Array)
    console.log(productCount_Array);
    location.href=`/product/basket/allbuy/${perfumeID_Array}/${productCount_Array}`



}
