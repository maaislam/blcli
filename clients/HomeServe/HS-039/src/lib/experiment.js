/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addCssToHead, addScriptToHead, fireEvent, formatText, newEvents, setup } from './helpers/utils';
import shared from '../../../../../core-files/shared';
import promoBar from './components/promoBar';

import { listItems } from './data/listItems';
import { listStr } from './components/listStr';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const test035Init = () => {
  const { pathname } = window.location;
  const plpData = listItems[pathname];
  if (!plpData) {
    return;
  }
  //console.log('🚀 ~ init ~ plpData:', plpData);
  const promoBoxes = document.querySelectorAll('.category-items .promo-box');
  promoBoxes.forEach((box) => {
    const targetPoint = box.querySelector('.list');
    const findOutUrl = box.querySelector('.btn--rounded').href.split('.uk')[1];
    //console.log('🚀 ~ promoBoxes.forEach ~ findOutUrl:', findOutUrl);
    const productData = plpData[findOutUrl];
    //console.log('🚀 ~ promoBoxes.forEach ~ productData:', productData);
    if (box.querySelector(`.${ID}__list`)) {
      box.querySelector(`.${ID}__list`).remove();
    }
    targetPoint && targetPoint.insertAdjacentHTML('beforebegin', listStr(ID, productData, box));

    const firstInactiveItem = box.querySelector(`.${ID}__active--no`);
    if (firstInactiveItem) {
      firstInactiveItem.classList.add(`${ID}__first-inactive`);
    }
  });
};

const init = () => {
  const promoBoxes = document.querySelectorAll('.category-items .promo-box');
  promoBoxes.forEach((box) => {
    const bubbleElement = box.querySelector('.bubble');
    const claimRibon = box.querySelector('.claims-ribbon');
    const serviceWrapper = box.querySelector('.service-box');
    const buttons = box.querySelectorAll('.choose-excess > div');
    !bubbleElement && box.classList.add(`${ID}__promoBox`);
    if (bubbleElement && !box.querySelector(`.${ID}__promoBar`)) {
      const bubbleText = bubbleElement.innerText;
      const mainText = formatText(bubbleText);
      bubbleElement.insertAdjacentHTML('beforebegin', promoBar(ID, mainText));
      const promoBarElement = box.querySelector(`.${ID}__promoBar p`);
      promoBarElement.innerHTML = promoBarElement.innerHTML.replace('Service', 'Service<br>');
    }

    if (buttons && buttons.length > 1) {
      box.querySelector('.choose-excess').classList.add(`${ID}__excess`);
    }

    claimRibon && serviceWrapper?.querySelector('.no-service')?.insertAdjacentElement('beforeend', claimRibon);
    if (!box.querySelector('.no-service') && claimRibon) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
          <div class="no-service"></div>`;
      wrapper.classList.add('service-box');
      box.insertAdjacentElement('beforeend', wrapper);
      wrapper.querySelector('.no-service').insertAdjacentElement('beforeend', claimRibon);
    }
  });
};

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';
  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest('.category-selector__list') && target.closest('.category-selector__list > li')) {
      fireEvent('Customer clicks the product tabs');
    } else if (
      target.closest('.promo-box .choose-excess') &&
      (target.closest('.btn') || target.closest('label.float-label-cat'))
    ) {
      fireEvent('Customer clicks the excess buttons');
    } else if (target.closest('.promo-box') && target.closest('a.btn--rounded')) {
      fireEvent('Customer clicks Find out More');
    }
  });

  test035Init();

  if (VARIATION == 'control') {
    return;
  }

  init();

  //add swiper
};
