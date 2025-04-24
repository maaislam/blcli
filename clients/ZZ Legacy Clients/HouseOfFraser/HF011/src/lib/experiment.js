/**
 * IDXXX - Description
 * @author User Conversion
 */
import {
  setup,
  checkBrand,
  buildPopup,
  addBrands,
  showPopup,
  closePopup,
  clickBrand,
} from './services';
import { getCookie, events, fetchAffinity } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';
import brandsTier from './brandsTier';
import settings from './settings';


events.analyticsReference = '_gaUAT';

const activate = () => {

  if (settings.VARIATION === '2') {
    events.send(settings.ID, 'Control', 'Control is active');
    return false;
  }

  setup();

  // Only show once, if cookie is available then don't show.
  if (getCookie('HF011PopupClosed') && document.body.classList.contains('Home')) {
    events.send(settings.ID, 'Click', 'Popup not shown');
    return false;  }

  // DYFetchAffinity();

  // Collect stored brands
  // const storedBrands = JSON.parse(localStorage.getItem('brandStorage'));
  let storedBrands = null;
  
  fetchAffinity().then((res) => {
    storedBrands = res;

    
    if (storedBrands !== null && storedBrands.length >= 6) {
      // Return only matching brands
      const acceptedBrands = storedBrands.slice(0, 6); //checkBrand(storedBrands, brandsTier);
    
     

      if (acceptedBrands.length > 0) {
        // Add brands as elements with links.
        const addedBrands = addBrands(acceptedBrands);
        // Add the accepted brands to the main popup.
        const builtPopup = buildPopup(addedBrands);
        const pageRef = document.querySelector('#BodyWrap');
        if (window.location.pathname === '/') {

          showPopup(builtPopup, pageRef);
          document.body.classList.add('HF011-popupAdded');
          events.send(settings.ID, 'Shown', 'Popup has been seen');
          
        } 

        pollerLite(['.HF011-popup'], () => {
          closePopup();
          clickBrand();
        });
        
      }
    }
  });

};

export default activate;
