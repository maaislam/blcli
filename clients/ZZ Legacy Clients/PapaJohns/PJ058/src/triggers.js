import PJ024 from './lib/lib/PJ024';
import activate from './lib/experiment';

const isDesktopCheckout = /^https?:\/\/(www\.)?papajohns\.co\.uk(\/.+)?\/checkout(\.aspx)?\/?(\?.*)?(#.*)?$/.test(window.location.href);
const isMobileCheckout = /^https?:\/\/(www\.)?papajohns\.co\.uk(\/.+)?\/checkout-mobile(\.aspx)?\/?(\?.*)?(#.*)?$/.test(window.location.href);

if (isDesktopCheckout || isMobileCheckout) {
  const prm = window.prm || window.Sys.WebForms.PageRequestManager.getInstance(); // eslint-disable-line
  const isOnGuestFormPage = () => !!document.querySelector('#ctl00_cphBody_pnlGuestForm');

  // Pass variables to experiment.js
  const exp = {
    prm,
    isOnGuestFormPage,
    isDesktopCheckout,
    isMobileCheckout,
  };

  /**
   * add_pageLoaded event handler which fires the experiment if the action was to go to address page
   */
  const PJ024TriggerHandler = (sender) => {
    try {
      if (isOnGuestFormPage()) {
        const target = sender._postBackSettings.asyncTarget; // eslint-disable-line
        if (target === 'ctl00$cphBody$lbContinueToAddress' || target === 'ctl00$cphBody$lbBackToAddress') {
          // Fire experiment and stop watching for virtual page changes
          activate(exp);
          prm.remove_pageLoaded(PJ024TriggerHandler);
        }
      } else {
        // Experiment did not fire
      }
    } catch (e) {
      console.log(`UC PJ024 Error: ${e}`); // eslint-disable-line no-console
    }
  };

  /*
   * If the user is on the address page fire the experiment, otherwise add the event handler to
   * add_pageLoaded to watch for when this page is loaded
   */
  if (isDesktopCheckout || (isMobileCheckout && isOnGuestFormPage())) {
    // PJ024.init(exports);
    activate(exp);
  } else {
    // Experiment did not fire yet, watch for virtual page changes
    prm.add_pageLoaded(PJ024TriggerHandler);
  }
}
