/**
 * BV007 - Previously Purchased Product Reminder at PLP
 */

// Steps
// 1. Is user logged in?
// NO? Bail out.
// YES? 
// 2. Fetch previous purchases
// 3. Match product (ID) against PLP IDs
// 4. Does it match a product?
// YES?
// 5. Did they buy multiple sizes?
// YES? Ignore product
// 6. Did they return it?
// YES? Ignore product
// NO to 5+6?
// 7. Add 'Prev purchased banner' to product

import { setup } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { addPoller, addEventListener, addObserver } from './winstack';
import { events } from '../../../../../lib/utils';
import userStatus from './helpers/userStatus';
import fetchAndStore from './helpers/fetchAndStore';
import filterResults from './helpers/filterResults';
import checkAndAdd from './helpers/checkAndAdd';
import settings from './settings';

const activate = () => {
  setup();

  const loggedIn = userStatus();
  let storedRecords = null;
  if (loggedIn) {
    events.send(settings.ID, 'BV007 Active', 'User is logged in');

    // Check for stored records first.
    if (!window.localStorage.getItem('BV007-orders')) {
      
      // Don't exist, fetch and store.
      fetchAndStore(() => {
        // console.log('in callback');
        // Grab stored results
        storedRecords = window.localStorage.getItem('BV007-orders');
        // console.log('stored records ', storedRecords);

        // Now add messages
        checkAndAdd(storedRecords);
      });
      
    } else {
      // Already have them stored
      storedRecords = window.localStorage.getItem('BV007-orders');
      // console.log('has stored');
      checkAndAdd(storedRecords);
    }
    
    // Add observer to main for those React switches
    const app = document.querySelector('#app');
    addObserver(app, () => {
      if (storedRecords) {
        // console.log('app change!');
        checkAndAdd(storedRecords);
      }
    }, {
      config: {
        attributes: false,
        childList: true,
        subtree: false,
      }
    });
    
  } else {
    events.send(settings.ID, 'BV007 Fail', 'User is not logged in');
  }
};

export default activate;
