/**
 * NE-430 - Top 5 bundles on Pod Collection page
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const topBundles = ['/products/wellbeing-pod-essential-oil-diffuser-essential-oil-blends-collection',
  '/products/perfect-nights-sleep-pod-starter-pack',
  '/products/real-luxury-pod-starter-pack',
  '/products/happiness-pod-starter-pack',
  '/products/focus-the-mind-pod-starter-pack'];

  const allProducts = document.querySelectorAll('section.section .container .column.is-3-desktop.is-4-tablet.is-6-mobile');
  [].forEach.call(allProducts, (prod) => {
    let prodUrl = prod.querySelector('a').getAttribute('href');
    if (topBundles.indexOf(`${prodUrl}`) == -1) {
      prod.setAttribute('style', 'display: none !important;');
    } else {
      prod.classList.add(`${ID}-topBundle`);
    }
  });

  pollerLite([`${ID}-topBundle`], () => {
    fireEvent('Visible - Only Top 5 Bundles are visible');
  });
};
