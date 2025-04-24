/**
 * BV009 - Returning Users Sign in Prompt.
 * @author User Conversion
 */
import { setup, userStatus, addMessage, clickEvent, closeMessage } from './services';
import { events } from '../../../../../lib/utils';
import settings from './settings';
import { addPoller, addObserver } from './winstack';


const activate = () => {
  
  /**
   * ABT is handling the returning users part.
   */

  // Experiment code
  if (!userStatus()) {
    setup();
    events.send(settings.ID, 'BV009 Active', 'User is not logged in');

    // If search page, bail out
    addPoller([() => {
      let run = false;
      if (window.location.href.indexOf('https://www.bravissimo.com/search') > -1) {
        run = true;
      }
      return run;
    }], () => {
        console.log('search page,');
        // Fetch and add the CSS
        const message = document.querySelector('.BV009-message');
        if (message) {
          message.parentNode.removeChild(message);
        }
    });

    // Is it the Home page?
    if (window.location.href === 'https://www.bravissimo.com/' || window.location.href === 'https://www.bravissimo.com/us/') {
      addPoller(['main.c-page'], () => { 
        let ref = document.querySelector('main.c-page');
        // Add Message
        addMessage(ref, 'afterbegin');
        events.send(settings.ID, 'BV009 Homepage Message', 'Message added on home page');
        // Attach click event
        clickEvent();
        // For closing
        closeMessage();
      });
    } else {
      // PDP
      addPoller(['.l-grid .c-product-details'], () => { 
        let ref = document.querySelector('.l-grid .c-product-details');
        // Add Message
        addMessage(ref, 'beforeend');
        events.send(settings.ID, 'BV009 PDP Message', 'Message added on PDP');
        // Attach click event
        clickEvent();
        // For closing
        closeMessage();
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


  } else { // bail out
    events.send(settings.ID, 'BV009 Fail', 'User is logged in');
    return false;
  }
};

export default activate;
