/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage, observer } from '../../../../../lib/utils';
 import { countdown } from './../../../../../lib/uc-lib';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;
let ctcHolder, slideInATB, bwishContainer;

const currDate = new Date();
const targetDate = new Date();
targetDate.setHours(20);
targetDate.setMinutes(0, 0, 0);

const fireAndLogEvent = (event) => {
  logMessage(event);
  fireEvent(event, true);
}

const initCountdown = () => {
  // set up the countdown timer
  countdown({
    cutoff: targetDate,
    element: `#${ID}-checkout-countdown`,
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

const scrollToEl = (el) => {
  if (el) {
    el.scrollIntoView({behavior: "auto", block: "center", inline: "nearest"});
  }
}

const startExperiment = () => {

  document.documentElement.classList.add(`${ID}-experiment-begins`);

  if(!document.getElementById('delivery_Nextday')) {
    fireEvent(`Interaction - this item is not eligible for next day delivery`);
    return;
  }

  let newATBSectionHTML = `

    <div class="${ID}-ctc-holder">
    
      <div class="${ID}-ctc-holder--inner">
        <p id="${ID}-product-details">MINT VELVET Grey Faux Fur Aviator Jacket, Size 10</p>

        <div class="${ID}-ctc-holder--buttons ${document.referrer == "" ? 'single-button' : ''}">
          ${document.referrer !== "" ? `<a href="${document.referrer}" id="${ID}-go-back-link" class="${ID}-go-back-link">Back to Browsing</a>` : ``}
          <a href="/cart" id="${ID}-go-to-bag" class="${ID}-go-to-bag">Go to your bag</a>
        </div>
      
      </div>
    
      <div class="${ID}-ctc-holder--countdown">
        <p> Checkout in <span id="${ID}-checkout-countdown">2h 50m 20s</span> for Next Day Delivery</p>
      </div>
    
    </div>
  
  
  `;

  bwishContainer = document.querySelector(`.BasketWishContainer`);
  bwishContainer.insertAdjacentHTML('afterend', newATBSectionHTML);
  ctcHolder = document.querySelector(`.${ID}-ctc-holder`);
  

  let slideInATBHTML = `
  
    <div class="${ID}-ctc-slide-in" id="${ID}-ctc-slide-in">Added to your bag <svg height="15px" width="15px" fill="#e10098" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><style type="text/css">.st0{fill:none;}</style><path class="st0" d="M26,26h48v48H26V26z"></path><path d="M33.3,71.3L11,49l-7.6,7.5l29.9,29.9l64.1-64.1l-7.5-7.5L33.3,71.3z"></path></svg></div>
  
  `;

  bwishContainer.querySelector('#aAddToBag').insertAdjacentHTML('beforeend', slideInATBHTML);
  slideInATB = document.getElementById(`${ID}-ctc-slide-in`);

  initCountdown();

  let atbButton = document.getElementById('aAddToBag');
  let allSizeButtons = document.querySelectorAll('#ulSizes li');

  if(VARIATION == 1) {
    atbButton.addEventListener('click', (e) => {
    
      let sizeSelected = false;
      let sizeSelectedName = "";
      if(allSizeButtons.length == 0) {
        // one size product
        sizeSelected = true;
      } else {
        [].slice.call(allSizeButtons).forEach((button) => {
          if(button.classList.contains('sizeVariantHighlight')) {
            sizeSelected = true;
            sizeSelectedName = button.innerText;
          }
        })
      }
  
      if(sizeSelected == true) {
  
        // update CTC holder with relevant details
  
        
  
        let productName = document.getElementById('lblProductBrand').innerText + " " + document.getElementById('lblProductName').innerText + ", Size " + sizeSelectedName;
        document.querySelector(`#${ID}-product-details`).innerText = productName;
  
        // user has selected a size, add to bag proceeding, show slide in and takeover.
        scrollToEl(document.querySelector(`.${ID}-ctc-holder--countdown`));
        ctcHolder.querySelector(`.${ID}-ctc-holder--inner`).classList.add('active');
        slideInATB.classList.add('active');
        bwishContainer.classList.add(`${ID}-ctc-active`);
      }
  
    });

    let allSizeButtonLinks = document.querySelector('#ulSizes li');

    observer.connect(allSizeButtonLinks, () => {

        if(document.querySelector('.popover.SelectSizePopover')) {
          document.querySelector('.popover.SelectSizePopover').remove();
        }

        ctcHolder.querySelector(`.${ID}-ctc-holder--inner`).classList.remove('active');
        slideInATB.classList.remove('active');
        bwishContainer.classList.remove(`${ID}-ctc-active`);
      
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
        subtree: true,
      },
    });

    if(document.querySelector('#ulColourImages')) {
      let allColourButtonLinks = document.querySelector('#ulColourImages li');

      observer.connect(allColourButtonLinks, () => {
  
          ctcHolder.querySelector(`.${ID}-ctc-holder--inner`).classList.remove('active');
          slideInATB.classList.remove('active');
          bwishContainer.classList.remove(`${ID}-ctc-active`);
        
      }, {
        throttle: 200,
        config: {
          attributes: true,
          childList: false,
          subtree: true,
        },
      });
    }
    

    let goToBagButton = document.getElementById(`${ID}-go-to-bag`);
    goToBagButton.addEventListener('click', (e) => {
      fireAndLogEvent('Click - go to bag button clicked');
    });

    let goBackButton = document.getElementById(`${ID}-go-back-link`);
    goBackButton.addEventListener('click', (e) => {
      fireAndLogEvent('Click - go back to browsing button clicked');
    });
  }
  

  


}

const addEvents = () => {

  let atbButton = document.getElementById('aAddToBag');
  let allSizeButtons = document.querySelectorAll('#ulSizes li');

  atbButton.addEventListener('click', (e) => {
    
    let sizeSelected = false;
    let sizeSelectedName = "";
    if(allSizeButtons.length == 0) {
      // one size product
      sizeSelected = true;
    } else {
      [].slice.call(allSizeButtons).forEach((button) => {
        if(button.classList.contains('sizeVariantHighlight')) {
          sizeSelected = true;
          sizeSelectedName = button.innerText;
        }
      })
    }

    if(sizeSelected == true) {
      // update CTC holder with relevant details
      let productName = document.getElementById('lblProductBrand').innerText + " " + document.getElementById('lblProductName').innerText + ", Size " + sizeSelectedName;
      fireAndLogEvent(`Click - user has clicked ATB to add: ${productName} to their basket${VARIATION != "control" ? `, element shown` : `, control so nothing shown`}`);
    }

  });


}

export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  if(document.querySelector('#aAddToBag .addToBagInner').classList.contains('isPreOrderable')) {
    fireAndLogEvent('Interaction - item is pre-orderable so is skipped for the purposes of this test');
    return;
  }

  addEvents();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  startExperiment();
};
