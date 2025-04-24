/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import ProductUSPs from './components/usps';
import countdown from './components/countdown';
import { events } from '../../../../../lib/utils';


export default () => {
  setup();
  const { ID, VARIATION } = shared;

  const usps = new ProductUSPs();

  countdown();

  // newsletter anchor

  const newsletterLink = document.querySelector(`.${ID}-newsletterLink`);

  if(newsletterLink) {

    function scrollToElement(element) {
      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.getBoundingClientRect().top + window.scrollY - 100,
      });
    }
    
    newsletterLink.addEventListener('click', () => {
     if(document.querySelector('.email-sign-up')) {
       scrollToElement(document.querySelector('.email-sign-up'));
       events.send(`${ID} v${VARIATION}`, 'click', 'newsletter link');
     }
    });
  }
};
