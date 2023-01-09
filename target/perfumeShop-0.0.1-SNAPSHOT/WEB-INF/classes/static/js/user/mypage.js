const Prices = [...document.getElementsByClassName("prices")];
const basketPrices = [...document.getElementsByClassName("basket_prices")];
const totalPrice = document.getElementById("total_price");
const countPlusBtn = [...document.getElementsByClassName("count-plus-btn")];
const countMinusBtn = [...document.getElementsByClassName("count-minus-btn")];


// 주문한 상품들 가격 총합
const totalOrderPrice = document.getElementById("total_order_price");
// 주문한 상품들 가격
const orderPrices = [...document.getElementsByClassName("order_prices")];
// 모은 적립금
const totalSaving = document.getElementById("total_saving");

// 다 사기 버튼
const allBuyButton = document.getElementById("all-buy-btn");
// 향수 수량
const productCountInput = [...document.getElementsByClassName("product-count-input")];
const savePerfumeID = [...document.getElementsByClassName("save_perfumeID")];

const request = new XMLHttpRequest(); // 여기서 컨트롤러에 접근 가능

// 장바구니 페이징 설정
let options = { // 옵션
    numberPerPage:4, // 페이지당 데이터 양
    goBar:true, // 페이지를 입력해서 이동할 수 있는 바
    pageCounter:true, // 페이지를 카운트해주는 친구

};

let result_total_order_price = 0;

// 페이징 및 총 주문금액 계산하고 구분점 달아주는 이벤트
window.onload = () => {
    Prices_reload();
    // 계산, 구분점
    orderPrices.forEach(function (e){
        const split = e.textContent.split(',');
        let result = '';
        for (let i=0; i<split.length; i++){
            result += split[i]
        }
        result_total_order_price += parseInt(result);

        totalOrderPrice.textContent = parseInt(result_total_order_price).toLocaleString() + "원";

        totalSaving.textContent = (parseInt(result_total_order_price) / 100).toLocaleString() + "원";
    })

    // 페이징
    paginate.init('.myTable', options); // 태그안의 데이터와 옵션을 기준으로 페이징


}



// 가격에 구분점 달 때 쓰는 변수
let total_price = 0;
// 가격에 구분점 달아주는 함수
function Prices_reload(){
    Prices.forEach(function (e){
        const split = e.textContent.split('원')[0].split(',');
        let result = '';
        for (let i=0; i<split.length; i++){
            result += split[i]
        }
        e.textContent = parseInt(result).toLocaleString() + "원";
    })
    total_price = 0;
    basketPrices.forEach(function (e){
        const split = e.textContent.split('원')[0].split(',');
        let result = '';
        for (let i=0; i<split.length; i++){
            result += split[i]
        }
        total_price += parseInt(result);
    })


    totalPrice.textContent = "총 합계금액:\t" + total_price.toLocaleString() + "원";
}

