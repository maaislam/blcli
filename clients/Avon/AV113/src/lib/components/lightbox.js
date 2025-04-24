import { formatPrice } from '../helpers/formatPrice';
import renderProductCard from './product';

const crossIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
  <path d="M12.4839 0.771141C12.1402 0.451787 11.583 0.451801 11.2394 0.771141L6.72801 4.9633L2.21667 0.771159C1.87301 0.451819 1.31583 0.451804 0.97216 0.771159C0.628489 1.09051 0.628505 1.60827 0.97216 1.92761L5.4835 6.11975L0.972179 10.3119C0.628523 10.6312 0.628508 11.149 0.972179 11.4683C1.31585 11.7877 1.87303 11.7877 2.21669 11.4683L6.72801 7.27621L11.2393 11.4683C11.583 11.7877 12.1402 11.7877 12.4839 11.4683C12.8275 11.149 12.8275 10.6312 12.4839 10.3119L7.97252 6.11975L12.4839 1.92759C12.8275 1.60825 12.8275 1.0905 12.4839 0.771141Z" fill="black"/>
  </svg>`;
const renderLightbox = (id, productsData) => {
  const getTotal = (prev = false) =>
    formatPrice(
      productsData.reduce(
        (previousValue, currentValue) => previousValue + currentValue[prev ? 'compare_at_price' : 'price'] / 100,
        0
      )
    );
  const prevTotal = getTotal('prev');
  const currTotal = getTotal();

  const htmlStr = `
    
    <div class="${id}__lightbox--wrapper">
        <div class="${id}__lightbox ${id}__width--${productsData.length}">
            <div class="${id}__lightbox--headline-block"><span>Liked your Samples?</span><span>Buy the full products!</span><span class="${id}__close-btn">${crossIcon}</span></div>
            <div class="${id}__lightbox--product-cards">
                ${productsData.map((item) => renderProductCard(id, item, productsData.length)).join('\n')}
            </div>
            <div class="${id}__lightbox--buyall-block ${productsData.length < 2 ? `${id}__hide` : ''}">
                <div class="total-price">
                    <span>Or add all products for </span>
                    <span class="prev-total ${prevTotal == '£0.00' ? `${id}__hide` : ''}">${prevTotal}</span> 
                    <span class="curr-total">${currTotal}</span>
                </div>
                <div class="${id}__total-add-to-bag ${id}__btn">Add ${productsData.length} products to basket</div>
            </div>
        </div>
    </div>
    
  `;
  return htmlStr;
};

export default renderLightbox;
