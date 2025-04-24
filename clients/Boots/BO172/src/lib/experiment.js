/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
// import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION === 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const entryElementVar1 = document.querySelector('#estore_pdp_topsec');
  const entryElementVar2 = document.querySelector('.payPal3PDPMessage');
  const rootElement = document.createElement('div');

  rootElement.style.width = '100%';

  /* html */
  rootElement.innerHTML = `
  <div class="${ID}-pclub-banner ${ID}-variation-${VARIATION}">
    <div class="${ID}-pclub-banner-logo">
      <img src="https://boots.scene7.com/is/image/Boots/cd_parenting_club?scl=1&fmt=png-alpha" alt="Boots Parenting Club" />
    </div>
    <div class="${ID}-pclub-banner-content ${VARIATION === '1' ? `${ID}-centred` : ''}">
      <p>Collect 8 points per £1 on your baby shop with Boots Parenting Club</p>
      <a href="https://www.boots.com/webapp/wcs/stores/servlet/BootsLogonForm?catalogId=28501&storeId=11352&langId=-1&krypto=pfw6Yo3DAVZztY%2BWgaSS2x1B1ONISzO%2Bo4ATxi%2Fn%2FD6J%2Fahz%2BpFDf0JhoisO2xdAXKVaHVWKEzUGpSHoumuXjMznB0gR7baxIqWwtH1kzpsSP%2FW7VN39BU%2F36bmt%2Fk717t3QLGkNwdHKFbGo6yZJr3NsX0n2irZawx%2BMFbvk%2B7FHCgjBmp41%2FKwuRTZTNQjUNbLJmBppp%2BA4Oo%2F9iIVbGEWhz85kIKubtXc3bvmGnMfhOSZOzYSSKsl9C2lGc4N2SUynNA0CZbiW8GkUAdl5KSR7UnvIHPO97%2FoO8EYR6KcFbf1y6Oj5ofUo9F5P35zOZ%2BehX74NF2tElrTVSIjlMp5e9a%2Ftc8sQsxf9sGhXVRhQP3I89ewXEj%2Fp2rKgtYQm5PBROpOl2aU79PWZciWKM79tQv9JOAJTu8XrosGu1pFTXy5RjtGuna%2FU5LApMQis" data-${ID}-cta>Join the Club</a>
    </div>
  </div>
  `;

  const cta = rootElement.querySelector(`[data-${ID}-cta]`);

  cta.addEventListener('click', () => fireEvent('Clicked parenting banner'));

  if (VARIATION === '1') {
    entryElementVar1.parentNode.insertBefore(rootElement, entryElementVar1);
  } else if (VARIATION === '2') {
    entryElementVar2.parentNode.insertBefore(rootElement, entryElementVar2);
  }
};
