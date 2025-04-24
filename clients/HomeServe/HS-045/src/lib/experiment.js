/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents, onUrlChange } from '../lib/helpers/utils';
import shared from '../../../../../core-files/shared';
import stickyWrapper from './components/stickyWrapper';
import { obsIntersection } from './helpers/utils';

const { ID, VARIATION } = shared;
let scrollTimer;

//GET LINK FUNCTION
//ON URL CHNAGE LINK FUNCTION WILL CALL AGAIN

const getLink = () => {
  const applyNowSection = document.querySelector('#get-started') || document.querySelector('div[data-sticky="stickyClone"]');
  const applyNowLink =
    applyNowSection.querySelector('a.btn--rounded:not(.hidden)')?.href ||
    applyNowSection.querySelector('a.btn')?.href ||
    applyNowSection.querySelector('.text-align-center a').href;

  return applyNowLink;
};

const updateLink = (newLink) => {
  const linkElement = document.querySelector(`.${ID}__stickyWrapper a`);
  linkElement.href = newLink;
};

const handleIntersection = (entry) => {
  const stickySection = document.querySelector(`.${ID}__stickyWrapper`);
  clearTimeout(scrollTimer);
  if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
    stickySection?.classList.remove('slide-out-bottom');
    stickySection?.classList.remove(`${ID}__hide`);
    stickySection?.classList.add(`${ID}__show`);
    if (!document.body.classList.contains(`${ID}__conditionMet`)) {
      fireEvent('Conditions Met');
      document.body.classList.add(`${ID}__conditionMet`);
    }
  } else {
    stickySection?.classList.remove(`${ID}__show`);
    stickySection?.classList.add('slide-out-bottom');
    scrollTimer = setTimeout(() => {
      stickySection?.classList.add(`${ID}__hide`);
    }, 250);
  }
};

const handleObserver = (selector) => {
  const intersectionAnchor = document.querySelector(selector);
  if (intersectionAnchor) {
    obsIntersection(intersectionAnchor, 0, handleIntersection);
  }
};

