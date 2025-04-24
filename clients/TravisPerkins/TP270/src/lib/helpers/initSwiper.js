import Swiper, { Navigation } from 'swiper';
// import 'swiper/css';
// import 'swiper/css/navigation';

import { isMobile } from './utils';

const initSwiper = (container, fireEvent) => {
  const slider = new Swiper(`${container}`, {
    modules: [Navigation],
    slidesPerView: `${isMobile() ? 1.8 : 2.5}`,
    spaceBetween: 10,
    //Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  slider.on('slideChange', () => {
    fireEvent('User interact with arrows at PDP');
  });
};

export default initSwiper;
