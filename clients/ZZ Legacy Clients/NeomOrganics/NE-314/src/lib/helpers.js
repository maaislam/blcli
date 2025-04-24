import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';

const { ID, VARIATION } = shared;


export const closeGiftMsg = () => {
  document.querySelector(`button.${ID}-submit#${ID}-gift-close`).addEventListener('click', (e) => {
    fireEvent('Click - Close');
    document.querySelector(`.${ID}-gift-box__wrapper`).classList.add('scale-out-center');

    if (document.querySelector(`body.${ID}-gift-msg__visible`)) {
      document.querySelector('body').classList.remove(`${ID}-gift-msg__visible`);
    }
  });
}

export const setCookie = (c_name,c_value,exdays) => {
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  // console.log('>>>COOKIE:');
  // console.log(encodeURIComponent(c_name) + "=" + encodeURIComponent(c_value) + (!exdays ? "" : "; expires="+exdate.toUTCString()));
  document.cookie=encodeURIComponent(c_name) 
    + "=" + encodeURIComponent(c_value)
    + (!exdays ? "" : "; expires="+exdate.toUTCString());
    ;
}

export const observerOnProductPages = () => {
  if (!document.querySelector('.product-sections-container .is-product.sticky-cta').classList.contains('hide')) {
    // --- PDP Add to Cart CTA is sticky
    if (window.innerWidth <= 360) {
      document.querySelector(`.${ID}-gift-box__wrapper`).setAttribute('style', 'bottom: 70px;');
    } else {
      document.querySelector(`.${ID}-gift-box__wrapper`).setAttribute('style', 'bottom: 70px;');
    }
    
    document.querySelector('body').classList.add(`${ID}-gift-msg__visible__sticky`);
  }
  observer.connect(document.querySelector('.product-sections-container .is-product'), () => {
    setTimeout(() => {
      if (!document.querySelector('.product-sections-container .is-product.sticky-cta').classList.contains('hide')) {
        // --- PDP Add to Cart CTA is sticky
        if (window.innerWidth <= 360) {
          document.querySelector(`.${ID}-gift-box__wrapper`).setAttribute('style', 'bottom: 80px;');
        } else {
          document.querySelector(`.${ID}-gift-box__wrapper`).setAttribute('style', 'bottom: 75px;');
        }
        
        document.querySelector('body').classList.add(`${ID}-gift-msg__visible__sticky`);
      } else {
        document.querySelector(`.${ID}-gift-box__wrapper`).removeAttribute('style');
        document.querySelector('body').classList.remove(`${ID}-gift-msg__visible__sticky`);
      }
    }, 100);
    
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
      // subtree: true,
    },
  });
}