const init = () => {
  //console.log('init');

  if (VARIATION == 'control') {
    return;
  }

  const pageSelectorConfig = {
    '/insurance/boiler-cover-service': {
      headerElementSelector: 'h1',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/boiler-cover-service-xs1': {
      headerElementSelector: 'h1',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/boiler-and-central-heating-cover-service-xs1': {
      headerElementSelector: 'h1',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/heating-plumbing-cover-service-xs1': {
      headerElementSelector: 'h1',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/heating-plumbing-electrics-cover-service-xs1': {
      headerElementSelector: 'h1',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/heating-plumbing-electrics-plus-cover-service-xs1': {
      headerElementSelector: 'h1',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/gas-boiler-service': {
      headerElementSelector: '.row.hero-banner',
      headerTextSelector: 'h1.with-sticky',
      priceElementSelector: '.hero-banner__side.with-sticky',
      priceSelector: '.h1.with-sticky',
    },
    '/insurance/plumbing-drainage-cover': {
      headerElementSelector: 'h1',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/plumbing-electrics-cover': {
      headerElementSelector: 'h1',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/heating-plumbing-cover-service': {
      headerElementSelector: 'h1',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/heating-plumbing-electrics-cover-service': {
      headerElementSelector: 'h1',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/heating-plumbing-electrics-plus-cover-service': {
      headerElementSelector: 'h1',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/electrics-cover': {
      headerElementSelector: 'h1',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/landlords-plumbing-drainage': {
      headerElementSelector: '.hero-wrapper',
      headerTextSelector: 'h1#pageTitle',
      priceElementSelector: '.panel.panel-black.panel-large',
      priceSelector: 'h2.text-golden'
    },
    '/insurance/landlords-electrics-cover': {
      headerElementSelector: '.hero-wrapper',
      headerTextSelector: 'h1#pageTitle',
      priceElementSelector: '.panel.panel-black.panel-large',
      priceSelector: 'h2.text-golden'
    },
    '/insurance/landlords-plumbing-electrics-cover': {
      headerElementSelector: '.hero-wrapper',
      headerTextSelector: 'h1#pageTitle',
      priceElementSelector: '.panel.panel-black.panel-large',
      priceSelector: 'h2.text-golden'
    },
    '/insurance/landlords-boiler-cover-service-cp12': {
      headerElementSelector: '.hero-wrapper',
      headerTextSelector: 'h1#pageTitle',
      priceElementSelector: '.panel.panel-black.panel-large',
      priceSelector: 'h2.text-golden'
    },
    '/insurance/landlords-boiler-and-central-heating-cover-service-cp12-xs1': {
      headerElementSelector: '.hero-wrapper',
      headerTextSelector: 'h1#pageTitle',
      priceElementSelector: '.panel.panel-black.panel-large',
      priceSelector: 'h2.text-golden'
    },
    '/insurance/landlords-heating-plumbing-cover-service-cp12': {
      headerElementSelector: '.hero-wrapper',
      headerTextSelector: 'h1#pageTitle',
      priceElementSelector: '.panel.panel-black.panel-large',
      priceSelector: 'h2.text-golden'
    },
    '/insurance/landlords-heating-plumbing-electrics-cover-service-cp12': {
      headerElementSelector: '.hero-wrapper',
      headerTextSelector: 'h1#pageTitle',
      priceElementSelector: '.panel.panel-black.panel-large',
      priceSelector: 'h2.text-golden'
    },
    '/insurance/landlords-heating-plumbing-electrics-plus-cover-service-cp12': {
      headerElementSelector: '.hero-wrapper',
      headerTextSelector: 'h1#pageTitle',
      priceElementSelector: '.panel.panel-black.panel-large',
      priceSelector: 'h2.text-golden'
    },
    '/insurance/landlords-gas-safety-certificate-cp12': {
      headerElementSelector: '.hero-wrapper',
      headerTextSelector: 'h1#pageTitle',
      priceElementSelector: '.panel.panel-black.panel-large',
      priceSelector: 'h2.text-golden'
    },
    '/insurance/home-accident-cover': {
      headerElementSelector: '.row.hero-banner',
      headerTextSelector: 'h1.with-sticky',
      priceElementSelector: '.hero-banner__side.with-sticky',
      priceSelector: '.h1.with-sticky',
    },
    '/insurance/boiler-cover': {
      headerElementSelector: '.hero-content-wrapper',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/boiler-cover-xs1': {
      headerElementSelector: '.hero-content-wrapper',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/boiler-and-central-heating-cover-xs1': {
      headerElementSelector: '.hero-content-wrapper',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/heating-plumbing-cover-xs1': {
      headerElementSelector: '.hero-content-wrapper',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/heating-plumbing-electrics-plus-cover-xs1': {
      headerElementSelector: '.hero-content-wrapper',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/heating-plumbing-electrics-cover-xs1': {
      headerElementSelector: '.hero-content-wrapper',
      headerTextSelector: '#pageTitle',
      priceElementSelector: '.banner-pricing-wrapper',
      priceSelector: 'h2.text-golden',
    },
    '/insurance/landlords-gas-boiler-service-and-gas-safety-certificate-cp12': {
      headerElementSelector: '.hero-wrapper',
      headerTextSelector: 'h1#pageTitle',
      priceElementSelector: '.panel.panel-black.panel-large',
      priceSelector: 'h2.text-golden'
    },
  };

  const pageSelectors = pageSelectorConfig[window.location.pathname];

  if (!pageSelectors) {
    return;
  }

  const { headerElementSelector, headerTextSelector, priceElementSelector, priceSelector } = pageSelectors;

  const heraderElement = document.querySelector(headerElementSelector);
  const priceElement = document.querySelector(priceElementSelector) || heraderElement.querySelector(priceElementSelector);

  const headerText = document.querySelector(headerTextSelector)?.textContent;
  //console.log('🚀 ~ init ~ headerText:', headerText);
  const price = priceElement.querySelector(priceSelector)?.textContent;
  const priceText =
    priceElement.querySelector('p.first-yr-label')?.textContent ||
    priceElement.querySelector('*:last-child')?.textContent ||
    priceElement.querySelector('.small')?.textContent ||
    'a month in your first year';

  if (!document.querySelector(`.${ID}__stickyWrapper`)) {
    document.body.insertAdjacentHTML('beforeend', stickyWrapper(ID, headerText, price, priceText, getLink()));
  }
};

export default () => {
  setup();

  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-970RHZRVZ4';

  if (document.querySelector('#get-started')) {
    handleObserver('#get-started');
  } else if (document.querySelector('div[data-sticky="stickyClone"]')) {
    handleObserver('div[data-sticky="stickyClone"]');
  }

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (
      target.closest('#price-sticky-header a') ||
      target.closest('#stickyClone a') ||
      target.closest(`.${ID}__stickyWrapper a`)
    ) {
      fireEvent('User interact with the cta on the banner');
    }
  });

  init();

  onUrlChange(() => {
    setTimeout(() => {
      updateLink(getLink());
    }, 1000);
  });
};
