/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import checkDeliveryTime from './helpers/checkDeliveryTime';
import { getReactStoreData, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;

const DOM_RENDER_DELAY = 2000;

const clockIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
<path d="M12.5 21.5C17.4706 21.5 21.5 17.4706 21.5 12.5C21.5 7.52944 17.4706 3.5 12.5 3.5C7.52944 3.5 3.5 7.52944 3.5 12.5C3.5 17.4706 7.52944 21.5 12.5 21.5Z" fill="#DFE0E0"/>
<path d="M12.5 21.5C17.4706 21.5 21.5 17.4706 21.5 12.5C21.5 7.52944 17.4706 3.5 12.5 3.5C7.52944 3.5 3.5 7.52944 3.5 12.5C3.5 17.4706 7.52944 21.5 12.5 21.5Z" stroke="#0053A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.5 8.5V13.5H16.5" stroke="#0053A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const prodSkuAvailabilityRules = {
  'out-of-stock': {
    'out-of-stock-sfx-delivery': '',
    'out-of-stock-dsv-delivery': '',
  },
  unknown: {
    'out-of-stock-sfx-delivery': '',
    'out-of-stock-dsv-delivery': '',
    'instock-sfx-delivery': '',
    'instock-dsv-delivery': '',
  },
  closed: {
    'out-of-stock-sfx-delivery': '',
    'out-of-stock-dsv-delivery': '',
    'instock-sfx-delivery': 'Order in <span class="countdown-timer"></span> for next day delivery or click and collect tomorrow.',
    'instock-dsv-delivery': '',
  },
  'cc-same-day': {
    'out-of-stock-sfx-delivery': '',
    'out-of-stock-dsv-delivery': '',
    'instock-sfx-delivery': '',
    'instock-dsv-delivery': '',
    unknown: '',
  },
  'cc-next-day': {
    'out-of-stock-sfx-delivery': 'Order in <span class="countdown-timer"></span> to click and collect tomorrow.',
    'out-of-stock-dsv-delivery': 'Order in <span class="countdown-timer"></span> to click and collect tomorrow.',
    'instock-sfx-delivery': 'Order in <span class="countdown-timer"></span> for next day delivery or click and collect tomorrow.',
    'instock-dsv-delivery': '',
    unknown: 'Order in <span class="countdown-timer"></span> to click and collect tomorrow.',
  },
};

const deliveryMessage = (msg) => {
  const htmlStr = `
  
  <div class="${ID}__delivery-message">
    <span class="${ID}__delivery-message-icon">${clockIcon}</span>
    <p class="${ID}__delivery-message-text">${msg}</p>
  </div>
  `;
  return htmlStr;
};

let intervalId;

const startTimer = () => {
  //const remainingTime = checkDeliveryTime();
  intervalId = setInterval(() => {
    const remaining = checkDeliveryTime();
    if (remaining <= 0) {
      clearInterval(intervalId);
    } else {
      const remainingHours = Math.floor(remaining / (1000 * 60 * 60))
        .toString()
        .padStart(2, '0');
      const remainingMinutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
        .toString()
        .padStart(2, '0');
      const remainingSeconds = Math.floor((remaining % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, '0');

      const timerElement = document.querySelector('.countdown-timer');
      if (timerElement) {
        timerElement.textContent = `${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;
      }
    }
  }, 1000);
};

const init = () => {
  getReactStoreData();
  const { pageType } = window.blDataLayer;

  if (pageType !== 'pdp') {
    return;
  }
  fireEvent('Conditions Met');
  if (VARIATION === 'control') return;

  const pageData = window.utag.data;
  const { prodSkuAvailabilityCollection, prodSkuAvailabilityDelivery } = pageData;

  //console.log('delivery options', prodSkuAvailabilityCollection, prodSkuAvailabilityDelivery);

  const collectionStatus =
    typeof prodSkuAvailabilityCollection === 'string' ? prodSkuAvailabilityCollection : prodSkuAvailabilityCollection[0];
  const deliveryStatus =
    typeof prodSkuAvailabilityDelivery === 'string' ? prodSkuAvailabilityDelivery : prodSkuAvailabilityDelivery[0];

  console.log('prodSkuAvailabilityCollection:', collectionStatus);
  console.log('prodSkuAvailabilityDelivery:', deliveryStatus);

  const finalMesg = prodSkuAvailabilityRules[collectionStatus || 'unknown'][deliveryStatus || 'unknown'];
  //console.log('🚀 ~ init ~ finalMesg:', finalMesg);
  //fireEvent('Conditions Met');
  if (!finalMesg) return;
  //check if mobile device
  const isMobile = window.innerWidth < 640;
  const attachpoint = isMobile
    ? document.querySelector('[data-qaid="product-price"]')
    : document.querySelector('[data-qaid="pdp_sticky_product_footer"] > div');
  const existingMessage = document.querySelectorAll(`.${ID}__delivery-message`);
  if (existingMessage.length) {
    existingMessage.forEach((msg) => msg.remove());
  }

  attachpoint.insertAdjacentHTML(`${isMobile ? 'beforebegin' : 'afterend'}`, deliveryMessage(finalMesg));
  startTimer();
};

export default () => {
  setup();
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }

  /*****Request from Screwfix*****/

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest('[data-qaid="pdp-button-deliver"]')) {
      fireEvent('Delivery Button Clicked');
    } else if (target.closest('[data-qaid="pdp-button-click-and-collect"]')) {
      fireEvent('c&c Button Clicked');
    }
  });

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(['#__next', '#__NEXT_DATA__', () => window.__NEXT_DATA__ !== undefined], () => {
      //remove existing message

      clearInterval(intervalId);
      setTimeout(init, DOM_RENDER_DELAY);
    });
  });
};
