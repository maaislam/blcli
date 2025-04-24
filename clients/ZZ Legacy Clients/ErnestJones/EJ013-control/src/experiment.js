import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

events.send('EJ013', 'View', 'EJ013 activated - Control');

const newsletterWillShow = document.cookie.indexOf('UserNewsletterDismissed-Retry=') === -1;
if (newsletterWillShow) {
  // Wait for lightbox to show
  pollerLite(['.email-sign-up-pop-up__light-box #js-emailSignUpPopup'], () => {
    events.send('EJ013', 'View', '10% off pop up shown');
  }, {
    multiplier: 0,
    timeout: 40000,
  });
}
