import product from './product';

const sliderWrapper = (id, data) => {
  const html = `
    <div class="${id}__sliderWrapper">
        <div class="${id}__sliderContainer">
          <div class="${id}__sliderContent">
            <h2 class="${id}__mainTitle">Popular Products</h2>
            <div class="swiper ${id}__sliderBox">
                <div class="swiper-wrapper ${id}__slider">
                    ${data.map((item) => product(id, item)).join('\n')}
                </div>
                <button class="swiper-button-next ${id}__next"></button>
                <button class="swiper-button-prev ${id}__prev"></button>
            </div>
          </div>
        </div>
    </div>
  `;
  return html.trim();
};

export default sliderWrapper;
