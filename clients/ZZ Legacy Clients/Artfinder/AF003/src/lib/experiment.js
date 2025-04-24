/**
 * AF003 - Trustpilot reviews in the checkout
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  let device = '';
  if (window.innerWidth < 565) {
    device = 'mobile';
  } else {
    device = 'desktop';
  }

  const tp = `<div class="trustpilot-widget" data-locale="en-GB" data-template-id="53aa8912dec7e10d38f59f36" data-businessunit-id="5196c0370000640005329892" data-style-height="130px" data-style-width="100%" data-theme="light" data-tags="Checkoutreviews" data-stars="1,2,3,4,5" data-review-languages="en">
    <a href="https://uk.trustpilot.com/review/artfinder.com" target="_blank" rel="noopener">Trustpilot</a>
  </div>`;
  const tpMobile = `<div class="trustpilot-widget" data-locale="en-GB" data-template-id="54ad5defc6454f065c28af8b" data-businessunit-id="5196c0370000640005329892" data-style-height="240px" data-style-width="100%" data-theme="light" data-tags="Checkoutreviews" data-stars="1,2,3,4,5" data-review-languages="en">
    <a href="https://uk.trustpilot.com/review/artfinder.com" target="_blank" rel="noopener">Trustpilot</a>
  </div>`;

  if (device === 'mobile') {
    if(document.querySelector('.checkout-progress-bar')) {
      document.querySelector('.checkout-progress-bar').insertAdjacentHTML('afterend', 
        `<div class="${shared.ID}-TPwidget__wrapper ${shared.ID}-TPwidget__wrapper-mobile"></div>`)

      document.querySelector(`.${shared.ID}-TPwidget__wrapper`).insertAdjacentHTML('afterbegin', tpMobile);
    }
  } else {
    if (document.querySelector('.af-max-width.side-pad0-small-only')) {
      document.querySelector('.af-max-width.side-pad0-small-only').insertAdjacentHTML('afterend', 
        `<div class="${shared.ID}-TPwidget__wrapper ${shared.ID}-TPwidget__wrapper-desktop"></div>`);
    } else if (document.querySelector('.margin.margin-bottom.margin-xxl .row')) {
      document.querySelector('.margin.margin-bottom.margin-xxl .row').insertAdjacentHTML('beforeend', 
        `<div class="${shared.ID}-TPwidget__wrapper ${shared.ID}-TPwidget__wrapper-desktop"></div>`);
    }
    
    if(document.querySelector(`.${shared.ID}-TPwidget__wrapper`)) {
      document.querySelector(`.${shared.ID}-TPwidget__wrapper`).insertAdjacentHTML('afterbegin', tp);
    }
  }
  

  if(document.querySelector('.trustpilot-widget')) {
    window.Trustpilot.loadFromElement(document.querySelector('.trustpilot-widget'));
  }
};


export default activate;
