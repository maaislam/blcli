import renderCartLine from './cartLine';
import renderPromotionMsg from './promotionMessage';
import updateQuantity from '../helpers/quantity';

import placaVariantImages from '../helpers/variantImages';
import renderTotal from './totals';
import renderOrderOptions from './orderoptions';
import triggerVariantTrackings from '../helpers/triggerVariantTracking';
import saveOrder from './saveOrder';

const renderbasket = (id, data, brocureSettings, fireEvent) => {
  const isMobile = DY.deviceInfo.type !== 'desktop';
  const userIsAttched = !!PDP_MANAGER.API_DATA.rep_id;
  const couponSection = document.querySelector('.coupon_section');
  document.querySelectorAll(`.${id}__basket--lines`).forEach((item) => {
    const lastBasket = item?.closest(`.${id}__basket`);
    lastBasket.insertAdjacentElement('afterend', couponSection);
    lastBasket.remove();
  });

  //const userIsAttched = !!PDP_MANAGER['API_DATA']['rep_id'];

  const basketHtml = `
    
    <div class="${id}__basket">

    <div class="${id}__mobile--backbtn"><i class="vue-pdp-icon-chevron-prev"></i>
    Продолжить покупки</div>

        <div class="${id}__basket--title "><span class="${
    !userIsAttched ? `${id}__hide` : ''
  }">\${Basket--Title}</span><span class="${!userIsAttched ? '' : `${id}__hide`}">\${Basket--Title-mobile}</span></div>

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
  if (isMobile) {
    document.querySelector(`.mobile_scrolling_wrapper`)?.insertAdjacentHTML('afterbegin', basketHtml);
    document.querySelector(`.${id}__totals`).insertAdjacentElement('afterend', couponSection);

    couponSection.querySelector('button').style.width = '100%';
    couponSection.querySelector('div').setAttribute('style', ' flex-direction:column;gap:16px;');
    couponSection
      .querySelector('input')
      .setAttribute('style', 'width: 100%; padding:14px 0; background: #FFFFFF;border: 1px solid #E6EDED;margin-right:0 ');
    couponSection.querySelector('button:disabled').setAttribute('style', 'width:100%;opacity:0.8');
  } else {
    document.querySelector(`.header_container`).insertAdjacentHTML('afterend', basketHtml);

    document.querySelector(`.${id}__basket`).insertAdjacentElement('beforeend', couponSection);
    const distanceFromTop = (el) => {
      var rect = el.getBoundingClientRect();
      var docEl = document.documentElement;
      return Math.abs(rect.top + (window.pageYOffset || docEl.scrollTop || 0));
    };
    document.querySelector('[data-item-id="wishlistContainerVueWrapper_subObject_1"]').scrollTop = 0;
    const basketLines = document.querySelector(`.${id}__basket--lines`);
    const couponSectionPosition = basketLines.offsetHeight + distanceFromTop(basketLines);
    console.log(couponSectionPosition);
    couponSection.setAttribute('style', `width:max-content; position: absolute; top: ${couponSectionPosition - 25}px;`);
    couponSection.querySelector('div').setAttribute('style', ' flex-direction:column;gap:16px; padding-left:0');
    couponSection.querySelector('input').setAttribute('style', ' background: #FFFFFF;border: 1px solid #E6EDED;margin-right:0 ');
    couponSection.querySelector('.btn-bordered:disabled').setAttribute('style', 'opacity:0.8');
  }

  placaVariantImages(id);

  //add events
  document.querySelector(`.${id}__basket`).addEventListener('click', (e) => {
    const target = e.target;
    triggerVariantTrackings(id, target, updateQuantity, fireEvent);
  });

  const setPosition = () => {
    const promoContainer = document.querySelector(`.${id}__promo`);
    if (promoContainer && window.matchMedia('(min-width: 769px)').matches) {
      return promoContainer.offsetHeight + 20;
    } else {
      return 0;
    }
  };

  document.querySelector(`.${id}__checkout-total`).style.transform = `translateY(-${setPosition()}px)`;
};

export default renderbasket;
