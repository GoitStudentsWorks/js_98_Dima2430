const scrollBtn = document.querySelector('.scroll-btn');
/*припускається що elem - це селектор до якого буде йти скрол. Особиста думка - краще до заголовку Best Sellers*/
const elemTop = elem.offsetTop;

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: elemTop, behavior: 'smooth' });
})

/*При "доскролюванні" вверх до елменетну кнопка ховається, при скролі нижче елементу - з'являється*/
window.addEventListener('scroll', () => {
    let scrolled = window.scrollY || window.pageYOffset;
    if (scrolled > elemTop) {
        scrollBtn.classList.add('show-scroll-btn')
    } else {
        scrollBtn.classList.remove('show-scroll-btn')
    }
})