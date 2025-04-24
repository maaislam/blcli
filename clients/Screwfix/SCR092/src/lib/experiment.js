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
import { isElementInViewport, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const init = () => {
  const pageCondition = window.utag.data.basicPageId === 'product page';

  if (!pageCondition) {
    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }
  setup();
  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/
  fireEvent('Conditions Met');

  const reviewWrapper = document.querySelector('._2hopKH');
  const cloneReviewWrapper = reviewWrapper.cloneNode(true);
  cloneReviewWrapper.classList.add(`${ID}__reviewWrapper`);
  const stickyWrapper = document.querySelector('[data-qaid="pdp_sticky_product_footer"]');
  const quantityElement = stickyWrapper.querySelector('[data-qaid="pdp-product-quantity"]');

  if (VARIATION == 'control') {
    return;
  }

  if (document.querySelector(`.${ID}__reviewWrapper`)) {
    document.querySelector(`.${ID}__reviewWrapper`).remove();
  }

  quantityElement && quantityElement.insertAdjacentElement('afterend', cloneReviewWrapper);
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

    const pageCondition = window.utag.data.basicPageId === 'product page';
    if (!pageCondition) return;

    const { target } = e;

    if (target.closest('button[type="button"]') && target.closest(`.${ID}__reviewWrapper`)) {
      const controlReviewWrapper = document.querySelector('._2hopKH');
      const reviewRatings = controlReviewWrapper.querySelector('button[type="button"]');
      reviewRatings.click();
    } else if (target.closest('button[type="button"]') && target.closest(`._2hopKH:not(.${ID}__reviewWrapper)`)) {
      fireEvent('User interacts with review rating');
    } else if (target.closest('button.kyAUlC') && target.closest(`.${ID}__reviewWrapper`)) {
      const clickedItem = target.closest('button.kyAUlC');
      const text = clickedItem.textContent;
      const controlReviewWrapper = document.querySelector('._2hopKH');
      if (text.includes('review')) {
        controlReviewWrapper.querySelector('button:nth-child(2)').click();
      } else {
        controlReviewWrapper.querySelector('button:last-child').click();
      }
    } else if (target.closest('button.kyAUlC') && target.closest(`._2hopKH:not(.${ID}__reviewWrapper) button:nth-child(2)`)) {
      fireEvent('User interacts with write a review');
    } else if (target.closest('button.kyAUlC') && target.closest(`._2hopKH:not(.${ID}__reviewWrapper) button:last-child`)) {
      fireEvent('User interacts with ask a question');
    } else if (target.closest('[data-qaid="pdp-more-info-link"]')) {
      fireEvent('User interacts with more info');
    } else if (target.closest('button#tab-0') && !document.body.classList.contains(`${ID}__ShowReviewsTab`)) {
      fireEvent('User sees the reviews tab');
      document.body.classList.add(`${ID}__ShowReviewsTab`);
    }
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  const onScroll = () => {
    const targetIndividualReviewsElement = document
      .querySelector('[data-qaid="bv-product-id"]')
      ?.shadowRoot?.querySelector('#reviews_container');

    const targetReviewsCallOut = document.querySelector('[data-qaid="bv-product-id"]')?.shadowRoot?.querySelector('.jmxpYe');

    const targetReviewsTab = document.querySelector('[data-qaid="pdp-tab-0-selected"]');
    if (
      targetIndividualReviewsElement &&
      isElementInViewport(targetIndividualReviewsElement) &&
      !document.body.classList.contains(`${ID}__ShowIndividualReviews`)
    ) {
      fireEvent('User sees the indidvual reviews');
      document.body.classList.add(`${ID}__ShowIndividualReviews`);
    } else if (
      targetReviewsTab &&
      isElementInViewport(targetReviewsTab) &&
      !document.body.classList.contains(`${ID}__ShowReviewsTab`)
    ) {
      fireEvent('User sees the reviews tab');
      document.body.classList.add(`${ID}__ShowReviewsTab`);
    } else if (
      targetReviewsCallOut &&
      isElementInViewport(targetReviewsCallOut) &&
      !document.body.classList.contains(`${ID}__ShowReviewsCallOut`)
    ) {
      fireEvent('User sees the reviews call outs');
      document.body.classList.add(`${ID}__ShowReviewsCallOut`);
    }
  };

  // Add scroll event listener
  window.removeEventListener('scroll', onScroll);
  window.addEventListener('scroll', onScroll);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange((oldHref) => {
    pollerLite(
      [
        () => typeof window.tealiumDataLayer === 'object',
        () => window.utag !== undefined,
        () => window.__NEXT_DATA__ !== undefined,
      ],
      () => {
        if (!oldHref.includes(window.location.pathname)) {
          document.body.classList.remove(`${ID}__ShowIndividualReviews`, `${ID}__ShowReviewsTab`, `${ID}__ShowReviewsCallOut`);
        }
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
