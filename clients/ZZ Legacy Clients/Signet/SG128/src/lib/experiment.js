/**
 * SG128 - PLP Best Sellers
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.ernestjones.co.uk/webstore/l/watches/select%7Cluxury+watches/
 */
import { setup, fireEvent, getSiteFromHostname, generateProductContent } from './services';
import { events } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import initiateSlick from './initiateSlick';
import shared from './shared';
import ej_data from './ej_data';
import hs_data from './hs_data';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    // events.send(`${ID} - Control`, 'Fired');
    events.send('Experimentation', 'SG128 - Control', 'SG128 - Control Fired')
    // setup();
  } else {
    // events.send(`${ID} - V` + VARIATION, 'Fired');
    events.send('Experimentation', 'SG128 - V1', 'SG128 - V1 Fired')

    setup();


    const loadJquery = () => {
      return new Promise((resolve,reject) => {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
        head.appendChild(script);
        resolve();
      });
    };

  
    loadJquery().then(() => {
      /**
       * @desc Append Best Sellers Container 
       * below Header and SEO content
       */
      const topCatContainer = document.querySelector('.top-intro');
      const newBestSellersContainer = `<div class="${ID}-bestSellers__wrapper">
        <div class="${ID}-bestSellers__header">
          <h2>Best Sellers</h2>
        </div>
        <div class="${ID}-bestSellers__content">
          <ul class="${ID}-bestSellers__list"></ul>
        </div>
      </div>`;
      topCatContainer.insertAdjacentHTML('afterend', newBestSellersContainer);

      // Send GA Event when user interacts with Carousel
      document.querySelector(`.${ID}-bestSellers__wrapper`).addEventListener('click', (e) => {
        events.send('Experimentation', 'SG128 - V1 Clicked Best Seller', 'SG128 - V1 Clicked Best Seller')
      });
    
      generateProductContent();

    });
    


    
    
    

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
