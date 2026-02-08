const fileTag=document.querySelector(".input-file")
const previewTag=document.querySelector("#preview")

const backBtn = document.querySelector('.container__header__button');

if (backBtn) {
    backBtn.addEventListener('click', () => {
        window.history.back(); 
            });
}

let selectedImgFile=null;
let selectedImg=""

fileTag.addEventListener("change",(event)=>{
    const file=event.target.files[0] // 선택한 파일 가져오기

    if(file){
        // 파일 전체를 전역변수로 저장
        selectedImgFile=file;

        const reader=new FileReader()
        reader.onload=(e)=>{
            selectedImg=e.target.result // 결과물 저장
            previewTag.src=selectedImg //미리보기 이미지 변경
            previewTag.style.display="block"
        }
        reader.readAsDataURL(file)
    }
    else{
        selectedImgFile=null;
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
// 이미지 압축
const compressImage = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const MAX_WIDTH = 600;
                const MAX_HEIGHT = 600;

                let ratio = Math.min(MAX_WIDTH / img.width, MAX_HEIGHT / img.height, 1);
                const newWidth = img.width * ratio;
                const newHeight = img.height * ratio;

                canvas.width = newWidth;
                canvas.height = newHeight;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                // localStorage 저장을 위해 DataURL(Base64)로 반환
                // 용량을 극단적으로 줄이려면 'image/jpeg'에 0.5~0.7 권장
                const compressedDataUrl = canvas.toDataURL("image/webp", 0.4);
                resolve(compressedDataUrl);
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
};

buttonTag.addEventListener(`click`, async () => {
    if (title === "" || place === "" || content === "" || !selectedImgFile) { // selectedImgFile은 Input에서 받은 File 객체
        return window.alert("모든 빈칸을 채워주세요!");
    }

    try {
        // 압축 실행
        const compressedImg = await compressImage(selectedImgFile);

        const addedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const post = { 
            title, 
            image: compressedImg,
            place, 
            content, 
            created_at: new Date().toISOString() 
        };

        const posts = [...addedPosts, post];    
        localStorage.setItem("posts", JSON.stringify(posts));
        
        window.alert("등록 완료!");
        location.href = "index.html";
    } catch (error) {
        if(error.name==="QuotaExceededError"){
            alert("저장공간이 가~득 찼습니다.")
        }else{
            alert("이미지 처리 중 오류 발생")
        }
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