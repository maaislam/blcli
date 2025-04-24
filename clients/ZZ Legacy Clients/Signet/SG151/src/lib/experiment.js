/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { getClientID, getSiteFromHostname, removeStorage } from './helpers';
import ctaHomepage from './homepageMarkup/ctaHomepage';
import HomePageGrid from './homepageMarkup/homepageGridTiles';
import storage from './storage';

const { ID, VARIATION } = shared;




/**
 * Activate
 */
export default () => {
  setup();

  fireEvent('Conditions Met');


  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

 
  const checkSession = setInterval(function(){
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if(sessionStorage.getItem('analyticsDataSentFor') && sessionStorage.getItem('analyticsDataSentFor') === window.location.pathname) {
      if(typeof s !== 'undefined'){
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }  
      clearInterval(checkSession);
    }
  }, 1000);
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

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

  

    
  // Store the page views and brand
  if (window.digitalData.page.pageInfo.pageType === 'PDP' || window.digitalData.page.pageInfo.pageType === 'PLP') {
    storage();
  }

  // Get the most viewed category
  if(window.digitalData.page.pageInfo.pageType === 'Landing') {
    if(localStorage.getItem(`${getClientID()}-groupings`)) {


      pollerLite([
        '.home-tile-grid .home-tile-grid__text-tile',
        '.home-tile-grid .home-tile-grid__small-tile'], () => {

          document.documentElement.classList.add(`${ID}-newHomepage`);

          if(VARIATION === '1') {
            new HomePageGrid();
            fireEvent('New banners show');

          } else if (VARIATION === '2') {

            const scriptUrl = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
            loadScript(scriptUrl).then(() => {
              ctaHomepage();
              fireEvent('New banners show');
            });

          } if(VARIATION === 'control') {

            fireEvent('New banners show');

          }

          removeStorage();

      });
    }
        
  }
};
