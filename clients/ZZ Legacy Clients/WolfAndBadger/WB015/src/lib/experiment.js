/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { events } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  // Slider class applies the horiontal scroll.
  const slider = document.querySelector('.related-products .slider');
  if (slider) {
    slider.classList.remove('slider');
  }

  // Add event tracking.
  const products = document.querySelector('.related-products .products');
  const designersLinks = products.querySelectorAll('.product-summary a[href*="/designers/"]');
  const productsLinks = products.querySelectorAll('.product-summary [href*="result_index"]');

  for (let i = 0; i < designersLinks.length; i++) {
    designersLinks[i].addEventListener('click', () => {
      events.send(shared.ID, 'Click', 'Discover more designer link');
    });
  }

  for (let i = 0; i < productsLinks.length; i++) {
    productsLinks[i].addEventListener('click', () => {
      events.send(shared.ID, 'Click', 'Discover more product link');
    });
  }

};
