/**
 * TRG007 - Improve C & C Signposting (Find a Restaurant)
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';

import shared from './shared';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

/**
 * Push an item to the datalayer
 */
const dataLayerPush = (actionString) => {
  let variant = `${shared.ID}-v${shared.VARIATION}`;

  if(shared.VARIATION == 'control') {
    variant = `${shared.ID}-control`;
  }

  window.dataLayer.push({
    event: `${shared.ID}`,
    variant: variant,
    action: actionString
  });
};

const activate = () => {
  if(shared.VARIATION == 'control') {
    // events.send(`${shared.ID}-control`, 'activated');
    dataLayerPush('activated');
  } else {
    // rest of experiment code
    // events.send(`${shared.ID}-v1`, 'activated');
    dataLayerPush('activated');

    if (window.location.href.indexOf('/restaurants/search?q=') > -1 || window.location.href.indexOf('/restaurants/search?qp=') > -1) {
      setup();
      // Write experiment code here
      const allResults = document.querySelectorAll('.ResultList .ResultList-item.js-location-result');
      [].forEach.call(allResults, (item) => {
        const buttonsContainer = item.querySelector('.Teaser-row.Teaser-row--links');
        const bookCta = item.querySelector('.Teaser-link--bookNow');
        const storeHref = bookCta.getAttribute('href');
        const hrefLinkParts = storeHref.split('/');
        const store = hrefLinkParts[hrefLinkParts.length - 1];

        const newBtn = `<div class="Teaser-linkWrapper">
          <a class="Teaser-link Teaser-link--clickcollect ${shared.ID}-click-collect" href="/restaurants/${store}/takeaway/menu" data-ya-track="clickcollect">Click & Collect<span>40% OFF</span></a>
        </div>`;
        if (store !== "london-whitehall") {
          buttonsContainer.insertAdjacentHTML('beforeend', newBtn);
        }
      });
    }
  
    /**
     * @desc Detect URL change 
     * Re-run test if user is on "/restaurants/search"
     * else, reload page
     */
    window.addEventListener('locationchange', function(){
      // console.log('location changed!');
      if (window.location.pathname.indexOf('/restaurants/search/search?q=') > -1) {
        if (!document.querySelector(`.${shared.ID}-click-collect`)) {
          activate();
        } 
      } else {
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
