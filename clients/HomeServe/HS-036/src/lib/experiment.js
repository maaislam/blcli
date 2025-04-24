/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

import { mainData } from './data/data';
import { fireEvent, newEvents, setup } from './helpers/utils';

const { ID, VARIATION } = shared;

const init = () => {
  const { pathname } = window.location;
  const parentElement = document.querySelector('.category-items .grid');

  document.querySelectorAll(`.btn--rounded.${ID}__primaryCta`).forEach((item) => {
    item.classList.remove(`${ID}__primaryCta`);
  });

  parentElement.querySelectorAll('.promo-box').forEach((item) => {
    const findoutElement = item.querySelectorAll('a.btn--rounded');

    findoutElement.forEach((element) => {
      const findoutElementLink = element.href.split('co.uk')[1];

      const data = mainData[pathname];
      //console.log('🚀 ~ parentElement.querySelectorAll ~ data:', data);
      const boxData = data[findoutElementLink];
      if (data && boxData) {
        element.classList.add(`${ID}__primaryCta`);
        element.innerText = boxData.btnText;
      }
    });
  });

  pollerLite(['.category-install'], () => {
    const categoryElement = document.querySelector('.category-install');
    const categoryCta = categoryElement.querySelector('.install-promo-cta > .btn--rounded');
    categoryCta.classList.remove(`${ID}__categoryCta`);
    categoryCta.classList.add(`${ID}__categoryCta`);
    categoryCta.innerHTML = 'Discover BOXT';
  });
};

export default () => {
  setup();

  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  fireEvent('Conditions Met');

  document.body.addEventListener('click', ({ target }) => {
    if (target.closest('.promo-box > a.btn--rounded') || target.closest(`.${ID}__primaryCta`)) {
      const link = target.closest('.promo-box > a.btn--rounded').href;
      fireEvent(`User interacts with the ctas - link (${link})`);
    } else if (target.closest('.category-install .install-promo-cta > a.btn--rounded') || target.closest(`.${ID}__categoryCta`)) {
      const link = target.closest('.category-install .install-promo-cta > a.btn--rounded').href;
      fireEvent(`User interacts with the ctas - link (${link})`);
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  init();
};
