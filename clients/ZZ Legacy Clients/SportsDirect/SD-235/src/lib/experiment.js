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
import { countdown, pollerLite } from './../../../../../lib/uc-lib';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

let ctcHolder, slideInATB;

const currDate = new Date();
const targetDate = new Date();
targetDate.setHours(19);
targetDate.setMinutes(0, 0, 0);

const fireAndLogEvent = (event) => {
  logMessage(event);
  fireEvent(event, true);
};

const initCountdown = () => {
  // set up the countdown timer
  countdown({
    cutoff: targetDate,
    element: `#${ID}-checkout-countdown`,
    labels: {
      d: 'days',
      h: ':',
      m: ':',
      s: ' ',
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
};

const scrollToEl = (el) => {
  if (el) {
    el.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'nearest' });
  }
};

const startExperiment = () => {
  document.documentElement.classList.add(`${ID}-experiment-begins`);

  let newATBSectionHTML = `

    <div class="${ID}-ctc-holder">
    
      <div class="${ID}-ctc-holder--inner">
        <p id="${ID}-product-details"> 1x MINT VELVET Grey Faux Fur Aviator Jacket </p>

        <div class="${ID}-ctc-holder--countdown">
            <div class="countdownText">
              <p class="nextDayDelivery">NEXT DAY DELIVERY</p>
              <P class="getItTomorrow">Get it tomorrow if ordered by 7pm today</P>    
            </div>
            <div class="countdownBox">
            <svg width="50" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68.03 29.48"><defs style="
"><style>.cls-1{fill:#fff;}</style></defs><g id="DELIVERY-ICON"><g id="Path_350" data-name="Path 350"><path d="M117.28,66.23H81.92v-23h35.36v23Z" transform="translate(-64.82 -42.24)"></path><path d="M117.28,67.27H80.88v-25h37.44v25ZM83,65.19h33.29V44.32H83Z" transform="translate(-64.82 -42.24)"></path></g><g id="Path_351" data-name="Path 351"><path d="M132.85,67.27H116.24v-18h10.39L132.85,56Zm-14.53-2.08h12.45V56.8l-5-5.46h-7.41Z" transform="translate(-64.82 -42.24)"></path></g><g id="Ellipse_12" data-name="Ellipse 12"><circle class="cls-1" cx="22.72" cy="24.92" r="3.51"></circle><path d="M87.53,71.72a4.56,4.56,0,1,1,4.55-4.55A4.57,4.57,0,0,1,87.53,71.72Zm0-7A2.48,2.48,0,1,0,90,67.17,2.48,2.48,0,0,0,87.53,64.69Z" transform="translate(-64.82 -42.24)"></path></g><g id="Path_969" data-name="Path 969"><path class="cls-1" d="M126.18,63.65a3.52,3.52,0,1,1-3.51,3.51,3.51,3.51,0,0,1,3.51-3.51Z" transform="translate(-64.82 -42.24)"></path><path d="M126.18,71.72a4.56,4.56,0,1,1,4.55-4.55A4.56,4.56,0,0,1,126.18,71.72Zm0-7a2.48,2.48,0,1,0,2.47,2.48A2.48,2.48,0,0,0,126.18,64.69Z" transform="translate(-64.82 -42.24)"></path></g><g id="Line_336" data-name="Line 336"><rect class="cls-1" x="17.1" y="18.03" width="35.13" height="2.08"></rect></g><g id="Line_337" data-name="Line 337"><rect x="6.56" y="3.98" width="7.96" height="2.08"></rect></g><g id="Line_338" data-name="Line 338"><rect x="3.28" y="9.6" width="11.24" height="2.08"></rect></g><g id="Line_339" data-name="Line 339"><rect y="15.22" width="14.52" height="2.08"></rect></g></g></svg>
            <p><span id="${ID}-checkout-countdown">2h 50m 20s</p>
            </div>
        </div>
        <div class="${ID}-ctc-holder--buttons">
          <a href="/cart" id="${ID}-go-back-link" class="${ID}-go-back-link">View Bag</a>
          <a href="/checkoutsp" id="${ID}-go-to-bag" class="${ID}-go-to-bag">Continue to Checkout</a>
        </div>
      
      </div>
    </div>
  
  
  `;

  let insertionPoint = document.querySelector('.addToBasketContainer');
  insertionPoint.insertAdjacentHTML('beforeend', newATBSectionHTML);
  ctcHolder = document.querySelector(`.${ID}-ctc-holder`);

  let slideInATBHTML = `
  
    <div class="${ID}-ctc-slide-in" id="${ID}-ctc-slide-in"><svg height="15px" width="15px" fill="#000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><style type="text/css">.st0{fill:none;}</style><path class="st0" d="M26,26h48v48H26V26z"></path><path d="M33.3,71.3L11,49l-7.6,7.5l29.9,29.9l64.1-64.1l-7.5-7.5L33.3,71.3z"></path></svg> Added to your bag</div>
  
  `;

  insertionPoint.querySelector('span#sAddToBagWrapper > a').insertAdjacentHTML('beforeend', slideInATBHTML);
  slideInATB = document.getElementById(`${ID}-ctc-slide-in`);

  initCountdown();

  let atbButton = document.querySelector('#aAddToBag');
  let allSizeButtons = document.querySelectorAll('#ulSizes li');

  const targetNode = document.querySelector('.s-productextras-column-2 #ulSizes');

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (const mutation of mutationsList) {
      //console.log(mutation);
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName == 'class' &&
        mutation.target.classList.contains('sizeVariantHighlight')
      ) {
        document.querySelectorAll('#ulSizes li').forEach((element) => {
          if (element.classList.contains('sizeVariantHighlight')) {
            if (document.querySelector('#aAddToBag').classList.contains('hiddenback')) {
              document.querySelector('#aAddToBag').classList.remove('hiddenback');
            }
            if (document.querySelector('.addToBasketContainer').classList.contains('addBorder')) {
              document.querySelector('.addToBasketContainer').classList.remove('addBorder');
            }
          }
        });
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observerNode = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observerNode.observe(targetNode, config);

  atbButton &&
    atbButton.addEventListener('click', (e) => {
      let sizeSelected = false;
      let sizeSelectedName = '';
      if (allSizeButtons.length == 0) {
        // one size product
        sizeSelected = true;
      } else {
        [].slice.call(allSizeButtons).forEach((button) => {
          if (button.classList.contains('sizeVariantHighlight')) {
            sizeSelected = true;
            sizeSelectedName = button.innerText;
          }
        });
      }

      if (sizeSelected == true) {
        // update CTC holder with relevant details
        let productName;
        if (document.querySelector('#ProductQty')) {
          productName =
            document.querySelector('#ProductQty').value +
            'x  ' +
            document.getElementById('lblProductBrand').innerText +
            ' ' +
            document.getElementById('lblProductName').innerText +
            '      Size: ' +
            sizeSelectedName;
        } else {
          productName =
            document.getElementById('lblProductBrand').innerText +
            document.getElementById('lblProductName').innerText +
            '      Size: ' +
            sizeSelectedName;
        }

        document.querySelector(`#${ID}-product-details`).innerText = productName;
        // user has selected a size, add to bag proceeding, show slide in and takeover.
        scrollToEl(document.querySelector(`.${ID}-ctc-holder`));
        document.querySelector('#aAddToBag').classList.add('hiddenback');
        document.querySelector('.addToBasketContainer').classList.add('addBorder');
        ctcHolder.classList.add('active');
        slideInATB.classList.add('active');
        fireEvent(`click- message shown`);
      }
    });

  let allSizeButtonLinks = document.querySelector('#ulSizes li');

  observer.connect(
    allSizeButtonLinks,
    () => {
      if (document.querySelector('.popover.SelectSizePopover')) {
        document.querySelector('.popover.SelectSizePopover').remove();
      }

      ctcHolder.classList.remove('active');
      slideInATB.classList.remove('active');
    },
    {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
        subtree: true,
      },
    }
  );

  let goToBagButton = document.getElementById(`${ID}-go-to-bag`);
  goToBagButton.addEventListener('click', (e) => {
    fireAndLogEvent('Click - Continue to checkout clicked ');
  });

  let goBackButton = document.getElementById(`${ID}-go-back-link`);
  goBackButton.addEventListener('click', (e) => {
    fireAndLogEvent('Click - Continue to bag clicked');
  });
};
const addEvents = () => {
  let atbButton = document.getElementById('aAddToBag');
  let allSizeButtons = document.querySelectorAll('#ulSizes li');

  atbButton &&
    atbButton.addEventListener('click', (e) => {
      let sizeSelected = false;
      let sizeSelectedName = '';
      if (allSizeButtons.length == 0) {
        // one size product
        sizeSelected = true;
      } else {
        [].slice.call(allSizeButtons).forEach((button) => {
          if (button.classList.contains('sizeVariantHighlight')) {
            sizeSelected = true;
            sizeSelectedName = button.innerText;
          }
        });
      }

      if (sizeSelected == true) {
        // update CTC holder with relevant details
        let productName =
          document.getElementById('lblProductBrand').innerText +
          ' ' +
          document.getElementById('lblProductName').innerText +
          ', Size ' +
          sizeSelectedName;
        fireAndLogEvent(
          `Click - user has clicked ATB to add: ${productName} to their basket${
            VARIATION != 'control' ? `, element shown` : `, control so nothing shown`
          }`
        );
      }
    });
};
export default () => {
  setup();
  logMessage(ID + ' Variation: ' + VARIATION);
  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // if (
  //   document.querySelector('#aAddToBag .addToBagInner') &&
  //   document.querySelector('#aAddToBag .addToBagInner').classList.contains('isPreOrderable')
  // ) {
  //   fireAndLogEvent('Interaction - item is pre-orderable so is skipped for the purposes of this test');
  //   return;
  // }

  addEvents();

  document.querySelector('#aAddToBag') &&
    document.querySelector('#aAddToBag').addEventListener('click', (e) => {
      if (document.querySelector('#NonBuyableOverlay')) {
        fireEvent(`click- added to bag`);
      }
    });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...
  pollerLite(['body', '#productVariantAndPrice', '.addToBasketContainer'], () => {
    if (
      document.querySelector('#imgProductSash').getAttribute('src') !=
        'https://images.sportsdirect.com/images/sash/GBP/productsash_PreOrder.png' &&
      document.querySelector('#lblProductName').innerText != 'E Voucher Gift Card'
    ) {
      startExperiment();
    }
  });
};
