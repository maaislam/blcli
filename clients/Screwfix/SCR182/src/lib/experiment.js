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
import { onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 0;

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const scrollToSection = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    const offset = 90;
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
  }
};

const clickHandler = (e) => {
  const { target } = e;

  if (target.closest('button[form="search-form"]')) {
    fireEvent('Find stores button clicked');
    setTimeout(() => {
      pollerLite([() => !document.querySelector('button[form="search-form"] > svg')], () => {
        fireEvent('Conditions Met');
        VARIATION !== 'control' && scrollToSection('[data-qaid="stock-availability-nearby-stores"]');
      });
    }, 300);
  } else if (target.closest('[data-qaid="stock-availability-store"]') && target.closest('a')) {
    fireEvent('View store details button clicked');
  } else if (target.closest('[data-qaid="stock-availability-store"]') && target.closest('button[type="button"]')) {
    fireEvent('Add to basket button clicked');
  } else if (
    target.closest('[data-qaid="stock-availability-nearby-stores"]') &&
    target.closest('[data-qaid="delivery-option"]') &&
    target.closest('button[type="button"]')
  ) {
    fireEvent('Add to basket button clicked');
  }
};

const init = () => {
  //check if page is correct
  const { search } = window.location;
  const pageCondition = window.utag.data.basicPageId === 'stockAvailabilityPage' && search.includes('product_id'); //add page check conditions here based on experiment requirement

  if (!pageCondition || !isMobile()) {
    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);
    document.body.removeEventListener('click', clickHandler);
    return;
  }

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  setup();
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }
  /*****Request from Screwfix*****/
  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  //if (VARIATION === 'control') return;
};

export default () => {
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
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
