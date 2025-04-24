/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import repairBanner from './components/repairBanner';
import { fireEvent, newEvents, obsIntersection } from './helpers/utils';

const { ID, VARIATION } = shared;

const handleIntersection = (entry) => {
  if (entry.isIntersecting) {
    if (!document.body.classList.contains(`${ID}__seenCTA`)) {
      fireEvent('User sees the “become a member today” CTA');
      document.body.classList.add(`${ID}__seenCTA`);
    }
  }
};

const handleJobIntersection = (entry) => {
  if (entry.isIntersecting) {
    if (!document.body.classList.contains(`${ID}__seenJob`)) {
      fireEvent('User sees the “Need a job doing today” Section');
      document.body.classList.add(`${ID}__seenJob`);
    }
  }
};

const handlePolicyIntersection = (entry) => {
  if (entry.isIntersecting) {
    if (!document.body.classList.contains(`${ID}__seenPolicy`)) {
      fireEvent('User sees the “Do you have an existing insurance policy');
      document.body.classList.add(`${ID}__seenPolicy`);
    }
  }
};

const handleAppDetailsIntersection = (entry) => {
  if (entry.isIntersecting) {
    if (!document.body.classList.contains(`${ID}__seenAppDetails`)) {
      fireEvent('User sees the “Ding is on iOS and Android” section');
      document.body.classList.add(`${ID}__seenAppDetails`);
    }
  }
};

const handleFaqIntersection = (entry) => {
  if (entry.isIntersecting) {
    if (!document.body.classList.contains(`${ID}__seenFaq`)) {
      fireEvent('User sees the FAQ’s');
      document.body.classList.add(`${ID}__seenFaq`);
    }
  }
};

const handleObserver = (selector, text) => {
  const intersectionAnchor = document.querySelector(selector);
  const selectedHandleIntersection =
    text === 'cta'
      ? handleIntersection
      : text === 'job'
      ? handleJobIntersection
      : text === 'policy'
      ? handlePolicyIntersection
      : text === 'appDetails'
      ? handleAppDetailsIntersection
      : text === 'faq'
      ? handleFaqIntersection
      : '';
  if (intersectionAnchor) {
    obsIntersection(intersectionAnchor, 0.2, selectedHandleIntersection);
  }
};

const init = () => {
  const targetPoint = document.querySelector('.infoWholesection');
  if (!document.querySelector(`.${ID}__repair-section`)) {
    targetPoint.insertAdjacentHTML('beforebegin', repairBanner(ID));
  }

  pollerLite(['#viewAvailSecId > a.btn'], () => {
    const controlAvailabilityButton = document.querySelector('#viewAvailSecId > a.btn');
    const link = controlAvailabilityButton ? controlAvailabilityButton.href : '';
    const repairButton = document.querySelector(`.${ID}__repair-section .repair-button`);
    if (link && repairButton) repairButton.href = link;
  });
};

export default () => {
  setup();
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  fireEvent('Conditions Met');

  pollerLite(['.infoJoinding > a.btn'], () => {
    handleObserver('.infoJoinding > a.btn', 'cta');
  });

  pollerLite(['.existingPolicy > h3'], () => {
    handleObserver('.existingPolicy > h3', 'policy');
  });

  pollerLite(['.appDetails'], () => {
    handleObserver('.appDetails', 'appDetails');
  });

  pollerLite(['.faqSection h2'], () => {
    handleObserver('.faqSection h2', 'faq');
  });

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest('.repair-button') || target.closest('#viewAvailSecId > a.btn')) {
      fireEvent('User clicks the “View availability and pricing CTA”');
    } else if (target.closest('.infoJoinding > a.btn')) {
      fireEvent('User clicks the “Become a member” CTA');
    } else if (target.closest('.existingPolicy .card a[href*="/uk/LoggedIn/"]')) {
      fireEvent('User clicks the “Login/Register” CTA');
    } else if (target.closest('.existingPolicy .card a[href*="/contact-us/"]')) {
      fireEvent('User clicks the “Contact us” CTA');
    } else if (target.closest('.appDetailsButton a[href^="https://apps.apple.com"]')) {
      fireEvent('User clicks the “Download on the App Store” CTA');
    } else if (target.closest('.appDetailsButton a[href^="https://play.google.com"]')) {
      fireEvent('User clicks the “Get it on Google Play” CTA');
    } else if (target.closest('.accordion-button[type="button"]')) {
      const clickedItem = target.closest('.accordion-button[type="button"]');
      const accordionTitle = clickedItem ? clickedItem.textContent : '';
      accordionTitle ? fireEvent(`FAQ Click - ${accordionTitle}`) : '';
    } else if (target.closest('.infoJoinding a[href*="/-/media/UK/Documents"]')) {
      fireEvent('User clicks on the “Terms and condition apply” Link text in the become a member section');
    } else if (target.closest('.infoJoinding .card-body')) {
      const clickedItem = target.closest('.infoJoinding .card-body');
      const titleElement = clickedItem?.querySelector('.card-text strong');
      const title = titleElement ? titleElement.textContent : '';
      title ? fireEvent(`User phantom clicks on the “${title?.split('.')[0]}” box in the “become a member” section`) : '';
    }
  });

  if (VARIATION == 'control') {
    pollerLite(['#viewAvailSecId > h2'], () => {
      handleObserver('#viewAvailSecId > h2', 'job');
    });
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  init();
};
