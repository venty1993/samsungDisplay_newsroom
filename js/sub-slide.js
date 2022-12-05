makeSubSlide('top-slide', 3,3,1);
makeSubSlide('bottom-slide', 5,4,2);


setInterval(() => {
    setContentColor();
}, 1000);

function setContentColor(){

    
    const contents = document.getElementsByClassName('content');
    for(const element of contents) {
        const color = new Array;
        for(let i = 0 ; i <3 ; i ++){
            color.push(Math.round(Math.random()*256))
        }
        element.style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`

    }
    
}





function makeSubSlide(slideId,pcSlideCount,tabletSlideCount,mobileSlideCount){
    // 대상이 될 슬라이드 ID
    const slide = document.getElementById(slideId);
    // 슬라이드의 자식요소인 ul태그
    const slideWrapper = slide.children[0];
    
    let index = 0;
    let count;
    let containerWidth;
    let slideWidht;
    let gap = 16
    
    checkWidth();

    window.addEventListener('resize' , ()=>{
        checkWidth();
        적용();
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
            index++;
        }
        적용();
    }
    
    function prev() {
        if(index > 0) {
            index--;
        }
        적용();
    }

    function 적용(){
        slideWrapper.style.transform = `translateX(-${index * (slideWidht + gap)}px)`
    }


    //슬라이드 버튼만들기
    makeButtons()
    function makeButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        for(let i = 0 ; i < 2 ; i ++) {
            const button = document.createElement('a');
            buttonContainer.appendChild(button);
            button.setAttribute('href','#');
        }
        buttonContainer.firstElementChild.addEventListener('click', prev);
        buttonContainer.lastElementChild.addEventListener('click',next);
        slide.appendChild(buttonContainer);
    }
    
    // 드래그 가능하게 만들기
    dragAble()
    function dragAble() {
        let start = 0 ;
        let end = 0 ;
        let now = 0 ;
        let clicked = false;
        slide.addEventListener('mousedown', (e)=>{
            start = e.clientX;
            clicked = true ;
            slideWrapper.style.transition = `0s`;
        })
        
        slide.addEventListener('mouseup', (e)=>{
            end = e.clientX;
            드래그종료()
        })

        slide.addEventListener('mouseleave', ()=>{
            if(clicked){
                드래그종료();
            }
        })

        slide.addEventListener('mousemove', (e)=>{
            
            if(clicked) {
                now = e.clientX;
                const moved = now - start;
                slideWrapper.style.transform = `translateX(-${index * (slideWidht + 16) - moved}px)`;
            }
        })

        function 드래그종료(){
            clicked = false;
            slideWrapper.style.transition = `0.5s`;
            const nowPos = (index * (slideWidht + gap) - (now - start))  / slideWidht;
            index = Math.round(nowPos);
            if(index > slideWrapper.childElementCount-count){
                index=slideWrapper.childElementCount-count;
            }
            if(index < 0 ){
                index = 0;
            }
            적용();
            console.log((Math.abs(nowPos)), index)
        }

    }


}