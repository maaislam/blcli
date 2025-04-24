/**
 * TRG005 - Improve C & C Discount Prominence & Signposting (Offers Page)
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const activate = () => {
  if(shared.VARIATION == 'control') {
    events.send(`${shared.ID}-control`, 'activated');
  } else {
    // rest of experiment code
    events.send(`${shared.ID}-v1`, 'activated');
    if (window.location.pathname.indexOf('/offers/profile') > -1) {
      setup();

      // Write experiment code here
      const mainContainer = document.querySelector('main.main-content-container');
      const discountBanner = `<div class="${shared.ID}-discount-banner">
        <div class="${shared.ID}-image-banner" style="background-image:url('//images.ctfassets.net/8n6yne00qg20/4ykTpAcqGTmxRJMwxNVC7Y/c2bcf2b918f526b785efeac4e857a3ec/TA.png?w=928') !important;"></div>
        <div class="${shared.ID}-content__wrapper">
          <p data-size="lg" data-weight="black" class="heading">40% off when you Click &amp; Collect</p>
          <div class="${shared.ID}-orderCta__wrapper">
            <a data-v-9151adf6="" href="/click-and-collect" class="btn" target="_self" data-outline="true">
              Order now
            </a>
          </div>
        </div>
      </div>
      <div class="TRG005-dineIn-banner">
        <p data-size="lg" data-weight="black" class="heading">Your Dine In Offers</p>
      </div>`;
      if (mainContainer && !document.querySelector(`.${shared.ID}-discount-banner`)) {
        mainContainer.insertAdjacentHTML('afterbegin', discountBanner);
      }  
    }

    /**
     * @desc Detect URL change 
     * Re-run test if user is on "/offers/profile"
     * else, reload page
     */
    window.addEventListener('locationchange', function(){
      // console.log('location changed!');
      if (window.location.pathname.indexOf('/offers/profile') > -1) {
        if (!document.querySelector(`.${shared.ID}-discount-banner`)) {
          activate();
        } 
      } else if (window.location.pathname.indexOf('/book/your-details') === -1) {
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
  }
};

export default activate;
