import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const init = () => {
  if (VARIATION == 'control') {
    return;
  }

  const anchorPoint = document.querySelector('.product__actions-container');

  const htmlStr = `<div class="${ID}__freeDelivery">
    <span class="${ID}__freeDelivery-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="17" viewBox="0 0 25 17" fill="none">
        <path d="M5.35714 10.9266C6.04325 10.9265 6.70833 11.1681 7.23982 11.6106C7.77132 12.053 8.13659 12.6692 8.27381 13.3548H16.6667V1.21407H3.57143C2.93996 1.21407 2.33436 1.46989 1.88784 1.92525C1.44133 2.38062 1.19048 2.99822 1.19048 3.64221V13.3548H2.44048C2.5777 12.6692 2.94297 12.053 3.47446 11.6106C4.00596 11.1681 4.67104 10.9265 5.35714 10.9266ZM5.35714 16.997C4.67104 16.9971 4.00596 16.7555 3.47446 16.313C2.94297 15.8705 2.5777 15.2544 2.44048 14.5688H0V3.64221C0 2.67623 0.376274 1.74982 1.04605 1.06678C1.71582 0.383731 2.62423 0 3.57143 0H16.6667C16.9824 0 17.2852 0.127911 17.5085 0.355593C17.7317 0.583275 17.8571 0.892077 17.8571 1.21407V3.64221H21.4286L25 8.49848V14.5688H22.5595C22.4229 15.2549 22.0579 15.8718 21.5263 16.3149C20.9948 16.758 20.3294 17 19.6429 17C18.9563 17 18.2909 16.758 17.7594 16.3149C17.2278 15.8718 16.8628 15.2549 16.7262 14.5688H8.27381C8.13659 15.2544 7.77132 15.8705 7.23982 16.313C6.70833 16.7555 6.04325 16.9971 5.35714 16.997ZM5.35714 12.1407C4.88354 12.1407 4.42934 12.3325 4.09445 12.6741C3.75957 13.0156 3.57143 13.4788 3.57143 13.9618C3.57143 14.4448 3.75957 14.908 4.09445 15.2495C4.42934 15.591 4.88354 15.7829 5.35714 15.7829C5.83074 15.7829 6.28495 15.591 6.61983 15.2495C6.95472 14.908 7.14286 14.4448 7.14286 13.9618C7.14286 13.4788 6.95472 13.0156 6.61983 12.6741C6.28495 12.3325 5.83074 12.1407 5.35714 12.1407ZM19.6429 10.9266C20.329 10.9265 20.994 11.1681 21.5255 11.6106C22.057 12.053 22.4223 12.6692 22.5595 13.3548H23.8095V8.88698L23.5238 8.49848H17.8571V11.5336C18.3571 11.1573 18.9762 10.9266 19.6429 10.9266ZM19.6429 12.1407C19.1693 12.1407 18.7151 12.3325 18.3802 12.6741C18.0453 13.0156 17.8571 13.4788 17.8571 13.9618C17.8571 14.4448 18.0453 14.908 18.3802 15.2495C18.7151 15.591 19.1693 15.7829 19.6429 15.7829C20.1165 15.7829 20.5707 15.591 20.9055 15.2495C21.2404 14.908 21.4286 14.4448 21.4286 13.9618C21.4286 13.4788 21.2404 13.0156 20.9055 12.6741C20.5707 12.3325 20.1165 12.1407 19.6429 12.1407ZM17.8571 4.85627V7.28441H22.619L20.8333 4.85627H17.8571Z" fill="black"/>
      </svg>
    </span>
    <span class="${ID}__freeDelivery-text">QUALIFIES FOR Free Delivery</span>
  </div>`;

  if (!document.querySelector(`.${ID}__freeDelivery`)) {
    anchorPoint.insertAdjacentHTML('afterend', htmlStr);
  }
};

export default () => {
  newEvents.initiate = true;
  newEvents.method = ['ga4'];
  if (window.location.href.indexOf('us.neomorganics.com') > -1) {
    newEvents.property = 'G-KJ9062XWWK';
  } else if (window.location.href.indexOf('neomorganics.eu') > -1) {
    newEvents.property = 'G-9CQMVE6E0J';
  } else {
    newEvents.property = 'G-884D6MBLFG';
  }

  setup();
  const priceElem = document.querySelector('.product__price span');
  const price = priceElem.dataset.productPriceBare;
  //logMessage(ID + " Variation: "+VARIATION);

  document.body.addEventListener('pointerup', (e) => {
    const { target } = e;
    if (target.closest('.product__add-to-cart') && target.closest('.product__actions-container')) {
      fireEvent('User adds to bag via PDP CTA');
    } else if (target.closest('[data-sticky-btn]') && target.closest('.sticky-cta')) {
      fireEvent('User adds to bag via sticky banner CTA');
    }
  });

  if (Number(price) / 100 > 50) {
    fireEvent('Conditions Met');
    init();
  }
};
