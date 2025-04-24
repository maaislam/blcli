import renderCartLine from './cartLine';
import renderPromotionMsg from './promotionMessage';
import updateQuantity from '../helpers/quantity';

import placaVariantImages from '../helpers/variantImages';
import renderTotal from './totals';
import renderOrderOptions from './orderoptions';
import triggerVariantTrackings from '../helpers/triggerVariantTracking';
import saveOrder from './saveOrder';

const renderbasket = (id, data, brocureSettings, fireEvent) => {
  // console.log(data);
  const couponSection = document.querySelector('.coupon_section');

  document.querySelectorAll(`.${id}__basket--lines`).forEach((item) => {
    const lastBasket = item?.closest(`.${id}__basket`);
    couponSection && lastBasket.insertAdjacentElement('afterend', couponSection);
    lastBasket.remove();
  });

  const userIsAttched = !!PDP_MANAGER['API_DATA']['rep_id'];
  fireEvent('Conditions Met');
  const basketHtml = `
    
    <div class="${id}__basket">

    <div class="${id}__mobile--backbtn"><i class="vue-pdp-icon-chevron-prev"></i>
    Continue shopping</div>

        <div class="${id}__basket--title">\${Basket--Title}</div>

        <div class="${id}__basket--count">
            \${Item Count Text} <span class="itemcount">${data['items_count']}</span>
        </div>
        ${saveOrder(id, brocureSettings['shop_with_my_rep'].name)}
        ${renderPromotionMsg(id, data.promotions)}
        <div class="${id}__basket--lines">
            
            ${renderCartLine(id, data.products)}
        </div>
        <div class="${id}__checkout-total">
            ${renderTotal(id, data)}
            ${renderOrderOptions(id, brocureSettings['shop_with_my_rep'].name, data)}
        </div>
    </div>
  `;
  if (window.matchMedia('(max-width: 778px)').matches) {
    document.querySelector(`.mobile_scrolling_wrapper`)?.insertAdjacentHTML('afterbegin', basketHtml);
    couponSection && document.querySelector('.AG084c__totals').insertAdjacentElement('afterend', couponSection);
  } else {
    document.querySelector(`.header_container`).insertAdjacentHTML('afterend', basketHtml);
    couponSection && document.querySelector(`.${id}__basket`).insertAdjacentElement('beforeend', couponSection);
  }

  placaVariantImages(id);

  //add events
  document.querySelector(`.${id}__basket`).addEventListener('click', (e) => {
    const target = e.target;
    triggerVariantTrackings(id, target, updateQuantity, fireEvent);
  });

  const setPosition = () => {
    const promoContainer = document.querySelector(`.AG084c__promo`);
    if (promoContainer && window.matchMedia('(min-width: 769px)').matches) {
      return promoContainer.offsetHeight + 20;
    } else {
      return 0;
    }
  };
  const totalSec = document.querySelector(`.AG084c__checkout-total`);
  if (totalSec) {
    totalSec.style.transform = `translateY(-${setPosition()}px)`;
  }
};

export default renderbasket;
