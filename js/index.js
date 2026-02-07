const swiperContainer=document.querySelector(".mySwiper")
const searchInput=document.querySelector(".page__container__searchBar input")
const searchBtn=document.querySelector(".page__container__searchBar .button")

searchInput.addEventListener("input",(event)=>{
    searchValue=event.target.value
})

searchBtn.addEventListener("click",()=>{
    console.log(searchValue);
    getData(searchValue)
})

searchInput.addEventListener("keydown",(event)=>{
    if(event.keyCode===13){
        getData(searchValue)
    }
})

//===========================================================================

function renderPosts() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    swiperContainer.innerHTML = ""; // 기존 슬라이드 초기화

    if (posts.length === 0) {
        swiperContainer.innerHTML = `<swiper-slide>등록된 게시글이 없습니다.</swiper-slide>`;
        return;
    }
    posts.forEach((item,index) => {
        const photo = item.image; 
        swiperContainer.innerHTML+=`<swiper-slide onclick="goToDetail(${index})">                <div class="album">
                    <img src="${photo}" alt="" class="album__image">
                        <div class="album__infoBox">
                            <div class="album__infoBox__row">
                            <span class="label">제목</span>
                            <span class="value">${item.title}</span>
                        </div>
                        <div class="album__infoBox">
                            <div class="album__infoBox__row">
                                <span class="label">위치</span>
                                <span class="value">${item.place}</span>
                        </div>
                        <div class="album__infoBox__row">
                            <span class="label">업로드</span>
                            <span class="value">${dayjs(item.created_at).format("YYYY-MM-DD")}</span>
                        </div>
                        <div class="album__infoBox__row">
                            <span class="label">내용</span>
                            <span class="value">${item.content}</span>
                        </div>
                    </div>
                </div>
            </swiper-slide>`
    })   
}

function goToDetail(index){
    localStorage.setItem("selectedId", JSON.stringify(index));
    location.href="detail.html";
}

const addBtn=document.querySelector(".page__container__footer__button")
addBtn.addEventListener("click",()=>{
    location.href="create.html"
})

searchBtn.addEventListener("click", () => {
    renderPosts(); 
});

// 실행
renderPosts()

