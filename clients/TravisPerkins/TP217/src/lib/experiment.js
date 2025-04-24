/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { getCookie } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const checkPostCodeAgainstDarkStores = () => {
  let dontShowChanges = false;
  const enteredPostCode = document
    .querySelector('[data-test-id="address-description"]')
    .innerText
    .split(' ')[0];

  const darkStorePostCodes = [
    'B63',
    'B64',
    'B65',
    'B69',
    'DY1',
    'DY2',
    'DY3',
    'DY4',
    'DY5',
    'DY6',
    'DY7',
    'DY8',
    'WV14',
    'WV2',
    'WV3',
    'WV4',
    'WV5',
  ];

  darkStorePostCodes.forEach((postcode) => {
    if (enteredPostCode === postcode) {
      dontShowChanges = true;
    }
  });
  return dontShowChanges;
};

const init = () => {
  const componentAlreadyExists = false; 

  if (componentAlreadyExists) {
    return;
  }

  if(checkPostCodeAgainstDarkStores()) {
    return;
  }

  // Experiment Code...
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  /**
   * Helper insert message
   */
  const insertMessage = (prod, msg, preHtml) => {
    const quantitySelector = prod.querySelector(
      '[data-test-id="qty-selector"]',
    ).parentElement.parentElement;
    quantitySelector.insertAdjacentHTML(
      'afterend',
      `${preHtml}<div class="deliveryMessage">${msg}</div>`,
    );

    const button = prod.querySelector('.xblviewprod');
    if(button) {
      button.addEventListener('click', () => {
        fireEvent('View Product button clicked');
      });
    }
  };

  const removeButtons = (p) => {
    const elm = p.querySelector(
      '[data-test-id="add-to-delivery-btn"]',
    )?.parentElement?.parentElement;

    if(elm) {
      elm.style.display = 'none';
    }
  };

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  const products = [].forEach.call(document.querySelectorAll('[data-test-id="product"]'), (p) => {
    if(
      p.querySelector(
        '[data-test-id="collection-availability-message"]'
      )?.innerHTML?.match?.(/Select type/i)
    ) {
      return;
    }

    if (
      p.querySelector(
        '[data-test-id="primary-btn"] span'
      )?.innerHTML?.match?.(/Add for hire/i)
    ) {
      return;
    }

    const postcode = getCookie('preselectedDeliveryPostcode');

    const delivery = !p.querySelector('[data-test-id="add-to-delivery-btn"]')?.disabled;
    const collection = !p.querySelector('[data-test-id="add-to-collection-btn"]')?.disabled;

    let msg = '';
    let instock = '';

    const collectionMsg = p.querySelector('[data-test-id="collection-availability-message"]');
    if(collectionMsg) {
      const m = collectionMsg.title.match(/(\d+) available/);
      if(m && m[1]) {
        instock = '(' + m[1] + ' in stock)';
      }
    }

    if(!postcode) {
      msg = `Enter postcode for delivery and collection options`;
    } else if(delivery && collection) {
      msg = `Delivery and collection available ${instock}`;
    } else if(delivery && !collection) {
      msg = `Delivery available`;
    } else if(!delivery && collection) {
      msg = `Collection available ${instock}`;
    } else if(!delivery && !collection) {
      msg = `Not available for collection or delivery`;
    }

    p.querySelector('.deliveryMessage')?.remove?.();
    p.querySelector('.blxbwrap')?.remove?.();

    const productUrl = p.querySelector('a[href]');

    const viewProductHtml = `
      <div class="OrderButtons__ButtonWrapper blxbwrap">
        <button id="viewProductButton" class="xblviewprod" onclick="location.href='${productUrl}';">
        <span color="text-default">View Product</span>
        </button>
      </div>
    `;

    removeButtons(p);

    if(shared.VARIATION == 2) {
      insertMessage(p, msg, viewProductHtml);
    } else {
      insertMessage(p, msg, '');
    }
  });
}

export default () => {
  setTimeout(() => {
    init();
  }, 2500);

  if(window.TP217observer) {
    return;
  }

  // Poll and re-run init
  pollerLite([
    '#app-container',
  ], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    let throttleTimeout = null;

    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if(
          mutation.target 
          && (
            mutation.target.getAttribute('data-test-id') == 'plp-list'
            ||
            mutation.target.getAttribute('data-test-id') == 'plp-wrapper'
            || 
            (Array.from((mutation.removedNodes || [])).filter(n => /ProductList__/.test(n.className)).length > 0)
          ) 
        ) {
          clearTimeout(throttleTimeout);
          throttleTimeout = setTimeout(() => {
            init();
          }, 1800);
        }

        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          document.body.classList.remove(`${shared.ID}`);

          setTimeout(() => {
            // -----------------------------------
            // Timeout ensures router has started to rebuild DOM container
            // and we don't fire init() too early
            // -----------------------------------
            init();
          }, 2000);
        }
      });
    });

    window.TP217observer = observer;

    const config = {
        childList: true,
        subtree: true
    };

    observer.observe(appContainer, config);
  });
};
