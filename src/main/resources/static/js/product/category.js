const category_btns = [...document.getElementsByClassName("category_btn")];
const product_price = [...document.getElementsByClassName("product_price")];
const ml_btns = [...document.getElementsByClassName("ml")];
const price_btns = [...document.getElementsByClassName("price")];
const request = new XMLHttpRequest(); // 여기서 컨트롤러에 접근 가능
const saveGender = document.getElementById("save_gender");

let checkML = 0; // 카테고리에 설정될 ML 변수
let checkPrice = 'null'; // 카테고리에 설정될 가격순 변수

const perfumeGender = saveGender.value; // 보고있는 페이지의 성별 저장

// 가격표 설정, 카테고리 기능
window.onload = () => {
    // 가격표에 구분점을 달아주는 작업
    product_price.forEach(function (element){
        const priceText = parseInt(element.textContent).toLocaleString()+"원";
        element.textContent = priceText;
    })

    const filterInputGroup = document.querySelector(".input-group");
    filterInputGroup.style.display = "block";

    let options = { // 옵션
        numberPerPage:8, // 페이지당 데이터 양
        goBar:true, // 페이지를 입력해서 이동할 수 있는 바
        pageCounter:true, // 페이지를 카운트해주는 친구

    };
    let filterOptions = { // 필터 옵션
        el:'#searchBox' // 그 페이징안에서 필터해서 찾아주는 태그
    };
    paginate.init('.products_container', options, filterOptions); // 태그안의 데이터와 옵션을 기준으로 페이징
    category_btns.forEach(function (element){

        element.onclick = () => {

            const btnClassName = element.className.split(' ')[1]; // 선택한 버튼의 클래스 구분 이름 (ml, price)
            const btnValue = element.value; // 선택한 버튼의 밸류값을 저장해두고


            // 그리고는 선택한 버튼의 모든 클래스들의 check를 없앤다
            if(btnClassName === 'ml'){ // 만약 선택한 버튼의 클래스가 ml 라면
                ml_btns.forEach(function (ml){ // 일단 모든 ml 클래스의 id를 없앤다
                    ml.id = '';
                })
            }
            else if(btnClassName === 'price'){ // 선택한 버튼의 클래스가 price 라면
                price_btns.forEach(function (price){ // 모든 price 클래스의 id를 없앤다
                    price.id = '';
                })
            }
            // 저장해뒀던 선택한 버튼의 밸류와 클래스이름을 이용해 태그의 아이디로 저장한다
            element.id = "check"+"_"+btnClassName;

            // console.log(save_Category.className);
            // 이런 id를 가진 태그가 존재한다면 그 태그의 밸류를
            if(document.getElementById("check_ml")){
                checkML = document.getElementById("check_ml").value; // 담는 그릇에다 넣어준다
            }
            if (document.getElementById("check_price")){
                checkPrice = document.getElementById("check_price").value;
            }

            console.log(checkML) // 현재 설정값 확인
            console.log(checkPrice)

            request.open('GET', 'http://localhost:8080/product/category/'+perfumeGender+'/'+checkML+'/'+checkPrice);
            request.send();
            request.onload = () => {
                document.querySelector("tbody").innerHTML = '';
                const perfumeObj = JSON.parse(request.response);
                perfumeObj.forEach(obj => {
                    create_products(obj); // 다 만들고 나면
                })
                let options = { // 옵션
                    numberPerPage:8, // 페이지당 데이터 양
                    goBar:true, // 페이지를 입력해서 이동할 수 있는 바
                    pageCounter:true, // 페이지를 카운트해주는 친구

                };
                let filterOptions = { // 필터 옵션
                    el:'#searchBox' // 그 페이징안에서 필터해서 찾아주는 태그
                };
                paginate.init('.products_container', options, filterOptions); // 태그안의 데이터와 옵션을 기준으로 페이징
            }



        }
    })
}



// 상품들 제조기
function create_products(object){

    const perfumeCompanyText = "[" + object.perfumeCompany + "] ";
    const perfumePriceText = object.perfumePrice.toLocaleString()+"원";

    const perfumeForm =
        "        <tr class=\"product_tr\" onclick=\"location.href='/product/detail/"+ object.perfumeID +"\'\">\n"+
        "            <div class=\"product_wrap\">\n" +
        "                <td><img class=\"product_thumbnail\" src=\"/image/products/" + object.perfumeImage + "\" alt=\"상품사진\"></td>\n" +
        "                <td class=\"product_title\"> " + perfumeCompanyText + object.perfumeTitle + "</td>\n" +
        "                <td class=\"product_content\">" + object.perfumeContent + "</td>\n" +
        "                <td class=\"product_price\">" + perfumePriceText + " </td>\n" +
        "            </div>\n" +
        "        </tr>";

        // "      <a href=\"/product/detail/" + object.perfumeID + "\">\n" +
        // "        <div class=\"product_wrap\">\n" +
        // "          <img class=\"product_thumbnail\" src=\"/image/products/" + object.perfumeImage + "\" alt=\"상품사진\">\n" +
        // "          <div class=\"product_title\">" + perfumeCompanyText + object.perfumeTitle + "</div>\n" +
        // "          <div class=\"product_content\"> " + object.perfumeContent + "</div>\n" +
        // "          <div class=\"product_price\"> " + perfumePriceText + "</div>\n" +
        // "        </div>\n" +
        // "      </a>";
    document.querySelector("tbody").insertAdjacentHTML("beforeend", perfumeForm);
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