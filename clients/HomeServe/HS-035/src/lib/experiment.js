/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import shared from '../../../../../core-files/shared';
import { listItems } from './data/listItems';
import { listStr } from './components/listStr';
import { fireEvent, newEvents, setup } from './helpers/utils';

const { ID, VARIATION } = shared;

const init = () => {
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
    targetPoint && targetPoint.insertAdjacentHTML('beforebegin', listStr(ID, productData));

    const firstInactiveItem = box.querySelector(`.${ID}__active--no`);
    if (firstInactiveItem) {
      firstInactiveItem.classList.add(`${ID}__first-inactive`);
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
      //console.log('tab clicked');
      fireEvent('Customer clicks the product tabs');
    } else if (
      target.closest('.promo-box .choose-excess') &&
      (target.closest('.btn') || target.closest('label.float-label-cat'))
    ) {
      //console.log('button clicked');
      fireEvent('Customer clicks the excess buttons');
    } else if (target.closest('.promo-box') && target.closest('a.btn--rounded')) {
      //console.log('find out clicked');
      fireEvent('Customer clicks Find out More');
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  init();
};
