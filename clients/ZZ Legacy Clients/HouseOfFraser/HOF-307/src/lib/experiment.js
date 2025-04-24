/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
  setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  const container = document.querySelector('#ProductContainer');
  if(container) {
    container.addEventListener('click', e => {
      if(e.target.closest('.reviews-container')) {
        fireEvent('Click Reviews');
      }

      if(e.target.closest('.hotspotquickbuy')) {
        fireEvent('Click Quick View');
      }

      if(e.target.closest('.hotspotwishlist')) {
        fireEvent('Click Wishlist');
      }

      if(e.target.closest('.ProductImageList')) {
        fireEvent('Click Image');
      }

      if(e.target.closest('.s-producttext-top-wrapper')) {
        fireEvent('Click Main Text');
      }

      if(e.target.closest('.product-rollup-list')) {
        fireEvent('Click Swatch');
      }

      if(e.target.closest('.product-rollup-more')) {
        fireEvent('Click View All Swatch');
      }
    });
  }
};
