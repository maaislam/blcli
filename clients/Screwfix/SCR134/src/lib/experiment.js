/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import toBar from './components/toBar';
import { obsIntersection, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 700;
const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const captureElementsContainingString = (searchString) => {
  const elements = [...document.querySelectorAll('button[data-qaid^="pdp-tab-"]')]; //Get all elements as an array

  return elements.filter((el) => el.textContent.includes(searchString));
};

const scrollToSection = (targetEl, offset = 0) => {
  const rect = targetEl.getBoundingClientRect();
  const absoluteY = window.scrollY + rect.top;

  window.scrollTo({
    top: absoluteY - offset,
    behavior: 'smooth',
  });
};

const setTabItemActive = (clickedItem) => {
  if (captureElementsContainingString(clickedItem.textContent.trim())) {
    const targetPoint = captureElementsContainingString(clickedItem.textContent.trim())[0];
    targetPoint.click();
    scrollToSection(targetPoint, 160);
  }
  updateAriaSelected(clickedItem);
};

const updateAriaSelected = (clickedTab) => {
  const allTabs = document.querySelectorAll('button.tab[role="tab"]');

  allTabs.forEach((tab) => {
    tab.setAttribute('aria-selected', 'false');
    tab.classList.remove('active'); // optional, if you use a class for styling
  });

  clickedTab?.setAttribute('aria-selected', 'true');
  clickedTab?.classList.add('active'); // optional
};

const handleIntersection = (entry) => {
  if (entry.isIntersecting) {
    updateAriaSelected(document.querySelector('#tab-details'));
  }
};

const handleIntersectionOthers = (entry) => {
  console.log(entry, 'entry');
  if (entry.isIntersecting) {
    const tabListItems = document.querySelectorAll(
      '#product_additional_details_container [role="tablist"] button[type="button"]'
    );
    const selectedItem = [...tabListItems].find((item) => item.dataset.qaid?.includes('selected'));
    const text = selectedItem.textContent.trim();
    console.log('text', text);
    pollerLite([`[id="tab-${text}"]`], () => {
      console.log(text, 'text', document.querySelector(`[id="tab-${text}"]`));
      updateAriaSelected(document.querySelector(`[id="tab-${text}"]`));
    });
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const handleObserver = (selector, text) => {
  const intersectionAnchor = document.querySelector(selector);
  if (intersectionAnchor) {
    obsIntersection(intersectionAnchor, 0.2, text === 'details' ? handleIntersection : handleIntersectionOthers);
  }
};

const init = () => {
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'product page'; //add page check conditions here based on experiment requirement

  const topBarElems = document.querySelectorAll('.tab-bar');
  if (topBarElems) {
    topBarElems.forEach((topBarElem) => topBarElem.remove());
  }

  if (document.body.classList.contains(`${ID}__seenContentJumper`)) {
    document.body.classList.remove(`${ID}__seenContentJumper`);
  }

  if (!pageCondition) {
    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);
    document.body.classList.remove(`${ID}__seenContentJumper`);

    return;
  }

  setup();

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  /*****add experiment specific code here*****/
  const targetSelector = isMobile() ? 'header ._0R2uIG.CeOuIC' : '[data-qaid="pdp_sticky_banner"]';
  const prodDetails = document.querySelector('[data-qaid="product-tile"]');
  const data = [];
  const tabListItems = document.querySelectorAll('#product_additional_details_container [role="tablist"] button[type="button"]');
  if (!tabListItems.length) {
    return;
  }

  fireEvent('Conditions Met');

  if (VARIATION === 'control') return;
  if (tabListItems.length > 0) {
    tabListItems.forEach((item) => data.push(item.textContent));
  }

  const injectTabBar = (target) => {
    target.insertAdjacentHTML('beforeend', toBar(data));
  };

  const checkAndInsertTabBar = () => {
    const el = document.querySelector(targetSelector);
    if (el && !document.querySelector('.tab-bar')) injectTabBar(el);
    if (document.querySelector('.tab-bar') && !document.body.classList.contains(`${ID}__seenContentJumper`)) {
      fireEvent('User sees the content jumper');
    }
  };

  // Monitor scroll to check for target element
  window.addEventListener('scroll', checkAndInsertTabBar);
  checkAndInsertTabBar();

  //observer add in input element----->control
  const isObserverAddedForDetails = prodDetails.dataset[`${ID}__isObserverAddedForDetails`];
  if (!isObserverAddedForDetails) {
    pollerLite(['[data-qaid="product-tile"]'], () => {
      handleObserver('[data-qaid="product-tile"]', 'details');
    });
  }
  prodDetails.dataset[`${ID}__isObserverAddedForDetails`] = true;

  const productDetailsContainer = document.querySelector('#product_additional_details_container');

  const isObserverAddedForContainer = productDetailsContainer.dataset[`${ID}__isObserverAddedForContainer`];
  if (!isObserverAddedForContainer) {
    pollerLite(['#product_additional_details_container'], () => {
      handleObserver('#product_additional_details_container', 'others');
    });
  }
  productDetailsContainer.dataset[`${ID}__isObserverAddedForContainer`] = true;
};

export default () => {
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }
  /*****Request from Screwfix*****/

  const clickHandler = (e) => {
    //check if page is correct
    if (window.utag.data.basicPageId !== 'product page') return;

    const { target } = e;
    if (target.closest('#tab-details')) {
      fireEvent('User interacts with “Details” quicklink');
      const prodDetails = document.querySelector('[data-qaid="product-tile"]');
      const clickedItem = target.closest('#tab-details');
      prodDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
      updateAriaSelected(clickedItem);
    } else if (target.closest('#tab-Reviews')) {
      window.isVariationItemClick = true;
      fireEvent('User interacts with “Reviews” quicklink');
      const clickedItem = target.closest('#tab-Reviews');
      setTabItemActive(clickedItem);
    } else if (target.closest('[id="tab-Q&As"]')) {
      window.isVariationItemClick = true;
      fireEvent('User interacts with “Q&A” quicklink');
      const clickedItem = target.closest('[id="tab-Q&As"]');
      setTabItemActive(clickedItem);
    } else if (target.closest('#tab-SpecSpecifications')) {
      window.isVariationItemClick = true;
      fireEvent('User interacts with “Spec” quicklink');
      const clickedItem = target.closest('#tab-SpecSpecifications');
      setTabItemActive(clickedItem);
    } else if (target.closest('.top-bar-button')) {
      scrollToTop();
    } else if (!window.isVariationItemClick && target.closest('[data-qaid^="pdp-tab-"]')) {
      const clickedItem = target.closest('[data-qaid*="pdp-tab-"]');
      if (clickedItem.textContent.trim().includes('Reviews')) {
        fireEvent('User clicks the reviews tab');
      } else if (clickedItem.textContent.trim().includes('Q&As')) {
        fireEvent('User clicks the Q&A’s tab');
      } else {
        fireEvent('User clicks the Specs Tab');
      }
    } else if (target.closest('[data-qaid="pdp-more-info-link"]')) {
      fireEvent('User clicks the More info Link in description');
    }

    window.isVariationItemClick = false;
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(
      [
        () => typeof window.tealiumDataLayer === 'object',
        () => window.utag !== undefined,
        () => window.__NEXT_DATA__ !== undefined,
      ],
      () => {
        window.isVariationItemClick = false;
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
