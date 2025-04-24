/**
 * TRG013 - C & C USP Promotion
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

export default () => {
  setup();
  // Write experiment code here
  // const discountBanner = document.querySelector('.main-content-container section.nearest-me .content .discount-banner');
  const discountBanner = document.querySelector('.main-content-container .discount-banner');
  const bannerText = discountBanner.querySelector('p');
  if (bannerText) {
    bannerText.innerText = 'Click & Collect';
  }

  const listOfOffers = `<div class="${shared.ID}-offers__wrapper">
    <ul class="${shared.ID}-offers">
      <li class="${shared.ID}-offer">It's easy. Order, collect and eat.</li>
      <li class="${shared.ID}-offer"> 40% off discount.</li>
      <li class="${shared.ID}-offer">Food ready in under 30mins!</li>
    </ul>
  </div>`;

  if (!document.querySelector(`.${shared.ID}-offers__wrapper`)) {
    discountBanner.setAttribute('style', 'width: 100%; display: block; position: relative; height: auto; min-height: 100px;')
    discountBanner.insertAdjacentHTML('beforeend', listOfOffers);
  }

  /**
   * @desc Detect URL change 
   * Re-run test if user is on "/takeaway/all" or "/takeaway"
   * else, reload page
   */
  window.addEventListener('locationchange', function(){
    // console.log('----- location changed!');
    if (window.location.pathname.indexOf('/takeaway/all') > -1) {
      window.location.reload();
    } else if (window.location.pathname === "/takeaway") {
      window.location.reload();
    }
  });
  /* These are the modifications: */
  history.pushState = ( f => function pushState(){
    let ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('pushState'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  })(history.pushState);

  history.replaceState = ( f => function replaceState(){
    let ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('replaceState'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  })(history.replaceState);

  window.addEventListener('popstate',()=>{
    window.dispatchEvent(new Event('locationchange'))
  });
  
};
