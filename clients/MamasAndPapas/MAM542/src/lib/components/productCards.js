import { checkoutMethod } from '../asset';
import productCard from './productCard';

const productCards = (id, data, headline) => {
  const itemsInCart = document.querySelector('[data-cart-count]').innerText;
  const htmlStr = `<div class="${id}__modal--content">
        <div class="${id}__options-container ${id}__hide"></div>
        <div class="${id}__modal-contentwrapper">
            <div class="headline ${id}__headline">${headline}</div>
            <div class="${id}__productCards swiper">
                <div class="swiper-wrapper" ${data.length < 3 ? `style="justify-content:center;"` : ''}>
                    ${data?.map((item) => productCard(id, item)).join('\n')}
                </div>
                
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            ${
              Number(itemsInCart) <= 0
                ? ''
                : `<div class="${id}__checkout">
                    <a href="/cart" class="${id}__checkoutBtn">Checkout</a>
                    ${checkoutMethod}
                </div>`
            }
        </div> 
    </div>`;
  return htmlStr;
};
export default productCards;
