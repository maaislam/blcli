/**
 * DO002 - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import { getBasketInfo, getTime } from './helpers';
import { thresholdMessage, viewAll } from './messages';
import { createTabs } from './tabs';  

const activate = () => {
  setup();

  events.send(settings.ID, 'DO002 Active', 'Test is active');

  const ref = document.querySelector('.product--buybox'); // Sidebar
  
  const checkBasket = (calledOnChange) => {
    let latestAmt = 0;
    // Check to show threshold message
    getBasketInfo.then((res) => {

      const removeOld = () => {
        // Clear All
        pollerLite(['.DO002-thresholdMessage'], () => {
          const addedThresholds = document.querySelectorAll('.DO002-thresholdMessage');

          if (addedThresholds) {
            for (let i = addedThresholds.length - 1; i >= 0; i--) {
              addedThresholds[i].parentNode.removeChild(addedThresholds[i]);
            }
          }
        });
        const addedViewAlls = document.querySelectorAll('.DO002-viewAll');
        if (addedViewAlls) {
          for (let i = 0; addedViewAlls.length > i; i += 1) {
            addedViewAlls[i].parentNode.removeChild(addedViewAlls[i]);
          }
        }        
      };
      
      const threshRef = document.querySelector('ul.product--base-info');

      // If we have hidden input use that.
      const hiddenInput = document.querySelector('input#f_gpmdOmetriaAjaxBasket');
      let amount;
      if (hiddenInput) {
        const vals = hiddenInput.getAttribute('value');
        const jsonVals = JSON.parse(vals);
        amount = jsonVals.total.amount;
      } else {
        amount = res.total.amount;
      }
      

      // Re build if changed
      if (calledOnChange && amount !== latestAmt) {
        removeOld();
      }

      latestAmt = amount;

      // Above threshold
      if (amount > 78.99) {
        thresholdMessage(threshRef, 'afterend', 'Congratulations, your order has qualified for <span>free next day delivery <span class="truck"><img src="https://storage.googleapis.com/ucimagehost/do001/bluenextday.png" alt="Delivery truck"/></span> </span>'); // Needs positioning & styling
        events.send(settings.ID, 'DO002 Above Threshold', 'Above threshold message shown');
      }
  
      // If below threshold
      if (amount <= 78.99) {
        const diff = 79 - amount;
        thresholdMessage(threshRef, 'afterend', `Spend another £${diff ? diff : 79} for FREE next day delivery`, true); // Needs positioning & styling
        thresholdMessage(threshRef, 'afterend', '<span class="inline">Next Day Delivery £5.95</span> <span class="truck"><img src="https://storage.googleapis.com/ucimagehost/do001/bluenextday.png" alt="Delivery truck"/></span>'); // Needs positioning & styling
  
        // poll for tabs
        pollerLite(['.DO002-tabs'], () => {
          viewAll(document.querySelector('.DO002-tabs'), 'beforebegin');
        })
  
        events.send(settings.ID, 'DO002 Below Threshold', 'Below threshold message shown');
      }

    });

  };

  // Call initially.
  checkBasket();

  // This returns the countdown HTML
  getTime.then((res) => {
    let ref;
    pollerLite(['.DO002-thresholdMessage'], () => {
      if (document.querySelector('.DO002-thresholdMessage')) {
        ref = document.querySelector('.DO002-thresholdMessage');
      } else {
        ref = document.querySelector('ul.product--base-info');
      }
      ref.insertAdjacentHTML('afterend', res);
    });
  });

  // Add the tabs
  createTabs(ref, 'beforeend');

  // Monitor basket changes to update the messages
  const basket = document.querySelector('.container--ajax-cart');
  if (basket) {
    observer.connect(basket, () => {
      checkBasket(true);
    }, {
      config: {
        attributes: true,
        childList: false,
        subtree: false,
      }
    })
  }
};

export default activate;
