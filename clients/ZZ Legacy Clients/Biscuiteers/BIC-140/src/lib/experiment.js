/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import { addPoller, addEventListener, addObserver } from './winstack';
import { events, elementIsInView } from '../../../../../lib/utils';
import settings from './shared';
import debounce from 'lodash/debounce';
import markup from './markup';

export default () => {
  setup();
  fireEvent('Did Meet Conditions');

  const addBtn = document.querySelector('local-add-to-basket .button');
  if(addBtn) {
    addEventListener(addBtn, 'click', () => {
      fireEvent('Clicked Add To Basket');
    });
  }

  const giftingBox = document.querySelector('product-content div[ng-if*="vm"]');

  let eventSent = false;
  if(giftingBox) {
    addEventListener(window, 'scroll', debounce(() => {
      if(!eventSent && elementIsInView(giftingBox, false)) {
        fireEvent('In View');

        eventSent = true;
      }
    }, 100));
  }
  
  if(settings.VARIATION == 'control') {
    return;
  }

  // ----
  // Add markup
  // ----
  giftingBox.innerHTML = markup;
  
  // ----
  // V2 Positioning
  // ----
  if(settings.VARIATION == 2 && window.innerWidth < 960) {
    const whenOccasion = document.querySelector('local-add-to-basket');
    const giftingBoxWrap = document.querySelector('product-content');

    if(whenOccasion) {
      whenOccasion.insertAdjacentElement('afterend', giftingBoxWrap);
    }
  } else if(settings.VARIATION == 1 && window.innerWidth >= 960) {
    const giftingBoxWrap = document.querySelector('product-content');
    const prodReviews = document.querySelector('product-reviews');

    if(prodReviews) {
      prodReviews.insertAdjacentElement('afterend', giftingBoxWrap);
    }
  }
};
