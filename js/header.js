const headerNav = document.querySelector('.header-nav');
const header = document.querySelector('header');

headerNav.addEventListener('mouseenter', () =>{
    header.classList.add('header-active');
})

header.addEventListener('mouseleave', () => {
    header.classList.remove('header-active');
})