import Experiment from './experiment';

const isOnCheckout = /^https?:\/\/(www\.)?papajohns\.co\.uk(\/.+)?\/checkout-mobile(\.aspx)?\/?(\?.*)?(#.*)?$/.test(window.location.href);
if (isOnCheckout) {
  const prm = window.prm || window.Sys.WebForms.PageRequestManager.getInstance(); // eslint-disable-line
  const isOnGuestFormPage = () => !!document.querySelector('#ctl00_cphBody_pnlGuestForm');

  // Pass variables to experiment.js
  const exports = { prm, isOnGuestFormPage };

  /**
   * add_pageLoaded event handler which fires the experiment if the action was to go to address page
   */
  const PJ012TriggerHandler = (sender) => {
    try {
      if (isOnGuestFormPage() && !document.querySelector('.PJ012--active')) {
        const target = sender._postBackSettings.asyncTarget; // eslint-disable-line
        if (target === 'ctl00$cphBody$lbContinueToAddress' || target === 'ctl00$cphBody$lbBackToAddress') {
          // Fire experiment and stop watching for virtual page changes
          Experiment.init(exports);
          prm.remove_pageLoaded(PJ012TriggerHandler);
        }
      } else {
        // Experiment did not fire
      }
    } catch (e) {
      console.log(`UC PJ012 Error: ${e}`); // eslint-disable-line no-console
    }
  };

  /*
   * If the user is on the address page fire the experiment, otherwise add the event handler to
   * add_pageLoaded to watch for when this page is loaded
   */
  if (isOnGuestFormPage()) {
    Experiment.init(exports);
  } else {
    // Experiment did not fire yet, watch for virtual page changes
    prm.add_pageLoaded(PJ012TriggerHandler);
  }
}
