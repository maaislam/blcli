/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage, observer, pollerLite } from '../../../../../lib/utils';
 import { countdown } from './../../../../../lib/uc-lib';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;
let ctcHolder, slideInATB;

const currDate = new Date();
const targetDate = new Date();
targetDate.setHours(21);
targetDate.setMinutes(0, 0, 0);

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

  let currHref = window.location.href;
  let referrerHref = document.referrer;

  let newATBSectionHTML = `

    <div class="${ID}-ctc-holder">
    
      <div class="${ID}-ctc-holder--inner">
        <p id="${ID}-product-details" class="${ID}-product-details">MINT VELVET Grey Faux Fur Aviator Jacket, Size 10</p>

        <div class="${ID}-ctc-holder--buttons ${document.referrer == "" ? 'single' : ''}">
          ${document.referrer !== "" ? `<a href="${document.referrer}" id="${ID}-go-back-link" class="${ID}-go-back-link">Back to Browsing</a>` : ``}
          <a href="/cart" id="${ID}-go-to-bag" class="${ID}-go-to-bag">Go to your bag</a>
        </div>
      
      </div>
    
      <div class="${ID}-ctc-holder--countdown">
        <div class="${ID}-ctc-holder--countdowninner">
          <h3>GET YOUR ORDER WITHIN 2 DAYS</h3>
          <p> If you checkout within <span id="${ID}-checkout-countdown">2h 50m 20s</span></p>
        </div>
      </div>
    
    </div>
  
  
  `;

  let insertionPoint = document.querySelector('.BasketWishContainer');
  insertionPoint.insertAdjacentHTML('afterend', newATBSectionHTML);
  ctcHolder = document.querySelector(`.${ID}-ctc-holder`);

  let slideInATBHTML = `
  
    <div class="${ID}-ctc-slide-in" id="${ID}-ctc-slide-in">Added to your bag </div>
  
  `;

  insertionPoint.querySelector('#aAddToBag').insertAdjacentHTML('beforeend', slideInATBHTML);
  slideInATB = document.getElementById(`${ID}-ctc-slide-in`);

  initCountdown();

  let atbButton = document.getElementById('aAddToBag');
  let sizeSelector = document.getElementById('sizeDdl');
  let allSizeButtons = document.querySelectorAll('#sizeDdl option');

  if(VARIATION == 1) {
    atbButton.addEventListener('click', (e) => {
    
      let sizeSelected = false;
      let sizeSelectedName = "";
      if(!sizeSelector) {
        // one size product
        sizeSelected = true;
      } else {
        if(sizeSelector.value != 0) {
          sizeSelected = true;
          sizeSelectedName = sizeSelector.options[sizeSelector.selectedIndex].innerText;
        } 
        
  
      }
  
      if(sizeSelected == true) {
  
        // update CTC holder with relevant details
  
        let productHTML = `
          <p class="${ID}-prod-brand">${document.getElementById('lblProductBrand').innerText}</p>
          <p class="${ID}-prod-name">${document.getElementById('lblProductName').innerText}</p>
        `;
        
        document.querySelector(`#${ID}-product-details`).innerHTML = productHTML;
  
        // user has selected a size, add to bag proceeding, show slide in and takeover.
        scrollToEl(document.querySelector(`.${ID}-ctc-holder`));
        ctcHolder.querySelector(`.${ID}-ctc-holder--inner`).classList.add('active');
        slideInATB.classList.add('active');
  
      }
  
    });
  
    pollerLite(['#sizeDdl'], () => {
      let sizeDDL = document.getElementById('sizeDdl');
  
      observer.connect(sizeDDL, () => {
          ctcHolder.querySelector(`.${ID}-ctc-holder--inner`).classList.remove('active');
          slideInATB.classList.remove('active');
        
      }, {
        throttle: 200,
        config: {
          attributes: true,
          childList: false,
          subtree: true,
        },
      });
    });
    
    pollerLite(['#ddlColours'], () => {
      let colourDDL = document.getElementById('ddlColours');
  
      observer.connect(colourDDL, () => {
          ctcHolder.querySelector(`.${ID}-ctc-holder--inner`).classList.remove('active');
          slideInATB.classList.remove('active');
      }, {
        throttle: 200,
        config: {
          attributes: true,
          childList: false,
          subtree: true,
        },
      });
  
    });
  }
 

  let goToBagButton = document.getElementById(`${ID}-go-to-bag`);
  goToBagButton.addEventListener('click', (e) => {
    fireEvent('Click - go to bag button clicked');
  });

  let goBackButton = document.getElementById(`${ID}-go-back-link`);
  goBackButton.addEventListener('click', (e) => {
    fireEvent('Click - go back to browsing button clicked');
  });

  if(currDate > targetDate) {
    ctcHolder.querySelector(`.${ID}-ctc-holder--countdown`).remove();
    fireEvent('Interaction - user has added to basket but is outwith the free delivery cutoff time');
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
      fireEvent(`Click - user has clicked ATB to add: ${productName} to their basket${VARIATION != "control" ? `, element shown` : `, control so nothing shown`}`);
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
    fireEvent('Interaction - item is pre-orderable so is skipped for the purposes of this test');
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
