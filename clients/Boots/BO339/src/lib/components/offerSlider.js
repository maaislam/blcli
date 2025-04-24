import offerItem from './offerItem';

const offerSlider = (id, offers) => {
  const html = `
        <div class="${id}__swiper swiper">
            <div class="swiper-wrapper">
                ${offers.map((item) => offerItem(id, item)).join('\n')}
            </div>
            <div class="swiper-button-next ${id}-carousel--arrow--next"></div>
            <div class="swiper-button-prev ${id}-carousel--arrow--prev"></div>
             <div class="swiper-pagination ${id}__swiper-pagination"></div>
        </div>
  
  `;
  return html.trim();
};

export default offerSlider;
