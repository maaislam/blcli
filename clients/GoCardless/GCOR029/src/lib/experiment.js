/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import imageBlocks from './components/imageblocks';
import { partnerImagesConfig } from './data';
import { getCountry, countryConfig } from './helpers/getCountry';
import observeDOM from './helpers/observeDOM';

const { ID, VARIATION } = shared;

const init = () => {
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  if (document.querySelector(`.${ID}__imageblocks`)) return;
  const { country } = getCountry(countryConfig);

  const partnerLogos = partnerImagesConfig[country];

  const anchorPoint = document.querySelector('main article>div');
  anchorPoint.insertAdjacentHTML('afterend', imageBlocks(ID, partnerLogos.slice(0, 5), country));

  if (VARIATION === '2') {
    const secondAnchorPoint = anchorPoint.querySelectorAll('.css-y3655l')[0];

    secondAnchorPoint.insertAdjacentHTML('afterbegin', imageBlocks(ID, partnerLogos, country));

    document.querySelectorAll(`.${ID}__imageblocks`).forEach((element, index) => {
      element.classList.add(`${ID}__imageblocks-serial--${index + 1}`);
      if (index === 0) element.closest('.css-y0lh3q').querySelector('.css-197gpag').classList.add(`${ID}__hide--stockbanner`);
    });
  }
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest(`.${ID}__imageblock--btn`)) {
      fireEvent('User interacts with partners CTA');
    } else if (target.closest('.css-m5wlkr')) {
      fireEvent('User interacts with sign up CTA  at the bottom of the article');
    } else if (target.closest('.css-140tqjo')) {
      fireEvent('User interacts with Learn more CTA at the bottom of the article');
    } else if (target.closest('.css-1xg51cq')) {
      fireEvent('User interacts with Contact sales CTA at the bottom of the page');
    }
  });

  init();
  observeDOM('body', init);
};
