import { tradeProductList } from '../data/tradeProductList';
import { product } from './product';

export const tradeContainer = (ID) => {
  const html = `
    <div class="${ID}__tradeContainer">
        <h1 class="${ID}__tradeTitle">MAKE THE MOST OUT OF DISCOUNTED PRICES</h1>
        <p class="${ID}__tradeSubTitle"> <a href="/login">LOGIN</a> OR <a href="/login">SIGN UP</a> FOR AN ACCOUNT TO TAKE ADVANTAGE OF DISCOUNTED TRADE PRICES</p>
        <div class="${ID}__tradeProdsList swiper">
            <div class="list-wrapper swiper-wrapper">
              ${tradeProductList.map((list) => product(ID, list)).join('\n')}
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
  `;
  return html.trim();
};
