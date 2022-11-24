makeSlide();

// 함수로 묶어 브라우저 콘솔에서 접근할수 없도록 캡슐화!
function makeSlide(){
    const contentsWrapper = document.getElementsByClassName('contents-wrapper');
    const content = document.getElementsByClassName('content')
    const slideCount = contentsWrapper[0].childElementCount;
    const buttonWrapper = document.querySelector('.button-wrapper');
    const progressButton = document.getElementsByClassName('progress-button');
    const progressBar = document.getElementsByClassName('progress-span');
    const stopButton = document.querySelector('.slide-play-state');

    // 슬라이드 갯수만큼 width 정해주기 초기화
    
    let index = 0 ;
    let barInterval;
    let barWidth = 0;
    // 슬라이드를 전반적으로 초기화해주는 함수
    initSlide();
    // 바 초기화
    resetBar();
    // 바 애니메이션 시작
    startBar();

    function initSlide() {
        buttonWrapper.children[0].addEventListener('click', slideLeft);
        buttonWrapper.children[1].addEventListener('click', slideRight);
        for(let i = 0 ; i < contentsWrapper.length; i ++){
            // 슬라이드 갯수만큼 컨테이너의 크기를 키워준다
            contentsWrapper[i].style.width = `${slideCount*100}%`
        }

        for(let i = 0; i < contentsWrapper[0].childElementCount; i ++){
            // 버튼 만드는 내용 길어서 함수로 분리했음
            makeProgressButton();
        }

        for(let i = 0 ; i < content.length ; i ++) {
            // 슬라이드 크기 설정
            content[i].style.width = `${100/slideCount}%`
        }
    
        // 일시정지 버튼에 클래스가 토글되는 클릭 이벤트 부여
        stopButton.addEventListener('click', ()=>{
            stopButton.classList.toggle('stop');
    
            if(stopButton.classList.contains('stop')){
                stopBar();
            }else {
                startBar();
            }
        })

        // 하단 버튼에 클릭이벤트 추가
        for(let i = 0 ; i < progressButton.length ; i ++) {
            progressButton[i].addEventListener('click', ()=>{
                index = i ;
                applySlide();
            })
        }

        function makeProgressButton() {
            const makeProgressButton = document.createElement('div');
            makeProgressButton.classList.add('progress-button')
            const makeProgressBar = document.createElement('span');
            makeProgressBar.classList.add('progress-span');
            makeProgressButton.appendChild(makeProgressBar);
            document.querySelector('.buttons').appendChild(makeProgressButton);
        }
    }

    function slideRight() {
        index++;
        if(index===slideCount){
            index=0;
        }
        applySlide();
    }
    
    function slideLeft() {
        index--;
        if(index === -1){
            index = slideCount-1;
        }
        applySlide();
    }

    function applySlide(){
        resetBar();
        for(let i = 0 ; i < contentsWrapper.length; i ++){
            contentsWrapper[i].style.transform = `translateX(calc( -100% / ${slideCount} * ${index}))`
        }
    }

    function resetBar(){
        for(let i = 0 ; i<progressBar.length ; i ++) {
            barWidth = 0 ;
            progressButton[i].classList.remove('active');
            progressBar[i].style.width = `0%`;
        }
        progressButton[index].classList.add('active');
    }

    function startBar() {
        barInterval = setInterval(() => {
            growBar();
        }, 100);
    }

    function stopBar() {
        clearTimeout(barInterval);
    }

    function growBar() {
        
        barWidth += 2;
        
        progressBar[index].style.width = `${barWidth}%`;
        
        if(barWidth===100) {
            slideRight()
        }
    }
}



