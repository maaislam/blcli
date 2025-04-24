/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { getCookie, pollerLite, observer, setCookie, deleteCookie } from '../../../../../lib/utils';

export default () => {
  setup();

  const { ID, VARIATION } = settings;
  
  const isHome = document.querySelector('.homeCarousel');
  const hasPostcode = document.querySelector('#hdnBasketValue').value;
  const bod = document.body;
  var root = document.getElementsByTagName( 'html' )[0]; // '0' to assign the first (and only `HTML` tag)

  const postCodeContainer = document.querySelector('.PJMCont .nearestStore');


  if (getCookie('backHome')) {
    deleteCookie('backHome');
    window.location.href = 'https://www.papajohns.co.uk';
  }

  let runClick = true;
  const clickOutside = (e) => {
    
    if (!postCodeContainer.contains(e.target)) {
      bod.classList.add('PJ-showHeader');
      runClick = false;
      return;
    }
  }

  if (!hasPostcode.length) {
    // User on homepage? 
    if (isHome) {
      bod.classList.add('PJ096-overlay');
      root.classList.add('PJ-overlay');

      if (runClick) {
        bod.addEventListener('click', (e) => clickOutside(e))
      }
    } else {
      // window.location.href = 'https://www.papajohns.co.uk/'; Not sure we should be doing this.
    }
  }

  if (postCodeContainer) {
    const buttons = document.querySelector('.main .splitButtons');
    
    if (buttons) {
      buttons.addEventListener('click', () => {
        if (!postCodeContainer.querySelector('.errorMessage') && VARIATION == 2) {
          setCookie('backHome');
          
        }
      });
    }
  }

};
