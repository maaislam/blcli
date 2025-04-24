/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events, isVisible } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

/**
 * Check if elms became visible
 */
const checkVisibility = () => {
  const btns = document.querySelectorAll('.AddressContainBut');
  const numBtns = btns.length;

  let visible = false;
  for(var i = 0; i < numBtns; i++) {
    if(isVisible(btns[i])) {
      visible = true;
      break;
    }
  }

  return visible;
};

/**
 * Poll recursively
 *
 * Is ended if cb does not return truthy value
 */
const recursivePoll = (cb, delay) => {
  let timeout = null;

  const runner = () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if(cb()) {
        runner();
      }
    }, delay);
  };

  return {
    kill() {
      clearTimeout(timeout);
    },
    run() {
      runner();
    }
  };
};

/**
 * Entry point
 */
const activate = () => {
  setup();

  // =========================================
  // Set up recursive poller checks...
  // =========================================
  let pollerEnabled = true;

  const toCheck = () => {
    if(checkVisibility()) {
      events.send(settings.ID, 'V' + settings.VARIATION, 'User Saw Terms', {
        sendOnce: true  
      });

      return false;
    }

    return true;
  };

  const recursivePoller = recursivePoll(toCheck, settings.VISIBILITY_CHECK_TIMEOUT);
  
  // =========================================
  // V2 = control
  // V1 = variation
  // =========================================
  if(settings.VARIATION == '2') {
    // =========================================
    // Control
    // =========================================
    recursivePoller.run();
  } else {
    // =========================================
    // Variation
    // =========================================
    recursivePoller.run();

    // =========================================
    // Experiment code
    // =========================================
    const termsLabels = document.querySelectorAll(
      '.DNNModuleContent .EtailTermsText'
    );

    if(termsLabels.length) {
      [].forEach.call(termsLabels, (label) => {
        label.innerHTML = settings.TERMS_HTML;
      });
    }
  }
};

export default activate;
