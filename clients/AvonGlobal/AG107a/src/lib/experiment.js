import shared from '../../../../../core-files/shared';
import { setup, fireEvent } from '../../../../../core-files/services';
import observeDOM from './observeDOM';

const { ID, VARIATION } = shared;

let intervalTimer;
let pageViewTimer;

const IMAGE_CDN = 'https://cdn-eu.dynamicyield.com/api/9877979/images/';
const TIMER_INTERVAL = 25;
const TIME_ON_PAGE = 3000;
const TIME_OF_INACTIVITY = 7000;
const newPdpImage = VARIATION === '1' ? '4b81559331d4__group_1.svg' : '33776902e41f0__group_4.svg';
const image = IMAGE_CDN + newPdpImage;

const init = () => {
  //console.warn(`BL__${ID} init called`);
  setup();
  clearInterval(intervalTimer);
  clearInterval(pageViewTimer);

  // document.querySelectorAll(`[src="${image}"]`).forEach((item) => {
  //   console.warn(`BL__${ID} image deleted`);
  //   item.remove();
  // });

  const howToImage = document.querySelector('[src^="common/data/0002.svg"]');
  howToImage?.setAttribute('src', 'https://cdn-eu.dynamicyield.com/api/9877979/images/1a4b1002a849__asset_8_3x.png');

  intervalTimer = setInterval(() => {
    const pdpImages = document.querySelectorAll('.v7__maps__hotspot');
    pdpImages.forEach((pdpImage, index) => {
      const closestImgWrapper = pdpImage.closest('.v7__maps__map');
      const currentImage = pdpImage.getAttribute('src');
      const tryOnImage =
        VARIATION === '2'
          ? 'https://cdn-eu.dynamicyield.com/api/9877979/images/1c7920885aa8a__asset_4_1.svg'
          : 'https://cdn-eu.dynamicyield.com/api/9877979/images/d9354ca10ad5__asset_5_1.svg';
      const newImage = currentImage.includes('try_on') ? tryOnImage : image;
      pdpImage.setAttribute('src', newImage);
      closestImgWrapper.classList.add(`${ID}__newpdpImage`);

      pageViewTimer = setTimeout(() => {
        if (index === 0 && sessionStorage.getItem(`${ID}__seen`) !== 'true') {
          //get position of the floating btn
          fireEvent('Conditions Met');

          const btnPosition = pdpImage.getBoundingClientRect().left;
          console.log(btnPosition);
          if (btnPosition < 200) {
            closestImgWrapper.classList.add(`${ID}__btn-left-aligned`);
          }
          closestImgWrapper.classList.add(`${ID}__firstproduct`);
          closestImgWrapper.classList.remove('fade-animation-ldc-zones');
          setTimeout(() => {
            closestImgWrapper.classList.remove(`${ID}__firstproduct`);
          }, TIME_OF_INACTIVITY);
        }
      }, TIME_ON_PAGE);
      if (document.querySelectorAll('[src="/html/res/sticker_ldc_multi.svg"]').length === 0) {
        clearInterval(intervalTimer);
      }
    });
  }, TIMER_INTERVAL);
};

export default () => {
  setup('Experimentation', `AvonGlobal - ${ID}`, shared);
  //console.warn(`BL-${ID} test activated`);
  //add pointerEvents
  document.body.addEventListener('pointerup', ({ target }) => {
    const targetMatched = (targetSelector) => target.matches(targetSelector) || target.closest(targetSelector);

    if (targetMatched(`.${ID}__firstproduct`)) {
      document.querySelectorAll(`[src="${image}"]`).forEach((item) => {
        item.closest('.v7__maps__map').classList.remove(`${ID}__firstproduct`);
      });
      fireEvent('clicked first product', shared);
    } else if (targetMatched(`.${ID}__newpdpImage`) && !targetMatched(`.${ID}__firstproduct`)) {
      fireEvent('clicked product other than first product', shared);
    } else if (VARIATION === 'control' && targetMatched('.v7__maps__map')) {
      fireEvent('User interact with the CTA ', shared);
    }
  });
  if (VARIATION === 'control') {
    const isPage = window.location.href.includes('page/');
    isPage && fireEvent('Conditions Met', shared);
    return;
  }
  //bail if control

  init();

  let oldURL = window.location.href;
  const mutationCallback = (mutation) => {
    if (oldURL !== window.location.href) {
      if (!oldURL.includes('/product') && !window.location.href.includes('/product')) {
        sessionStorage.setItem(`${ID}__seen`, 'true');
        console.log('url changed');
        setTimeout(() => {


          init();
        }, 2000);
      } else {
        document.querySelectorAll(`[src="${image}"]`).forEach((item) => {
          item.closest('.v7__maps__map').classList.remove(`${ID}__firstproduct`);
        });
      }
      oldURL = window.location.href;
    }
  };
  observeDOM('body', mutationCallback);
};
