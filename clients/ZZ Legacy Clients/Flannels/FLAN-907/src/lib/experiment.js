/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage, pollerLite } from '../../../../../lib/utils';
 import { countdown } from './../../../../../lib/uc-lib';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;
const targetDate = new Date();
targetDate.setHours(21);
targetDate.setMinutes(0, 0, 0);

const initCountdown = () => {
  // set up the countdown timer
  countdown({
    cutoff: targetDate,
    element: `.${ID}-checkout-countdown`,
    labels: {
      d: 'days',
      h: 'h',
      m: 'm',
      s: 's',
    },
    zeroPrefixHours: true,
    zeroPrefixMinutes: true,
    zeroPrefixSeconds: true,
    hoursInsteadOfDays: false,
    delivery: {
      deliveryDays: null,
      excludeDays: null,
      deliveryDayElement: null,
      tomorrowLabel: false,
      showFullDate: false,
      dayLabelStyle: 'long',
      monthLabelStyle: 'long',
    },
  });

}

const startExperiment = (placement) => {

  let thePlacement = placement;

  logMessage("starting experiment - placement: "+thePlacement);

  document.documentElement.classList.add(`${ID}-experiment-begins`);
  document.documentElement.classList.add(`${ID}-${thePlacement}`);
  
  let newATBSectionHTML = `

    <div class="${ID}-ctc-holder ${ID}-${thePlacement}">
    
      <div class="${ID}-ctc-holder--countdown">
        <div class="${ID}-ctc-holder--countdowninner">
          <h3>DELIVERY AS SOON AS TOMORROW</h3>
          <p> Get next day delivery, checkout within </p>
          <span id="${ID}-checkout-countdown" class="${ID}-checkout-countdown">2h 50m 20s</span>
        </div>
      </div>
    
    </div>
  
  
  `;

  let insertionPoint = "";
  
  if(thePlacement == "productpage") {
    insertionPoint = document.querySelector('.BasketWishContainer');
    
  } else if(thePlacement == "cart") {
    insertionPoint = document.querySelector('#buttonWrapper');
  } else {
    insertionPoint = document.querySelector('#divButtons');
  }

  insertionPoint.insertAdjacentHTML('afterend', newATBSectionHTML);
  fireEvent(`Visible - countdown timer added to page: ${thePlacement}`, true);
  initCountdown();

}

const addEvents = () => {

  document.body.addEventListener('click', (e) => {
    if(e.target.closest('.ContinueOn') && window.location.href.indexOf('/cart') > - 1) {
      let preOrder = false;
      let allPreOrderLines = document.querySelectorAll('.preorder');
      allPreOrderLines.forEach((line) => {
        if(line.innerText !== "") {
          preOrder = true;
        }
      });

      if(preOrder == false) {
        fireEvent('Click - continue shopping button clicked on Cart Page', true);
      }
      
      
    } else if(e.target.closest('#aCheckout')) {
      fireEvent('Click - checkout button clicked on Mini-Bag', true);
    } else if(e.target.closest('#aViewBag')) {
      fireEvent('Click - view bag button clicked on Mini-Bag', true);
    } 
    
  });

  if(document.body.classList.contains('ProdDetails') && !document.querySelector('#aAddToBag .addToBagInner').classList.contains('isPreOrderable')) {
    let atbButton = document.getElementById('aAddToBag');
    atbButton.addEventListener('click', () => {
      fireEvent('Click - add to bag button clicked on Product Page', true);
    });
    
  }

}

export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  addEvents();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  if(document.body.classList.contains('ProdDetails') && !document.querySelector('#aAddToBag .addToBagInner').classList.contains('isPreOrderable')) {
    startExperiment('productpage');
  }

  if(window.location.href.indexOf('cart') > -1) {
    let preOrder = false;
    let allPreOrderLines = document.querySelectorAll('.preorder');
    allPreOrderLines.forEach((line) => {
      if(line.innerText !== "") {
        preOrder = true;
      }
    });

    if(preOrder == false) {
      startExperiment('cart');
    }
    
  }

  pollerLite(['#bagQuantity'], () => {
    setTimeout(() => {
      let bagQuantity = document.getElementById('bagQuantity').innerText;
      if(parseInt(bagQuantity) > 0) {
        startExperiment('mini-bag');
      }
    }, 500);
    

  });
  
};
