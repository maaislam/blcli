/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

import { setup, fireEvent, isMobile, newEvents } from './helpers/utils';

import accountPageHandler from './handlers/accountPageHandler';
import pageTypeFourHandler from './handlers/pageTypeFourHandler';
import pageTypeOneHandler from './handlers/pageTypeOneHandler';
import pageTypeThreeHandler from './handlers/pageTypeThreeHandler';
import pageTypeTwoHandler from './handlers/pageTypeTwoHandler';

const { VARIATION } = shared;

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const isGatsbyPageTypeOne = !document.querySelector('.hs-header') && document.querySelector('#___gatsby');

  if (window.location.pathname.includes('/uk/loggedin/my-homeserve')) {
    accountPageHandler();
    return;
  }

  if (isGatsbyPageTypeOne && !isMobile()) {
    pollerLite(['#ddMenu'], pageTypeThreeHandler);
    return;
  }

  if (isGatsbyPageTypeOne && isMobile()) {
    pollerLite(['#ddCanvasMenu'], pageTypeFourHandler);
    return;
  }

  pollerLite(['.navbar-nav', () => !document.getElementById('ddMenu')], pageTypeOneHandler);

  pollerLite(['.hs-primary-nav__parent'], pageTypeTwoHandler);
};
