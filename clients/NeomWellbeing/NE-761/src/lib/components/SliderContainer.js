import upsellData from '../assets/data.js';
import slide from './swiperSlide.js';

const sliderContainer = (id, listToRender) => {
  console.log('🚀 ~ sliderContainer ~ listToRender:', listToRender);
  const products = upsellData.filter((item) => item.attribute.includes(listToRender));
  console.log('🚀 ~ sliderContainer ~ products:', products);

  const htmlStr = `
  <div class="${id}_upsell-container">
    <div class="${id}_upsell-heading">Compatible with your Pod</div>
    <div class="swiper ${id}_swiper-container">
    <div class="swiper-wrapper">
      ${products
        .map((item) => {
          return slide(id, item);
        })
        .join('')}
    </div>

   
    <div class="swiper-scrollbar ${id}_swiper-scrollbar"></div>
  </div>
  </div>`;

  return htmlStr;
};

export default sliderContainer;
