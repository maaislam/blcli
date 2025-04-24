/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { menuRenderer } from './helpers';
import navData from './data';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  const existingNav = document.querySelector('#shopify-section-header nav.navigation');

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------

  if(existingNav) {
    const navMarkup = menuRenderer(navData);

    existingNav.innerHTML = navMarkup;
  }

  // Tracking
  existingNav.addEventListener('click', e => {
    if(e.target.closest(`.${shared.ID}-card`)) {
      fireEvent('Click - Card');
    } else if(e.target.closest(`.${shared.ID}-linklist__link`)) {
      const l = e.target.closest(`.${shared.ID}-linklist__link`);

      fireEvent('Click - List Link - ' + l?.pathname);
    } else if(e.target.closest(`.${shared.ID}-imgcta`)) {
      fireEvent('Click - Image Card - ' + e.target.closest(`.${shared.ID}-imgcta`)?.pathname);
    } else if(e.target.closest(`.${shared.ID}-nav__item-link`)) {
      fireEvent('Click - Top Level');
    }
  });
};
