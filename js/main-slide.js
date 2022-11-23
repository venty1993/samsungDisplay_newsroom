const contentsWrapper = document.getElementsByClassName('contents-wrapper');
const content = document.getElementsByClassName('content')
const slideCount = contentsWrapper[0].childElementCount;

// 슬라이드 갯수만큼 width 정해주기 초기화
for(let i = 0 ; i < content.length ; i ++) {
    content[i].style.width = `${100/slideCount}%`
}

for(let i = 0 ; i < contentsWrapper.length; i ++){
    contentsWrapper[i].style.width = `${slideCount*100}%`
}





let index = 0 ;

function slideRight() {
    index++;
    
    if(index===slideCount){
        index=0;
    }
    
    for(let i = 0 ; i < contentsWrapper.length; i ++){
        contentsWrapper[i].style.transform = `translateX(calc( -100% / ${slideCount} * ${index}))`
    }
}
function slideLeft() {
    index--;

    if(index === -1){
        index = slideCount-1;
    }

    for(let i = 0 ; i < contentsWrapper.length; i ++){
        contentsWrapper[i].style.transform = `translateX(calc( -100% / ${slideCount} * ${index}))`
    }
}
