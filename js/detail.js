const bodyE1 = document.querySelector(".container__body");
const posts = JSON.parse(localStorage.getItem("posts")) || [];
const selectedindex = localStorage.getItem("selectedId"); // JSON.parse 생략 가능 (숫자/문자열)

if (selectedindex === null || posts.length === 0 || !posts[selectedindex]) {
    window.alert("데이터를 불러올 수 없습니다.");
    location.href = "project.html";
    throw new Error("No data found"); 
}

const targetPost = posts[selectedindex];

let updatedImg = targetPost.image;

if (!updatedImg || updatedImg === "undefined" || updatedImg === "null") {
    updatedImg = "./assets/default-image.svg"; 
}

bodyE1.innerHTML=`<div class="container__body__info">아래 입력란을 수정해주세요.</div>
    <div class="container__body__imgBox" style="text-align:center; margin-bottom:20px;">
        <img id="detail-preview" src="${updatedImg}" style="width:100%; max-height:300px; object-fit:cover; border-radius:10px;">
        <input type="file" class="update-file-update" accept="image/*" style="margin-top:10px;">
    </div>
    <div class="container__body__inputBox">
        <span class="label">제목</span>
        <input type="text" class="update-title" value="${targetPost.title}" placeholder="제목을 입력해주세요.">
    </div>
    <div class="container__body__inputBox">
        <span class="label">위치</span>
        <input type="text" class="update-place" value="${targetPost.place}" placeholder="위치를 입력해주세요.">
    </div>    
    <div class="container__body__inputBox">
        <span class="label">내용</span>
        <input type="text" class="update-content" value="${targetPost.content}" placeholder="내용을 입력해주세요.">
    </div>`

const titleTag=document.querySelector(".update-title")
const placeTag=document.querySelector(".update-place")
const contentTag=document.querySelector(".update-content")
const fileInput=document.querySelector(".update-file-update")
const previewImg=document.querySelector("#detail-preview")

fileInput.addEventListener("change",(event)=>{
    const file=event.target.files[0]
    if(file){
        const reader=new FileReader()
        reader.onload=(e)=>{
            updatedImg=e.target.result
            previewImg.src=updatedImg
        }
        reader.readAsDataURL(file)
    }
})

//----------------------------------------------------------------------------------------

// 수정
const updateBtn=document.querySelector(".container__footer__button__update")
const deleteBtn=document.querySelector(".container__footer__button__delete")

updateBtn.addEventListener("click",()=>{
    posts[selectedindex].title=titleTag.value
    posts[selectedindex].place=placeTag.value
    posts[selectedindex].content=contentTag.value
    posts[selectedindex].image=updatedImg

    localStorage.setItem("posts",JSON.stringify(posts))
    window.alert("수정이 완료되었습니다.")
    location.href="project.html"
})

deleteBtn.addEventListener("click",()=>{
    if(!confirm("정말 이 게시글을 삭제하시겠습니까??")){
        return;
    }
    posts.splice(selectedindex,1)
    localStorage.setItem("posts",JSON.stringify(posts))
    window.alert("삭제가 완료되었습니다.")
    location.href="project.html" 
})

// 뒤로가기
const backBtn=document.querySelector(".container__header__button")
if(backBtn){
    backBtn.addEventListener("click",()=>{
        location.href="./project.html"
    })
}