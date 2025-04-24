/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import renderAccordion from './components/accordion';
import faqData from './data';

import obsIntersection from './helpers/observeIntersection';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const refererPage = localStorage.getItem('referer');
if (location.pathname === '/kundenservice/' && refererPage) {
  fireEvent(`user visits customer service page from ${refererPage} page`);

  localStorage.removeItem('referer');
} else if (location.pathname === '/kundenservice/' && !refererPage && VARIATION == 'control') {
  fireEvent('user visits customer service page');
}

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  document.body.addEventListener('click', (e) => {
    const pagesPathname = ['/pakete/tvapp/', '/pakete/'];
    if (e.target.closest('.chat-popup') && pagesPathname.some((item) => location.pathname === item)) {
      fireEvent('user interacted with the chat bot');
    }
  });
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    const referencePoint = document.querySelector('footer');
    const callbackFunction = (entry) => {
      if (entry.isIntersecting) {
        fireEvent('User ‘would have seen’ FAQs');
      }
    };
    obsIntersection(referencePoint, 0.1, callbackFunction);
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const tvAppData = faqData.tvApp;
  const packageData = faqData.packages;

  const tvAppPageConfig = {
    anchorSelector: 'footer',
    anchorPosition: 'beforebegin',
    pageType: 'tvApp',
  };
  const packagePageConfig = {
    anchorSelector: '#channel-list-new',
    anchorPosition: 'afterend',
    pageType: 'packages',
  };

  if (location.pathname === '/pakete/tvapp/') {
    renderAccordion(tvAppData, tvAppPageConfig, fireEvent);
  } else if (location.pathname === '/pakete/') {
    renderAccordion(packageData, packagePageConfig, fireEvent);
  }

  const target = document.querySelector('.HDA008__faq');
  const callbackFn = (entry) => {
    if (entry.isIntersecting) {
      fireEvent('FAQ in users viewport');
    }
  };
  obsIntersection(target, 0.6, callbackFn);
};
