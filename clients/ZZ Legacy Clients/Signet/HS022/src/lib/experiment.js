/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import storeUsers from './storage/storeUsers';
import Lightbox from './lightbox/lightbox';
import settings from './settings';
import AllLastProducts from './lastViewedProducts/LastViewed';
import { events } from '../../../../../lib/utils';

const activate = () => {
  setup();

  // store user type
  storeUsers();

  // only on homepage
  const productType = window.digitalData.page.category.primaryCategory;

  const lastSite = document.referrer;
  if (lastSite.indexOf('hsamuel') === -1) {
    if (productType === 'Home') {
      // if user visited product pages
      if (window.localStorage.HS022recommended_prods_1 && window.localStorage.HS022userType === 'PDP') {
        const lastViewedProducts = new AllLastProducts();
        events.send(`${settings.ID} v${settings.VARIATION}`, 'User Type', 'PDP last viewed shown', { sendOnce: true });
      }

      // if user visited a PLP
      else if (window.localStorage.HS022userType === 'PLP' && !window.localStorage.HS022lightbox_closed) {
        const savedCat = JSON.parse(window.localStorage.HS022category)[0];
        const lightbox = new Lightbox(settings.ID, {
          content:
          `<div class="${settings.ID}-lightbox_inner">
            <h3>Welcome back!</h3>
            <p>Want to continue where you left off?</p>
            <p class="${settings.ID}-catTitle">Shop ${savedCat.name}</p>
            <span class="${settings.ID}-lbIcon ${settings.ID}-category_icon"></span>
            <div class="${settings.ID}-lightbox_button"><a href="${savedCat.link}"> Shop ${savedCat.name}</a></div>
          </div>`,
        });
        events.send(`${settings.ID} v${settings.VARIATION}`, 'User Type', 'PLP pop up shown', { sendOnce: true });
      }

      // if user visiting PDP with cart item
      else if (window.localStorage.HS022userType === 'PDPwithCartitem' && !window.localStorage.HS022lightbox_closed) {
        const lightbox = new Lightbox(settings.ID, {
          content:
          `<div class="${settings.ID}-lightbox_inner">
            <h3>Welcome back!</h3>
            <p>Just a reminder the you've left something in your basket. We've saved it for you.</p>
            <span class="${settings.ID}-lbIcon ${settings.ID}-basket_icon"></span>
            <div class="${settings.ID}-lightbox_button"><a href="/webstore/showbasket.sdo">Return to Basket</a></div>
          </div>`,
        });
        events.send(`${settings.ID} v${settings.VARIATION}`, 'User Type', 'Cart pop up shown', { sendOnce: true });
      }
    }
  }
};

export default activate;