// 개수 input 조작
productCountInput.forEach(function (e){
    e.onchange = () => {
        if (e.value > 100 || e.value < 1){
            e.value = 1;
            return;
        }
        const originPrice = e.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value; // 원래 가격
        const productPrice = e.parentElement.nextElementSibling; // 상품 가격 쓰는곳 가져옴
        productPrice.textContent = (parseInt(originPrice) * parseInt(e.value)).toLocaleString()+"원";

        Prices_reload();
    }
})
// 수량 +
countPlusBtn.forEach(function (e){
    e.onclick = () => {
        if(parseInt(e.previousElementSibling.value) < 1 || e.previousElementSibling.value > 100){
            return;
        }
        e.previousElementSibling.value = parseInt(e.previousElementSibling.value) + 1; // 밸류 올리고
        const originPrice = e.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value; // 원래 가격
        const productPrice = e.parentElement.nextElementSibling; // 상품 가격 쓰는곳 가져옴

        productPrice.textContent = (parseInt(originPrice) * parseInt(e.previousElementSibling.value)).toLocaleString()+"원";

        Prices_reload();
    }
})
// 수량 -
countMinusBtn.forEach(function (e){
    e.onclick = () => {
        console.log(e.previousElementSibling.previousElementSibling.value);
        if(parseInt(e.previousElementSibling.previousElementSibling.value) <= 1){
            return;
        }
        e.previousElementSibling.previousElementSibling.value = parseInt(e.previousElementSibling.previousElementSibling.value) - 1; // 밸류 내리고
        const originPrice = e.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value; // 원래 가격
        const splitPrice = e.parentElement.nextElementSibling.textContent.split('원')[0].split(','); // 현재 가격 쉼표기준으로 나누고
        const productPrice = e.parentElement.nextElementSibling; // 상품 가격 쓰는곳
        let changeProductPrice = ''; // 나눈 거 옮겨담을 그릇
        for (let i=0; i< splitPrice.length; i++){
            changeProductPrice += splitPrice[i] // 옮겨주고
        }

        productPrice.textContent = (parseInt(changeProductPrice) - parseInt(originPrice)).toLocaleString()+"원";

        Prices_reload();
    }
})
// 장바구니 구매하기 버튼
allBuyButton.onclick = () => {
    let perfumeID_Array = []; // 향수 번호 배열 그릇
    let productCount_Array = []; // 상품 개수 배열 그릇
    savePerfumeID.forEach(function (e){
        perfumeID_Array.push(e.value); // 그릇 배열의 끝에 향수 번호를 추가 저장함
    })
    console.log(perfumeID_Array);
    productCountInput.forEach(function (e){
        productCount_Array.push(e.value); // 그릇 배열의 끝에 상품 개수를 추가 저장함
    })
    // 모든 배열이 다 준비 됐다면 order창으로 리스트를 보내줌
    location.href=`/product/basket/all/order/${perfumeID_Array}/${productCount_Array}`;
}







