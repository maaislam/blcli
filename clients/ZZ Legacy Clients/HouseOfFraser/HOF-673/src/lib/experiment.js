/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events } from '../../../../../lib/utils';
import renderQuickLinks from './components/quickLinks';
import { quickLinkData } from './data';
import initSwiper from './helpers/initSwiper';
import { singlePurchaseConfig } from './helpers/swiperConfigs';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...
  const targetMatched = (desiredMatch, target) => target.matches(desiredMatch) || target.closest(desiredMatch);

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    const mobMenuGroup = document.querySelector('.mobMenuGroup');

    mobMenuGroup.addEventListener('click', (e) => {
      const target = e.target;

      if (targetMatched(`li[id^="mob-"]`, target)) {
        const isSecondLevelOpen = mobMenuGroup.querySelectorAll('.mp-level.show-level').length > 0;
        !isSecondLevelOpen && fireEvent(`User clicks quicklink ${target.closest(`li`).getElementsByTagName('a')[0].innerText}`);
      }
    });

    return;
  }

  // Write experiment code here
  // ...

  const quickLinksAnchor = document.querySelector('.HOF_HOME1').closest('.ecomContent');

  quickLinksAnchor.insertAdjacentHTML('afterbegin', renderQuickLinks(ID, quickLinkData));

  initSwiper(`.${ID}__swiper-container`, singlePurchaseConfig, fireEvent);

  const newQuickLinks = document.querySelectorAll(`.${ID}__swiper-container .${ID}__quicklink--link`);
  [].slice.call(newQuickLinks).forEach((link) => {
    link.addEventListener('click', (e) => {
      fireEvent(`User clicks quicklink ${e.currentTarget.innerText}`);
    });
  });

};
