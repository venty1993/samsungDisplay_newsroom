const headerNav = document.querySelector('.header-nav');
const header = document.querySelector('header');

headerNav.addEventListener('mouseenter', () =>{
    header.classList.add('active');
})

header.addEventListener('mouseleave', () => {
    header.classList.remove('active');
})