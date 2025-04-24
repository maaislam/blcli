/**
 * BV005 - International Sizing Help
 */
import { setup } from './services';
import settings from './settings';
import { getCookie } from './../../../../../lib/utils';
import { addPoller, addObserver } from './winstack';
import addMessage from './addMessage';

const activate = () => {
  setup();

  // Get local cookie
  const locationCookie = getCookie('EXPECTED_LOCALE');
  // Is the user from outside the UK?
  if (window.location.pathname.indexOf('/us/') == -1 && locationCookie !== 'en-GB') {

    addPoller([
      '#product-description .c-tabpanel__main.s-prose',
      '.c-product-details',
      '.c-product-details__add-to-bag .c-button',
      '#app',
    ], () => {
      
          // Add Message and Link
          addMessage();
          // Add Observer as it sometimes gets removed on load
          addObserver([document.querySelector('#product-description')], () => {

            if (!document.querySelector('.BV005-sizeHelp')) {
              addMessage();
            }
          }, {
            config: {
              attributes: false,
              childList: true,
              subtree: true,
            }
          });
    });
  }

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
  
};

export default activate;
