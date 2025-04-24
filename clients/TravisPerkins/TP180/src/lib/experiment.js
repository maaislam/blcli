/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, isLoggedIn } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

const init = () => {
  const USPCard = document.getElementById('main-usp-block1');

  if (!USPCard || !isLoggedIn()) {
    return;
  }

  // Experiment Code...
  setup();

  const textBlock = USPCard.querySelector('*[class^=\"USPCard__TextBlock\"]');
  if (textBlock) {
    const textBlockDivs = textBlock.querySelectorAll('div');

    // Update card text.
    textBlockDivs[0].textContent = "Your Logged in Trade Prices";
    textBlockDivs[1].textContent = "Now visible on products throughout the website";

    // Remove card link.
    const link = USPCard.querySelector('a');
    if (link) {
      link.removeAttribute('href');
      link.addEventListener('click', () => {
        events.send(`${shared.ID}`, `V-${shared.VARIATION}`, 'usp-click');
      })
    }
  }
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