// 페이징 기능
(function (window){
    'use strict';

    // 이 함수에 모든 코드가 포함
    function lignePaginate(){
        var _lignePaginate = {};

        /**
         * 실행하기 전 모든 구성 및 유효성 검사
         * 페이지 매김 및 필터(할당된 경우)
         **/
        _lignePaginate.init = function(el, options = {numberPerPage: 10,goBar:false,pageCounter:true},filter = [{el: null}]
        ){
            setTableEl(el);
            initTable(_lignePaginate.getEl());
            checkIsTableNull();
            setOptions(options);
            setConstNumberPerPage(options.numberPerPage);
            setFilterOptions(filter);
            launchPaginate();
        }
        /**
         * 페이지 섫정
         **/
        var settings = {
            el:null,
            table:null,
            numberPerPage:5,
            constNumberPerPage:5,
            numberOfPages:0,
            goBar:false,
            pageCounter:true,
            hasPagination:true,
        };

        var filterSettings = {
            el:null,
            filterBox:null,
            trs:null,
        }

        /**
         * Setters private
         **/

        var setConstNumberPerPage = function(number){
            settings.constNumberPerPage = number;
        }
        var setNumberPerPage = function(number){
            settings.numberPerPage = number;
        }

        var initTable = function(el){
            if(el.indexOf('#') > -1 ){
                settings.table = document.getElementById(el.replace('#','').trim());
            }else if(el.indexOf('.') > -1  ){
                settings.table = document.querySelector(el);
            }
        }

        var iniFilter = function(el){
            if(el.indexOf('#') > -1 ){
                filterSettings.filterBox = document.getElementById(el.replace('#','').trim());
            }else if(el.indexOf('.') > -1  ){
                filterSettings.filterBox = document.querySelector(el);
            }
        }

        var setTableEl = function(el){
            settings.el = el;
        }

        var setFilterOptions = function (filterOptions) {
            if(filterOptions.el != null){
                setFilterEl(filterOptions.el);
                iniFilter(filterSettings.el);
                checkIsFilterBoxNull();
                setFunctionInFilterBox();
            }
        }

        var setFilterEl = function(el){
            filterSettings.el = el;
        }

        var setFunctionInFilterBox = function(){
            filterSettings.filterBox.setAttribute('onkeyup','paginate.filter()')
        }

        var setGoBar = function(value){
            settings.goBar = value;
        }

        var setPageCounter = function(value){
            settings.pageCounter = value;
        }

        /**
         * Getters public
         **/


        _lignePaginate.getEl = function(){
            return settings.el;
        }
        _lignePaginate.getTable = function(){
            return settings.table;
        }
        _lignePaginate.getNumberPerPage = function(){
            return settings.numberPerPage;
        }

        _lignePaginate.getConstNumberPerPage = function(){
            return settings.constNumberPerPage;
        }

        /**
         * Private Methods
         **/

        var table,tr = [],pageCount,numberPerPage,th;

        var setOptions = function(options){
            if(options.numberPerPage != settings.numberPerPage){
                setNumberPerPage(options.numberPerPage);
            }

            if(typeof options.goBar === 'boolean')
                setGoBar(options.goBar);

            if(typeof options.pageCounter === 'boolean')
                setPageCounter(options.pageCounter);
        }

        var checkIsTableNull = function(){
            if(settings.table == null){
                throw new Error('Element ' + _lignePaginate.getEl() + ' no exits');
            }
        }

        var checkIsFilterBoxNull = function(){
            if(filterSettings.filterBox == null){
                throw new Error('Element ' + _lignePaginate.getEl() + ' no exits');
            }
        }

        var paginateAlreadyExists = function() {
            let paginate = document.querySelector('div.paginate');
            if(paginate != null)
                removePaginate(paginate);
        }

        var removePaginate = function(element){
            element.parentNode.removeChild(element);
        }

        var hiddenPaginateControls = function(){
            document.querySelector('.paginate_controls').style.visibility = 'hidden';
        }

        var showPaginatecontrols = function(){
            document.querySelector('.paginate_controls').style.visibility = 'unset';
        }

        // (numberOfPage): número de páginas, (currentPage): página actual, la página seleccionada ..
        var pageButtons = function(numberOfPage,currentPage) {
            /** Estas variables deshabilitarán el botón "Prev" en la
             * primera página y el botón "siguiente" en la ultima
             **/
            let	prevDisabled = (currentPage == 1)?"disabled":"";
            let nextDisabled = (currentPage == numberOfPage)?"disabled":"";

            /** Este (botones) creara todos los botones necesarios
             * creará cada botón y establece el atributo onclick
             * a la función "order" con un número especial (currentPage)
             *
             * Tambien se encarga de agregar el boton de "gotopage" y "pagecounter"
             **/
            let buttons = "<input type='button' value='이전' class='paginate_control_prev' onclick='paginate.sort("+(currentPage - 1)+")' "+prevDisabled+">";
            let buttonNumberOfPage = "<input type='button' value='" + currentPage + ' - ' + numberOfPage + "' disabled>";

            for (let $i=1; $i<=numberOfPage;$i++){
                if(numberOfPage > 10){
                    buttons += paginationMoreThatTenPage($i,numberOfPage);
                }else{
                    buttons += "<input type='button' id='id"+$i+"'value='"+$i+"' onclick='paginate.sort("+$i+")'>";
                }
            }

            let nextButton = "<input type='button' value='다음' class='paginate_control_next' onclick='paginate.sort("+(currentPage + 1)+")' "+nextDisabled+">";
            buttons +=  nextButton;

            if(settings.pageCounter)
                buttons += buttonNumberOfPage;

            if(settings.goBar)
                buttons += addGoToPage();

            return buttons;
        }
        /**
         * Cuando el numero de paginas supera las 10 se crea un mecanismo que oculta
         * todas las paginas con numero superior a 4 y inferior a las ultima pagina
         *
         * Cuando se navega por la paginación solo se mostrara el numero actual
         * Inicial
         *      <- prev  (1)    2   3   4   ... 41 next ->
         * Después
         *      <- prev  1    2   3   4  (22)   ... 41 next ->
         **/
        var paginationMoreThatTenPage = function(iterator,numberOfPage){

            let referenceForTheLast = numberOfPage - 1;
            let middleValue = '...';

            if(iterator > referenceForTheLast || iterator < 5){
                return "<input type='button' id='id"+iterator+"'value='"+iterator+"' onclick='paginate.sort("+iterator+")'>";
            }else if((iterator + 1) == numberOfPage) {
                return middleValue + "<input type='button' id='id"+iterator+"'value='"+iterator+"' style='display: none' onclick='paginate.sort("+iterator+")'>";
            }else {
                return "<input type='button' id='id"+iterator+"'value='"+iterator+"' style='display: none' onclick='paginate.sort("+iterator+")'>";
            }
        }

        var addGoToPage = function(){
            let inputBox = "<input type='number' id='paginate_page_to_go' value='1' min='1' max='"+ settings.numberOfPages +"'>";
            let goButton = "<input type='button' id='paginate-go-button' value='이동' onclick='paginate.goToPage()'>  ";
            return inputBox + goButton;
        }

        /**
         * Public Methods
         **/

        _lignePaginate.goToPage = function(){
            let page = document.getElementById("paginate_page_to_go").value;
            _lignePaginate.sort(page);
        }

        var launchPaginate = function(){
            paginateAlreadyExists();
            table = settings.table;
            numberPerPage = settings.numberPerPage;
            let rowCount = table.rows.length;
            // obtener el nombre de la etiqueta de la primera celda (en la primera fila)
            let firstRow = table.rows[0].firstElementChild.tagName;
            // Verificando si la tabla tiene encaebzado
            let hasHead = (firstRow === "TH");
            // contadores de bucles, para comenzar a contar desde las filas [1] (2da fila) si la primera fila tiene una etiqueta de encabezado
            let $i,$ii,$j = (hasHead)?1:0;
            // contiene la primera fila si tiene un (<th>) y nada si (<td>)
            th = (hasHead?table.rows[(0)].outerHTML:"");
            pageCount = Math.ceil(rowCount / numberPerPage);
            settings.numberOfPages = pageCount;

            if (pageCount > 1) {
                settings.hasPagination = true;
                for ($i = $j,$ii = 0; $i < rowCount; $i++, $ii++)
                    tr[$ii] = table.rows[$i].outerHTML;
                // Contenedor de los botones "paginate_controls"
                table.insertAdjacentHTML("afterend","<div id='buttons' class='paginate paginate_controls'></div");
                // Inicializando la tabla en la pagina 1
                _lignePaginate.sort(1);
            }else{
                settings.hasPagination = false;
            }
        };

        _lignePaginate.sort = function(selectedPageNumber) {
            /** crea (filas) una variable para contener el grupo de filas
             * para ser mostrado en la página seleccionada,
             * startPoint: la primera fila en cada página, Do The Math
             **/
            let rows = th,startPoint = ((settings.numberPerPage * selectedPageNumber)-settings.numberPerPage);
            for (let $i = startPoint; $i < (startPoint+settings.numberPerPage) && $i < tr.length; $i++)
                rows += tr[$i];

            table.innerHTML = rows;
            document.getElementById("buttons").innerHTML = pageButtons(pageCount,selectedPageNumber);
            document.getElementById("id"+selectedPageNumber).classList.add('active');
            /**
             * Esto se utiliza para mostrar el numero de la pagina en la que se encuentra
             * generalmente se usa cuando las paginas son mayor a 10
             **/
            document.getElementById("id"+selectedPageNumber).style.display = 'unset';
        }

        /**
         * Esto se encarga de filtrar la informacion segun una caja de texto
         * tambien llama al metodo que oculta la parte de los botones de la
         * paginacion
         **/
        _lignePaginate.filter = function() {
            if(settings.hasPagination){
                setNumberPerPage(9999);
                _lignePaginate.sort(1);
                hiddenPaginateControls();
            }
            const filter = document.querySelector(filterSettings.el).value.toUpperCase();
            const trs = document.querySelectorAll( settings.el + ' tr:not(.header)');
            trs.forEach(tr => tr.style.display = [...tr.children].find(td => td.innerHTML.toUpperCase().includes(filter)) ? '' : 'none');

            if(filter.length == 0 && settings.hasPagination){
                setNumberPerPage(_lignePaginate.getConstNumberPerPage());
                _lignePaginate.sort(1);
                showPaginatecontrols();
            }

        }

        return _lignePaginate;
    }

    if(typeof(window.paginate) === 'undefined'){
        window.paginate = lignePaginate();
    }
})(window);
