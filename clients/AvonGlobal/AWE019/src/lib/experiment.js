/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import uspBanner from './components/uspBannner';
import { domData } from './data';
import initExternalLib from './helpers/addExternalLib';
import clickHandler from './helpers/clickHandler';
import initSwiper from './helpers/initSwiper';
import obsIntersection from './helpers/observeIntersection';
import { highlightConfig } from './helpers/swiperConfigs';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Test Code Fired');

  const anchorElem = document.querySelector('.ProductDescription');
  const isMobile = DY.deviceInfo.type !== 'desktop';
  console.log('Running: ', ID);
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  const intersectionCallback = (entries) => {
    if (entries.isIntersecting && !document.body.classList.contains(`${ID}__seen-uspbanner`)) {
      document.body.classList.add(`${ID}__seen-uspbanner`);
      fireEvent('Conditions Met');
    }
  };

  clickHandler(ID, fireEvent);
  // ...
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    pollerLite(['.promoted-products-box'], () => {
      const recommedationBlock = document.querySelector('.promoted-products-box');
      obsIntersection(recommedationBlock, 0.5, intersectionCallback);
    });
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const swiperJs = 'https://m7cdn.io/common/js/swiper.js';
  const swiperCss = 'https://dev.m7cdn.io//common/css/swiper.css';

  pollerLite(['.bar'], () => {
    document.querySelector('.bar').classList.add(`${ID}__delivery--bar`);
  });

  uspBanner(ID, VARIATION, domData, anchorElem, isMobile);
  const usbContainer = document.querySelector(`.${ID}__uspbanner`);
  obsIntersection(usbContainer, 0.5, intersectionCallback);

  if (!isMobile || VARIATION == 2) return;

  initExternalLib(swiperJs, swiperCss);

  initSwiper(`.${ID}__uspbanner--container`, highlightConfig);
};
