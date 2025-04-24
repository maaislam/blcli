/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';
import RingFinderMarkup from './components/finderMarkup';
import { EJringData } from './components/productData';


const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {

    const loadScript = (source, beforeEl, async = true, defer = true) => {
      return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        const prior = beforeEl || document.getElementsByTagName('script')[0];
    
        script.async = async;
        script.defer = defer;
    
        function onloadHander(_, isAbort) {
          if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = null;
            script.onreadystatechange = null;
            script = undefined;
    
            if (isAbort) { reject(); } else { resolve(); }
          }
        }
    
        script.onload = onloadHander;
        script.onreadystatechange = onloadHander;
    
        script.src = source;
        prior.parentNode.insertBefore(script, prior);
      });
    }

    const scriptUrl = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
    loadScript(scriptUrl).then(() => {

    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();
    let ringData;

    if(getSiteFromHostname() === 'ernestjones') {
      ringData = EJringData;
    } else {
      ringData = EJringData;
    }

    const data = ringData;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      document.createElement('img').src = element.imgThumb;
    }
   

    const finderBanner = () => {
      const banner = document.createElement('div');
      banner.classList.add(`${ID}-finderBanner`);
      banner.innerHTML = `
      <div class="${ID}-image"></div>
      <div class="${ID}-text">
        <h3>Find your perfect match</h3>
          <p>with our engagement ring finder</p>
          <div class="${ID}-ctaBanner">Get started</div>
      </div>
      `;

      if(window.digitalData.page.pageInfo.pageType === 'PLP') {
        document.querySelector('.product-listing__title-container').insertAdjacentElement('afterend', banner);
      } else if (document.querySelector('.hero-banner')){
        document.querySelector('.hero-banner').insertAdjacentElement('afterend', banner);
      } else {
        document.querySelector('.banner').insertAdjacentElement('afterend', banner);
      }
    }

    finderBanner();
    new RingFinderMarkup();

    const initialWindowHeight = window.innerHeight;
    const reportWindowSize = () => {
        let resizedHeight = window.innerHeight;
        if(resizedHeight > initialWindowHeight) {
        document.body.classList.add('navbar-hidden');
        } else if(resizedHeight = initialWindowHeight) {
        document.body.classList.remove('navbar-hidden');
        }
    }

    window.onresize = reportWindowSize;


    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  });
  }
};
