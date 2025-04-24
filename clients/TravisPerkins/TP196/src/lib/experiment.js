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

const { ID, VARIATION } = shared;

const runChanges = () => {
  const mainPriceElm = document.querySelector('[data-test-id="main-price"]');
  if (mainPriceElm) {
    const priceNumber = mainPriceElm.innerText.replace('£', '').replace('EX VAT', '').replace('INC VAT', '').replace('PER PACK', '').replace('EACH', '').replace(',','');
    if(priceNumber > 150) {
      const markup = `
        <div class="${shared.ID}__free-delivery">
          <img src="http://sb.monetate.net/img/1/581/3479081.png"/>
          <div><span>FREE DELIVERY</span> with this product</div>
        </div>
      `;
      const orderButtonsWrapper = document.querySelector('[class^="OrderButtons__Wrapper"]');
      if (orderButtonsWrapper) {
        orderButtonsWrapper.insertAdjacentHTML('beforebegin', markup);
        fireEvent('Seen message');
      };
    };
  };
};

const init = () => {
  const componentAlreadyExists = false; 

  if (componentAlreadyExists) {
    return;
  }

  // Experiment Code...
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const loggedIn = sessionStorage.getItem('loggedIn');
  if (loggedIn === 'No') {
    runChanges();
  }; 
}

export default () => {

  pollerLite([
    `[class^="OrderButtons__AvailabilityMessage"]`
  ], () => {
    setTimeout( () => {
      const deliveryMessage = document.querySelector(`[class^="OrderButtons__AvailabilityMessage"]`);
      const deliveryText = deliveryMessage.innerText;
      if (!deliveryMessage.innerText.includes('Unavailable')) {
        init();
      }
    }, 2000)
  })

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
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
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

    const config = {
        childList: true,
        subtree: true
    };

    // observer.observe(appContainer, config);
  });
};
