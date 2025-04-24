import { h, render } from 'preact';
import MiniBasket from './MiniBasket';
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {
  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

/**
 * Activate
 */
export default () => {
  setup();

  fireEvent('Conditions Met');

  const siteIdent = getSiteFromHostname();
  if (siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

  // const checkSession = setInterval(() => {
  //   const { ID, VARIATION } = shared;

  //   if (
  //     sessionStorage.getItem('analyticsDataSentFor') &&
  //     sessionStorage.getItem('analyticsDataSentFor') === window.location.pathname
  //   ) {
  //     if (typeof s !== 'undefined') {
  //       s.eVar111 = `${ID} - V${VARIATION}`;
  //       s.tl();
  //     }
  //     clearInterval(checkSession);
  //   }
  // }, 1000);

  const checkCS = setInterval(() => {
    if (window._uxa) {
      window._uxa = window._uxa || [];
      window._uxa.push(['trackDynamicVariable', { key: `${ID}`, value: `Variation ${VARIATION}` }]);
      clearInterval(checkCS);
    }
  }, 800);

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if (VARIATION !== 'control') {
    if (getSiteFromHostname() === 'ernestjones') {
      const rootEntry = document.querySelector('.other-links');
      const rootElement = document.createElement('div');

      rootEntry.parentNode.insertBefore(rootElement, rootEntry);
      rootElement.id = `${ID}-root`;

      render(
        <MiniBasket id={ID} isModal={VARIATION == '2'} site={getSiteFromHostname()} />,
        rootElement
      );
    }

    if (getSiteFromHostname() === 'hsamuel') {
      const rootEntry = document.querySelector('.header-actions');
      const rootElement = document.createElement('div');

      rootEntry.parentNode.insertBefore(rootElement, rootEntry);
      rootElement.id = `${ID}-root`;

      render(
        <MiniBasket id={ID} isModal={VARIATION == '2'} site={getSiteFromHostname()} />,
        rootElement
      );
    }
  }
};
