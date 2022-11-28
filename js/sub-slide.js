makeSubSlide('top-slide', 3,3,1);
makeSubSlide('bottom-slide', 5,4,2);


function makeSubSlide(slideId,pcSlideCount,tabletSlideCount,mobileSlideCount){
    // 대상이 될 슬라이드 ID
    const slide = document.getElementById(slideId);
    // 슬라이드의 자식요소인 ul태그
    const slideWrapper = slide.children[0];
    let index = 0;
    
    let count;
    let containerWidth;
    let slideWidht;

    for(let i = 0 ; i < slideWrapper.childElementCount ; i ++ ){
        slideWrapper.children[i].addEventListener('click', next);
    }
    
    checkWidth();

    window.addEventListener('resize' , ()=>{
        checkWidth();
    })

    function checkWidth() {
        if(window.innerWidth > 1400){
            count = pcSlideCount ;
        }else if(window.innerWidth > 800) {
            count = tabletSlideCount;
        }else { 
            count = mobileSlideCount;
        }
        containerWidth = slide.clientWidth;
        slideWidht = (containerWidth - (16 * (count - 1))) / count;
        for(let i = 0 ; i < slideWrapper.childElementCount ; i ++ ){
            slideWrapper.children[i].style.width = `${slideWidht}px`;
        }
    }
    
    function next(){
        if(index < slideWrapper.childElementCount-count){
            index ++;
        }
        slideWrapper.style.transform = `translateX(-${index * (slideWidht + 16)}px)`
    }
}