import product from './product';

const sliderWrapper = (id, data, VARIATION) => {
  const html = `
    <div class="${id}__sliderWrapper">
        <div class="${id}__sliderContainer">
          <div>
            <h1 class="${id}__mainTitle">
                ${VARIATION === '1' ? 'Buy Again' : 'Previous Purchases'}
                ${VARIATION === '2' ? '<a href="/jsp/account/allPurchasesPage.jsp">View all</a>' : ''}
            </h1>
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
