import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import homepagePromoBanner from './components/homepagePromoBanner';
import pdpPage from './pages/pdpPage';
import plpPage from './pages/plpPage';

import { onUrlChange } from './helpers/utils';
import { obsIntersection } from './helpers/utils';
import TestReporting from '../boots_tracking/TestReporting';

const { ID, VARIATION } = shared;

const testID = `${ID}|BLTV001 - Prompt to Login`; // Change this to test name and include in experiment.js
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;

const init = () => {
  const { pathname } = window.location;

  if (pathname === '/') {
    pollerLite(['#FED-prop-swiper-sticky'], () => {

      const reporting = new TestReporting(testID, testVariant); // sends experience id event to datalayer
      reporting.register(); // sends experience load event to datalayer
      
      const eventText = VARIATION == 'control' ? 'would have' : 'has';

      fireBootsEvent(`User ${eventText} seen HP banner`, true, eventTypes.experience_action, {
        action: actionTypes.view,
        action_detail: `User ${eventText} seen HP banner`,
      });

      if (VARIATION == 'control') return;

      const attachPoint = document.querySelector('#FED-prop-swiper-sticky');
      attachPoint.insertAdjacentHTML('afterend', homepagePromoBanner(ID));

    });
    return;
  }

  pollerLite(
    [
      '.pdp-promotion-redesign.member_price_advantage.align_left',
      '#productPageAdd2Cart',
      '#reDesignPOint .rwdPointsContent strong',
    ],
    () => {
      const reporting = new TestReporting(testID, testVariant); // sends experience id event to datalayer
      reporting.register(); // sends experience load event to datalayer

      if (VARIATION == 'control') {
        return;
      }
      pdpPage(ID);
    }
  );

  //plp page
  plpPage(ID);

  onUrlChange(() => {
    //remove all existing banners
    const plpBanners = document.querySelectorAll(`.${ID}__plp-banner`);

    if (plpBanners.length > 0) {
      plpBanners.forEach((banner) => {
        banner?.remove();
      });
    }

    plpPage(ID);
  });
};

export default () => {
  const testID = `${ID}|BLTV001 - Prompt to Login`; // same as triggers.js
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID}|${testVariant}`;

  bootsEvents.initiate = true;
  bootsEvents.methods = ['datalayer'];
  bootsEvents.property = 'G-C3KVJJE2RH';
  bootsEvents.testID = testIDAndVariant;

  setup();

  // fireBootsEvent('Conditions Met');

  const handleIntersection = (entry) => {
    //console.log('🚀 ~ handleIntersection ~ entry:', entry);
    const pageType = window[`${ID}__pageType`];

    if (!entry.isIntersecting) {
      if (!document.body.classList.contains(`${ID}__conditionMet`)) {
        if (pageType === 'pdp') {
          const eventText = VARIATION == 'control' ? 'User would have seen CTA on PDP' : 'User scrolls to see CTA on PDP';
          fireBootsEvent(`${eventText}`, true, eventTypes.experience_action, {
            action: actionTypes.view,
            action_detail: `${eventText}`,
          });
        } else if (pageType === 'plp') {
          const eventText = VARIATION == 'control' ? 'User would have seen CTA on PLP' : 'User scrolls to see CTA on PLP';

          fireBootsEvent(`${eventText}`, true, eventTypes.experience_action, {
            action: actionTypes.view_product,
            action_detail: `${eventText}`,
          });
        }
        //document.body.classList.add(`${ID}__conditionMet`);
      }
    }
  };

  const handleObserver = (selector, pageType) => {
    window[`${ID}__pageType`] = pageType;
    const intersectionAnchor = document.querySelector(selector);
    if (intersectionAnchor) {
      obsIntersection(intersectionAnchor, 0.2, handleIntersection);
    }
  };

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__link-button`)) {
      fireBootsEvent('User Clicks a Sign up / Sign in CTA', true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: 'User Clicks a Sign up / Sign in CTA',
      });
    } else if (target.closest('#signInQuickLink')) {
      fireBootsEvent('User Clicks Login/Register button', true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: 'User Clicks Login/Register button',
      });
    } else if (target.closest('#adcardQuickLinkGuest')) {
      fireBootsEvent('User Clicks Advantage Card', true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: 'User Clicks Advantage Card',
      });
    }
  });

  pollerLite(['.pdp-promotion-redesign.member_price_advantage.align_left', '#productPageAdd2Cart'], () => {
    handleObserver('#productPageAdd2Cart', 'pdp'); // product page
  });

  pollerLite(['[aria-label*="with Advantage Card"]'], () => {
    handleObserver('[aria-label*="with Advantage Card"]', 'plp');
  });

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  init();
};
