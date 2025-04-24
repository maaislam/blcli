import { events } from '../../../../lib/utils';

/**
 * {{FL032}} - {{Guest Checkout Improvements}}
 */

const headerRebuild = () => {
  // Flannels ga configuration
  events.analyticsReference = '_gaUAT';
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'FL032',
      VARIATION: 'Control',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;

      return {
        docVar,
        bodyVar,
      };
    })(),
    init: () => {
      // Send default running event
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      if (window.location.pathname.indexOf('/checkout/confirmandpay') > -1) {
        // Add tracking to elements on confirm page
        Exp.bindExperimentEvents.addPayNowTracking();
      }
    },
    bindExperimentEvents: {
      trackPayNow() {
        events.send(`${Exp.settings.ID} - ${Exp.settings.VARIATION}`, 'Clicked', 'Pay now', { sendOnce: true });
      },
      addPayNowTracking() {
        const payNowButtons = Exp.cache.bodyVar.querySelectorAll('[class*="ContinueButtonWrapper"] input');
        for (let i = 0, n = payNowButtons.length; i < n; i += 1) {
          payNowButtons[i].addEventListener('click', this.trackPayNow);
        }
      },
    },
  };

  Exp.init();
};

export default headerRebuild;
