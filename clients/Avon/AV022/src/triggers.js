/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { share, getPageType } from './lib/services';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

const { ID, VARIATION } = shared;

/** Poll for elements the run experiment */
const pollAndFire = () => {
  const { pageType } = shared;
  let pollingElements;
  if (pageType === 'deliveryDetails') {
    pollingElements = [
      '#GuestRegistrationForm',
      '.TermsCheck[ng-change="MarketingOptInClick(RegistrationModel.ContactPreferences.ContactBySms)"]',
      '.TermsCheck[ng-change="MarketingOptInClick(RegistrationModel.ContactPreferences.ContactByEmail)"]',
      '#CheckoutDirectDelivery_Delivery',
    ];
  } else if (pageType === 'confirmation') {
    pollingElements = ['#ThankYouForShoppingPanel'];
  }

  if (pollingElements) {
    pollerLite(pollingElements, () => {
      events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
      activate();
    });
  }
};

waitForApp().then((data) => {
  const pageType = getPageType();
  const isLoggedIn = data.rootScope.Session.IsUserLoggedIn;

  // Make data global
  share(data);
  share({ isLoggedIn, pageType });

  if (pageType && !isLoggedIn) {
    pollAndFire();
  }
});
