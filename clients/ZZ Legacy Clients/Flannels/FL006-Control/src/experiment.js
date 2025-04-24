import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

/**
 * FL006 Control
 */
const Experiment = {
  settings: {
    ID: 'FL006',
    VARIATION: 'Control',
  },

  init() {
    const { settings } = Experiment;
    events.analyticsReference = '_gaUAT';
    events.send(settings.ID, 'Ran', `${settings.ID} ${settings.VARIATION} ran`);

    // Track clicks on Paypal button
    if (window.location.pathname === '/checkout/payment') {
      pollerLite(['#dnn_ctr88156_PaymentMethod_PaymentMethodSelection_divPaypalCheckoutButton'], () => {
        const paypalBtn = document.querySelector('#dnn_ctr88156_PaymentMethod_PaymentMethodSelection_divPaypalCheckoutButton');
        paypalBtn.addEventListener('click', () => {
          events.send(settings.ID, 'Click', `${settings.ID} ${settings.VARIATION} - User clicked Paypal`);
        });
      });
    }
  },
};

export default Experiment;
