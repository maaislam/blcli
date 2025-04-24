/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events, pollerLite } from '../../../../../lib/utils';

const runMobileChanges = () => {
  events.send(`${shared.ID}-${shared.VARIATION}`, 'Init', '', {
    sendOnce: true
  });
  
  // Declare new markup:
  var newIcon = ``;
  var iconWrap = document.querySelectorAll('[class*=ProductItemMobile__ThreeDotsWr]');
  // Variation 1 - More info 
  if (shared.VARIATION === '1') {
    newIcon = `
      <div class="${shared.ID}__moreinfo-icon">More<br>info</div>
    `;
    if (iconWrap) {
      [].forEach.call(iconWrap, (wrap) => {
        wrap.classList.add(`${shared.ID}__icon-wrap`);
      })
    }
  }
  // Variation 2 - i icon
  if (shared.VARIATION === '2') {
    newIcon = `
      <div class="${shared.ID}__i-icon">i</div>
    `;
  }

  if (iconWrap) {
    [].forEach.call(iconWrap, (wrap) => {
      wrap.innerHTML = newIcon;

      wrap.addEventListener('mousedown', () => {
        events.send(`${shared.ID}-${shared.VARIATION}`, 'Did-Click-Button', '', {
          sendOnce: true
        });
      });
    })
  }

}

const init = () => {
  const componentAlreadyExists = false; 

  if (componentAlreadyExists) {
    return;
  }

  // Experiment Code...
  pollerLite([
    '[class*=PLPMobile__PLPWrapper]'
  ], () => {
    runMobileChanges();
  })
  setup();

  // ....
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
