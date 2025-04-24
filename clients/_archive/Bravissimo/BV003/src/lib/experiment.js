/**
 * IDXXX - Description
 */
import { setup, showMessage, addMessage, removeMessage } from './services';
import settings from './settings';
import { observer } from './../../../../../lib/uc-lib';
import { events } from './../../../../../lib/utils';
import { cacheDom } from './../../../../../lib/cache-dom';
import { addPoller, addEventListener, addObserver } from './winstack';

const activate = () => {

  const runTest = () => {
    setup();  
    const gbFlag = cacheDom.get('.c-locale-switcher__flag--gb'); 
    const basketClick = cacheDom.get('li.c-toolbar__item[data-reactid="40"]');
    const liveChatEl = cacheDom.get('section.c-container a[label="Live chat"]');
    const phoneEl = cacheDom.get(`.c-container a[label="Phone link (${gbFlag ? 'GB' : 'US'})"]`);
    const phoneElHref = phoneEl.getAttribute('href');
    const phoneNumber = phoneElHref.replace('tel:', '');
    // Experiment codes

    // Desktop
    addPoller(['.dropdown-menu > span'], () => {
      const basketSpan = document.querySelector('.dropdown-menu > span');
      addObserver(basketSpan, () => {
        addPoller(['.c-popover--bag .c-sku__code'], () => {
          const basket = document.querySelector('.c-popover--bag');
          setTimeout(() => {
            let toShow = showMessage(basket);
            if (toShow) {
              // Add messages
              addMessage(settings.VARIATION, phoneNumber);
    
              // Add click event for tracking
              basket.addEventListener('click', (e) => {
                if (e.target && e.target.getAttribute('id') === 'BV003-liveChat') {
                  liveChatEl.click();
                  events.send(settings.ID, 'Click', 'Live Chat');
                }
                if (e.target && e.target.classList.contains('BV003-sizeguide')) {
                  events.send(settings.ID, 'Click', 'Size Guide');
                }
                if (e.target && e.target.classList.contains('BV003-phone')) {
                  events.send(settings.ID, 'Click', 'Phone');
                }
              });
            } else if (!toShow) {
              // Remove messages
              removeMessage();
            }
          }, 200);
        })
      }, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    });

    // Mobile
    addPoller(['#bag'], () => {
      const basketSection = document.querySelector('#bag');
      addObserver(basketSection, () => {
        addPoller(['.c-bag__main .c-sku__code'], () => {
          const basket = document.querySelector('.c-bag__main');
          setTimeout(() => {
            let toShow = showMessage(basket);
            if (toShow) {
              // Add messages
              addMessage(settings.VARIATION, phoneNumber);
    
              // Add click event for tracking
              basket.addEventListener('click', (e) => {
                if (e.target && e.target.getAttribute('id') === 'BV003-liveChat') {
                  liveChatEl.click();
                  events.send(settings.ID, 'Click', 'Live Chat');
                }
                if (e.target && e.target.classList.contains('BV003-sizeguide')) {
                  events.send(settings.ID, 'Click', 'Size Guide');
                }
                if (e.target && e.target.classList.contains('BV003-phone')) {
                  events.send(settings.ID, 'Click', 'Phone');
                }
              });
            } else if (!toShow) {
              // Remove messages
              removeMessage();
            }
          }, 200);
        })
      }, {
        attributes: true,
        childList: false,
        subtree: false,
      });
    });

    // Due to React, we need to add an observer to the doc body.
    addObserver(document.body, () => {
      if (!document.body.classList.contains(settings.ID)) {
        document.body.classList.add(settings.ID);
      }
    }, {
      config: {
        attributes: true,
        childList: false,
        subtree: false,
      },
    });
  }
  runTest();

  // Observe colour changes
  const colourButtons = document.querySelectorAll('.c-style-colour');
  if (colourButtons) {
    for (let i = 0; colourButtons.length > i; i += 1) {
      colourButtons[i].addEventListener('click', () => {
        setTimeout(() => {
          runTest();
        }, 2000);
      });
    }
  }
};

export default activate;