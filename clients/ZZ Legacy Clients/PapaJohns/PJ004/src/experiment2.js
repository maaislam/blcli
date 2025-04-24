/* eslint-disable */
import * as exp from './lib/experiment';
import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
	
window.UC = window.UC || {};
window.UC.experiments = window.UC.experiments || [];
window.UC.experiments['PJ004'] = {};
window.UC.experiments['PJ004'].pollers = [];

const isMobile = window.innerWidth < 768;

/**
 * Entry point for running experiment
 */
function activate() {
	document.body.classList.add('PJ004');

  // ------------------------------------------------------------------
  // MOBILE
  // ------------------------------------------------------------------
  if(isMobile) {
    exp.matchBasketItemsToPageItemsMobile();
    exp.addLabel();
    let basketHiddenValue = document.getElementById('hdnBasketValue').value;
		const basketVal = setInterval(() => {
			const basketValue = document.getElementById('hdnBasketValue').value; 
			if (basketValue != basketHiddenValue) {
				basketHiddenValue = basketValue;

        utils.destroyPollers('PJ004');

        // Remove labels
        const labels = document.querySelectorAll('.PJ4-inBasket_label');
        for (let i = 0; i < labels.length; i++) {
          const element = labels[i];
          element.remove();
        }

        // Update quantities back to zero
        [].forEach.call(document.querySelectorAll('[pj4-amount]'), (item) => {
            item.removeAttribute('pj4-amount');
        });

        exp.matchBasketItemsToPageItemsMobile();
        exp.addLabel();
        
        // Send an event to show that the bsaket was refreshed
				utils.events.send(
          'PJ004 Mobile',
          'Message shown on basket refresh',
          'PJ004 message has been shown on basket refresh',
          {
            sendOnce: true
          }
        );
			}
		}, 400);

    /*UC.observer.connect(document.getElementById('ctl00__objHeader_upHeaderSummary'), function() {
      exp.matchBasketItemsToPageItemsMobile();
      exp.addLabel();	
    }, {
      config: {attributes: true, childList: true, subtree: false},
      throttle: 1000 
    });*/
   //  
   // });
  // window.UC.experiments['PJ004'].pollers.push(mobileBasketPoller);
  }

  // ------------------------------------------------------------------
  // DESKTOP
  // ------------------------------------------------------------------
	if(!isMobile){
    exp.matchBasketItemsToPageItemsDesktop();
    exp.addLabel();

		let basketHiddenValue = document.getElementById('hdnBasketValue').value;
		const basketVal = setInterval(() => {
			const basketValue = document.getElementById('hdnBasketValue').value; 
			if (basketValue != basketHiddenValue) {
				basketHiddenValue = basketValue;

        utils.destroyPollers('PJ004');

        // Remove labels
        const labels = document.querySelectorAll('.PJ4-inBasket_label');
        for (let i = 0; i < labels.length; i++) {
          const element = labels[i];
          element.remove();
        }

        // Update quantities back to zero
        [].forEach.call(document.querySelectorAll('[pj4-amount]'), (item) => {
            item.removeAttribute('pj4-amount');
        });

        exp.matchBasketItemsToPageItemsDesktop();
        exp.addLabel();
        
        // Send an event to show that the bsaket was refreshed
				utils.events.send(
          'PJ004',
          'Message shown on basket refresh',
          'PJ004 message has been shown on basket refresh',
          {
            sendOnce: true
          }
        );
			}
		}, 400);
  }
  
  // ------------------------------------------------------------------
  // Event Tracking
  // ------------------------------------------------------------------
  document.querySelector('.omnibarMenu .basket').addEventListener('click', () => {
    utils.events.send('PJ004', 'basket click', 'PJ004 basket dropdown clicked', {sendOnce: true});
  });
}

// ------------------------------------------------------------------
// Poll Elements
// ------------------------------------------------------------------
const triggers = ((options) => {
  UC.poller([
    '#aspnetForm',
    '.addressText',
    '.omnibarMenu .basket',
    '#ctl00__objHeader_upBasketNotification',
  ], () => {
    utils.fullStory('PJ004', 'Variation 1');
    activate();
  });
})();
