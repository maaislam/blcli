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

import { highlightConfig } from './helpers/swiperConfigs';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Test Code Fired');

  const anchorElem = document.querySelector('#HeaderPlaceholder');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  console.log('Running: ', ID);
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------

  clickHandler(ID, fireEvent);
  // ...
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    fireEvent('Conditions Met');
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
  const uspContainer = document.querySelector(`.${ID}__uspbanner`);
  uspContainer && fireEvent('Conditions Met');

  if (!isMobile) return;

  initExternalLib(swiperJs, swiperCss);

  initSwiper(`.${ID}__uspbanner--container`, highlightConfig);
};
