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

const addDesktopOverlay = (link = 'https://tpskiphire.co.uk/') => {
  const existingOverlay = document.querySelector(`.${shared.ID}__overlay`);
  if(existingOverlay) {
    existingOverlay.parentNode.removeChild(existingOverlay);
  }

  const markup = `
    <div class="${shared.ID}__overlay">
      <div class="${shared.ID}__overlay-inner">
        <div class="${shared.ID}__overlay-content">
          <svg viewBox="0 0 30 30" id="brand-icon-logo-24">
            <g fill="none" fill-rule="evenodd">

              <path d="M1.209 14.908c0 7.621 6.169 13.799 13.78 13.799s13.78-6.178 13.78-13.799C28.77 7.287 22.6 1.11 14.99 1.11S1.21 7.287 1.21 14.91" fill="#005A39"></path>
              <path d="M18.249 12.675v-3.81h2.434c2.646 0 4.791 2.155 4.791 4.813 0 2.66-2.145 4.815-4.791 4.815h-2.639v3.913h-3.381v-7.543h6.21c.602 0 1.13-.486 1.13-1.09a1.09 1.09 0 00-1.087-1.093l-2.667-.005zM5.952 8.858h11.22v3.808h-3.894v9.74H9.692v-9.688h-3.74v-3.86z" fill="#EFA731"></path>
            </g>
          </svg>
          <h2>You are about to leave Travis Perkins...</h2>
          <p>...and be taken to <em>our trusted partner</em> for skip hire*</p>

          <div class="${shared.ID}__overlay-btnwrap">
            <a href="${link}">Proceed to Skip Hire</a>
          </div>

          <p class="${shared.ID}__overlay-link"><span>I want to stay on Travis Perkins</span></p>
        </div>

        <div class="${shared.ID}__overlay-disclaimer"><span>*Please note that your TP account and basket will not be available</span></div>
      </div>
    </div>
  `;

  const appContainer = document.querySelector('#app-container');
  if (appContainer) {
    appContainer.insertAdjacentHTML('afterbegin', markup);
  }

  // Event listeners
  const overlay = document.querySelector(`.${shared.ID}__overlay`);
  if(overlay) {
    overlay.addEventListener('click', e => {
      if(!e.target.closest(`.${shared.ID}__overlay-inner`)) {
        fireEvent('Clicked Overlay');
      } else if(e.target.closest(`.${shared.ID}__overlay-link`)) {
        overlay.parentNode.removeChild(overlay);
        fireEvent('Closed Lightbox - Link');
      } else if(e.target.closest(`.${shared.ID}__overlay-btnwrap`)) {
        fireEvent('Proceed');
      }
    });
  }
}

const init = () => {
  const existingOverlay = document.querySelector(`.${shared.ID}__overlay`);
  if(existingOverlay) {
    existingOverlay.parentNode.removeChild(existingOverlay);
  }

  // Experiment Code...
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const skipHireLinks = document.querySelectorAll('a[href*="tpskiphire.co.uk"]');
  [].forEach.call(skipHireLinks, l => {
    l.addEventListener('click', e => {
      fireEvent('Show Lightbox');

      if(VARIATION != 'control') {
        e.preventDefault();

        addDesktopOverlay(l.href);
      }
    });
  });
}

export default () => {
  init();

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

    observer.observe(appContainer, config);
  });
};
