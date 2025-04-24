/**
 * PJ081 - Forced postcode entry (PJ072 & PJ062 iteration)
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, hideOverlay } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  // console.log(`${shared.ID} is running`);
  const mainContent = document.querySelector('#ctl00_cphBody_upEnterPostcode');
  const overlayEl = `<div class="${shared.ID}-overlay__wrapper"></div>`;
  if (!document.querySelector(`.${shared.ID}-overlay__wrapper`)) {
    mainContent.insertAdjacentHTML('afterbegin', overlayEl);
  }
  
  const inputContainer = document.querySelector('.nearestStoreOuter');
  const bubbleEl = `<div class="${shared.ID}-speech-bubble__wrapper hidden">
    <div class="${shared.ID}-speech-bubble">
      <p>To begin, please enter your postcode</p>
    </div>
  </div>`;
  if (!document.querySelector(`.${shared.ID}-speech-bubble__wrapper`)) {
    inputContainer.insertAdjacentHTML('afterend', bubbleEl);
  }
  
  const speechBubble = document.querySelector(`.${shared.ID}-speech-bubble__wrapper`);
  const overlay = document.querySelector(`.${shared.ID}-overlay__wrapper`);
  overlay.addEventListener('click', (e) => {
    // console.log('clicked!');
    // console.log(speechBubble);
    // console.log(speechBubble.classList.contains('hidden'));
    // console.log('-  -  -  -  -  -  -   -  -');
    if (speechBubble.classList.contains('hidden')) {
      overlay.classList.add(`${shared.ID}-dark`);
      speechBubble.classList.remove('hidden');
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  });

  // -- Input field
  const postcodeInput = document.querySelector('#ctl00_cphBody_txtPostcode');
  postcodeInput.addEventListener('click', (e) => {
    if (!speechBubble.classList.contains('hidden')) {
      speechBubble.classList.add('hidden');
    }
  });

  // -- Click anywhere other than the overlay
  // --- and hide dark overlay
  const header = document.querySelector('.hInner');
  const footer = document.querySelector('#ctl00__objFooter_divFooterCont');
  
  hideOverlay(header, overlay, speechBubble);
  hideOverlay(footer, overlay, speechBubble);

  // --- Re-runs experiment when lightbox opens
  pollerLite([
    '#ctl00__objHeader_fancyStoreConfirmInner',
    '.fancybox-overlay.fancybox-overlay-fixed',
  ], () => {
    
    observer.connect(document.querySelector('.fancybox-overlay.fancybox-overlay-fixed'), () => {
      activate();
    }, {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
        // subtree: true,
      },
    });
  });
  
  


  // -------------------------------------------
  // PRM Manager Listen for State Changes
  // -------------------------------------------
  window.prm.add_endRequest(function (sender, error) {
    try {
      // console.log(sender);
      if (sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbCloseOnmibar1"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbCloseOnmibar2"
      || sender['_postBackSettings'].asyncTarget === "ctl00$cphBody$lbGetStarted"
      || sender['_postBackSettings'].asyncTarget === "ctl00$_objHeader$lbEnterPostcode") {
        activate();
        // -- HIDE error message if it exists
        const errorMsg = document.querySelector('#ctl00_cphBody_pnlPostCodeError');
        if (errorMsg) {
          setTimeout(() => {
            errorMsg.setAttribute('style', 'display: none;');
          }, 2000);
        }
      }
    } catch (e) {} 
  });
};

export default activate;