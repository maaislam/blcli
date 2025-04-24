/**
 * AF001 - Understand Segment Behaviours
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, generateLightbox } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import { events, setCookie } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const activate = () => {

  if (sessionStorage.getItem(`${shared.ID}-lightboxShown`) !== null 
    && !document.cookie.match(/af-dismissed-fullscreen-register/i)) {

    // Cookie bot has cleared our the dismiss cookie.
    
    setCookie('af-dismissed-fullscreen-register', 'true');

    return;
  }

  // Write experiment code here
  if (sessionStorage.getItem(`${shared.ID}-lightboxShown`) === null 
    && window.location.pathname.match(
      /(^\/$)|art|sort|paginate|category\/|about$|\/artist\-charts\/|\/blog\/|\/staff\-picks\/|\/trade\/|\/sell\/|\/partners|\/personal\-shopping/i
    )
    && !window.location.href.match(/product/i)
  ) {
    events.send(`${shared.ID}`, `${shared.ID} - Lightbox Visible`, 
      `${shared.VARIATION == 'control' ? 'Control' : ('V' + shared.VARIATION)} - Activated`, { sendOnce: true });

    if(shared.VARIATION == 'control') {
      return;
    }

    if(document.cookie.match(/af-dismissed-fullscreen-register/i)) {
      return;
    }

    setup();

    // The cookie consent module is render-blocking for a period of 2 seconds
    // so we have to prevent ImplicitConsent being called
    // We re-set consentLevel to 'implicit' later on
    // The polling works around a loading delay
    pollerLite([
      () => {
        if(typeof CookieConsentDialog != 'undefined') {
          return true;
        }
        return false;
      }
    ], () => {
      CookieConsentDialog.consentLevel = 'strict';
    });

    // Run
    generateLightbox();

    // Prevent the control dialog from showing on subsequent pages
    // This cookie is set by the control
    setCookie('af-dismissed-fullscreen-register', 'true');
  }
  
};


export default activate;
