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

// 이미지 압축
const compressImgAndUploadFile=(fild)=>{
    return new Promise((resolve,reject)=>{
        const reader=new FileReader();
        reader.readAsDataURL(file)
        reader.onload=()=>{
            // dateUrl을 이용해서 image 객체 생성
            const img=new Image()
            img.src=reader.result
            image.onload=()=>{
                    // canva를 이용해서 이미지 압축
                    const canvas=documents.createElement("canvas")
                    
                    // 이미지의 최대 크기 제한
                    const MAX_HEIGHT=1024;
                    const MAX_WIDTH=1024;

                    // 비율 계산
                    let ratio=Math.min(MAX_WIDTH/image.width,MAX_HEIGHT/image.height,1);

                    const newWidth=image.width*ratio
                    const newHeight=image.height*ratio

                    canvas.width=newWidth
                    canvas.height=newHeight

                    const canvasContext=canvas.getContext("2d")
                    if(!canvasContext){
                        throw new Error("Cannot get canvas context")
                    }

                    canvasContext.drawImage(image,0,0,newWidth,newHeight)

                    const compressedDataUrl=canvas.toDataUrl("image/webp",0.7)
                    resolve(compressedDataUrl);
            }
            img.onerror=reject
        }
        reader.onerror=reject
    })
}


buttonTag.addEventListener(`click`, () => {
    if (title === "" || place === "" || content === "" || selectedImg === "") {
        return window.alert("모든 빈칸을 채워주세요!");
    }

    try{
        // 압축 실행
        const compressedImg=await compressImage(selectedImgFile);

        const addedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const post = { title, image: compressedImg, place, content, created_at: new Date().toISOString() };

        const posts = [...addedPosts, post];    
        localStorage.setItem("posts", JSON.stringify(posts));
        window.alert("등록 완료!");
        location.href = "index.html";
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
            location.href="index.html"
        })
    }
}