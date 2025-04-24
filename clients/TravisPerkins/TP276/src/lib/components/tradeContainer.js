import { product } from './product';

export const tradeContainer = (ID, products) => {
  const html = `
    <div class="${ID}__tradeContainer">
        <h1 class="${ID}__tradeTitle">MAKE THE MOST OUT OF <span>YOUR</span> TRADE PRICE</h1>
        <div class="${ID}__tradeProdsList swiper">
            <div class="list-wrapper swiper-wrapper">
              ${products.map((list) => product(ID, list)).join('\n')}
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
  `;
  return html.trim();
};
