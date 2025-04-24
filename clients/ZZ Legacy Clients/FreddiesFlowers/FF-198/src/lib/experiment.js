/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import shared from './shared';
import getCode from './getCode';
import settings from './settings';
import checkForValidCode from './checkForValidCode';
import redirect from './redirect';
import onWinLoad from '../../../../../lib/utils/onWinLoad';
import { logMessage, setCookie, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const handleEvents = () => {
  onWinLoad(() => {
    fireEvent('Conditions met - after redirect');
  });
};

const handleRedirect = () => {
  const trackers = window.ga.getAll();
  const trackerName = trackers[0].get('name');
  window.ga(trackerName + '.send', 'event', 'Experimentation', 'FreddiesFlowers - FF-198', 'Code Redirect', {
    hitCallback: function() {
      redirect();
    }
  });
};

const handleExperiment = () => {
  const toRedirect = !settings.isNewSite && !settings.isOldSite && !settings.isExcludedPage;
    if (toRedirect) {
        handleRedirect();
    } else {
        // Fire event on new website if code exists
        const code = getCode();
        if (code) {
            logMessage(`Code Successful - ${code}`);
            fireEvent(`Code Successful - ${code}`);
        }
        // Fire event on variant when window loaded and user has been redirected (AND IS NOT EXCLUDED PAGE).
        if (!settings.isExcludedPage) {
          handleEvents();
        }
    }
};

export default () => {
    setup();
    logMessage(ID + " Variation: "+VARIATION);
    setCookie('didSeeTest', 'true');

    fireEvent('Conditions Met');
    
    // If is control, do nothing.
    if (shared.VARIATION == 'control') {
      pollerLite(['#cookieBanner'], () => {

        let cBanner = document.getElementById('cookieBanner');
    
        cBanner.remove();
    
        let message = "Visible - experiment fired and cookie banner removed";
        fireEvent(message, true);
    
    
      });
    } else {

        // Set item if been on excluded page in local storage
        if (settings.isExcludedPage) {
            localStorage.setItem(`${ID}-excluded-page`, true);
        }

        /* 
        * Redirect user on variant (only if not new site and not been on excluded page)
        */
        const beenOnExcludedPage = JSON.parse(localStorage.getItem(`${ID}-excluded-page`) || false);
        if (!beenOnExcludedPage) {
            handleExperiment();
        }

        
        
    }
};
