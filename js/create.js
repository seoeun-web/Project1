const fileTag=document.querySelector(".input-file")
const previewTag=document.querySelector("#preview")

const backBtn = document.querySelector('.container__header__button');

if (backBtn) {
    backBtn.addEventListener('click', () => {
        window.history.back(); 
            });
}

let selectedImg=""

fileTag.addEventListener("change",(event)=>{
    const file=event.target.files[0] || "image/default.jpg" // 선택한 파일 가져오기

    if(file){
        const reader=new FileReader()

        reader.onload=(e)=>{
            selectedImg=e.target.result // 결과물 저장
            previewTag.src=selectedImg //미리보기 이미지 변경
            previewTag.style.display="block"
        }
        reader.readAsDataURL(file)
    }
    else{
        selectedImg=""
        previewTag.style.display="none"
        return;
    }
})

//-----------------------------------------------------------------------------------------

const titleTag=document.querySelector(".input-title")
const placeTag=document.querySelector(".input-place")
const contentTag=document.querySelector(".input-content")
const buttonTag=document.querySelector(".container__footer__button")

//-----------------------------------------------------------------------------------------

let title=''
let place=''
let content=''

titleTag.addEventListener(`input`,(event)=>{
    title=event.target.value
})
placeTag.addEventListener(`input`,(event)=>{
    place=event.target.value
})
contentTag.addEventListener(`input`,(event)=>{
    content=event.target.value
})

console.log("파일태그:", fileTag);
console.log("제목태그:", titleTag);
console.log("장소태그:", placeTag);
console.log("내용태그:", contentTag);
console.log("버튼태그:", buttonTag);

//-----------------------------------------------------------------------------------------

let posts=[]

buttonTag.addEventListener(`click`, () => {
    if (title === "" || place === "" || content === "" || selectedImg === "") {
        return window.alert("모든 빈칸을 채워주세요!");
    }

    try{
        const addedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const post = { title, image: selectedImg, place, content, created_at: new Date().toISOString() };

        const posts = [...addedPosts, post];    
        localStorage.setItem("posts", JSON.stringify(posts));
        window.alert("등록 완료!");
        location.href = "project.html";
    }catch(error){
        console.error("저장실패:",error)
        alert("이미지 용량이 너무 커서 저장할 수 없습니다.")
    }
});

// 뒤로가기
{
    const backBtn=document.querySelector(".container__header__button")
    if(backBtn){
        backBtn.addEventListener("click",()=>{
            location.href="./project.html"
        })
    }
}