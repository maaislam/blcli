/**
 * ME308 - Christmas Header Notification
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import initiateSlick from './initiateSlick';

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
  let prod = '';
  if (window.location.href.indexOf('/uk/') > -1) {
    prod = 'Jumpers';
  } else {
    prod = 'Sweaters';
  }
  let bannerMsg = '';
  if (window.innerWidth > 767) {
    bannerMsg = `1Our Christmas ${prod} are now live and demand is high. Don’t miss out and secure yours today. <span>Shop Now</span>`;
  } else {
    bannerMsg = `2Our Christmas ${prod} are now live and demand is high.</br>Don’t miss out and secure yours today. <span>Shop Now</span>`;
  }

  bannerMsg = `Just Landed! Our Christmas ${prod} are now live and demand is high. Don’t miss out and secure yours today. <span>Shop Now</span>`;
  

  const banner = `<div  class="${ID}-banner col-lg-12 col-md-12 col-sm-12 col-xs-12">
  <a href="/geeks-guide-to-ugly-christmas-sweaterjumpers">
    <h3 id="resizing-h3" class="" >
      <span>
          <div class="stage">
            <div class="cubespinner">
              <div class="face1">${bannerMsg}</div>
              <div class="face2">${bannerMsg}</div>
              <div class="face3">${bannerMsg}</div>
              <div class="face4">${bannerMsg}</div>
            </div>
          </div>
        </span>
      </h3>
    </a>
  </div>`;

  
  // MOBILE
  if (window.innerWidth < 768) {
    document.querySelector('.page-wrapper').insertAdjacentHTML('beforebegin', banner);
    initiateSlick();
  } else {
    // DESKTOP
    document.querySelector('.page-wrapper').insertAdjacentHTML('afterbegin', banner);
  }
};
