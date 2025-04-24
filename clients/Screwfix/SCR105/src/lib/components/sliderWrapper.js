import product from './product';

const sliderWrapper = (id, data) => {
  const html = `
    <div class="${id}__sliderWrapper">
        <div class="${id}__sliderContainer">
            <h1 class="${id}__mainTitle">BUY AGAIn</h1>
            <div class="swiper ${id}__sliderBox">
                <div class="swiper-wrapper ${id}__slider">
                   
                </div>
            </div>
        </div>
    </div>
  `;
  return html.trim();
};

export default sliderWrapper;
