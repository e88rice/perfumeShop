const searchIcon = document.getElementById("search_icon");
const wordInput = document.getElementById("word_input");
const searchForm = document.getElementById("search-form")

searchIcon.onclick = () => { // 검색 아이콘 누르면
    const word = wordInput.value; // input 밸류값 가져오고
    const form = document.forms.namedItem("search-form"); // 폼 가져오고
    form.action = '/product/search/'+word; // 액션 장전
    form.method = 'get'; // 메소드 장전
    form.submit(); // 보냄
}

window.onkeydown = (e) => {
    if(e.key === 'Enter'){
        const word = wordInput.value; // input 밸류값 가져오고
        const form = document.forms.namedItem("search-form"); // 폼 가져오고
        form.action = '/product/search/'+word; // 액션 장전
        form.method = 'get'; // 메소드 장전
        form.submit(); // 보냄
    }
}
