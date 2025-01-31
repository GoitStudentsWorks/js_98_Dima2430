import { funds } from './support-export/support-funds';
import { markupCardFund } from './support-export/markup-support';
import Swiper from 'swiper';

const supportList = document.querySelector('.support-list');
const supportBtn = document.querySelector('.support-button');

let position = 0;
let isLastSlide = false;

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const markupSetFunds = funds
  .map((el, i) => {
    position = addLeadingZero(i + 1);
    return markupCardFund(el, position);
  })
  .join('');

supportList.innerHTML = markupSetFunds;

const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  spaceBetween: 20,
  slidesPerView: 'auto',
  rewind: true,
  speed: 500,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.support-button',
  },
});

const supportBtnClickHandler = () => {
  const lastIndex = swiper.slides.length - 1;
  const screenWidthMobile = window.innerWidth < 768;

  if (screenWidthMobile) {
    swiper.slideNext();
  } else {
    swiper.slideTo(isLastSlide ? 0 : lastIndex);
    isLastSlide = !isLastSlide;
  }
};

supportBtn.addEventListener('click', supportBtnClickHandler);


document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.querySelector('.sidebar');

    window.addEventListener('scroll', function () {
      if (window.scrollY > 100) { 
        sidebar.classList.add('scrolled');
      } else {
        sidebar.classList.remove('scrolled');
      }
    });
  });