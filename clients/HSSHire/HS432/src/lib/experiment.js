/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import shared from '../../../../../core-files/shared';
import { setup, fireEvent } from '../../../../../core-files/services';

// Components

// Utils

// Data

const runChanges = () => {
  let products = document.querySelector(
    '.product_listing_inner.product_list_section'
  );

  let reventlyViewedItems = document.querySelector('.recentelyviewed_footer');

  const ApplyCode = (data) => {
    data.forEach((product) => {
      const url = product.parentElement.querySelector('a').href;

      const hireButton = `<a href="${url}" data-test-attribute="view_prices_button" class="view_prices">View Hire Prices</a>`;

      if (
        !!product.parentElement.querySelector('.offers.partial') &&
        (!!product.querySelector('.price>span')?.innerHTML.includes('day') ||
          !!product.querySelector('.price>span')?.innerHTML.includes('week') ||
          !!product.querySelector('.price>span')?.innerHTML.includes('month'))
      ) {
        product.parentElement
          .querySelector('.offers.partial')
          .insertAdjacentHTML('beforebegin', hireButton);
        product.style.display = 'none';
      }
      if (
        !product.parentElement.querySelector('.offers.partial') &&
        (!!product.querySelector('.price>span')?.innerHTML.includes('day') ||
          !!product.querySelector('.price>span')?.innerHTML.includes('week') ||
          !!product.querySelector('.price>span')?.innerHTML.includes('month'))
      ) {
        product.parentElement.insertAdjacentHTML('afterend', hireButton);
        product.style.display = 'none';
      }
    });
  };
  if (window.location.href.includes('search')) {
    if (
      !!document.querySelector('#resultsList')?.querySelectorAll('.cart')
        .length > 0
    ) {
      document
        .querySelector('.filters .col-sm-10')
        .querySelectorAll('.dropdown.search-filter-desk')[1]
        .remove();
      document.querySelector('#sort_form1').remove();
      document
        .querySelector('.col-lg-3.col-md-3.col-sm-3.col-xs-6.sort_head')
        .remove();
      products = document
        .querySelector('#resultsList')
        .querySelectorAll('.cart');
      ApplyCode(products);
      ApplyCode(reventlyViewedItems.querySelectorAll('.cart'));
    }
  }
  if (document.querySelector('body').classList.contains('page-category')) {
    if (products.querySelectorAll('.cart').length > 0) {
      products = products.querySelectorAll('.cart');
      ApplyCode(products);
    }
    if (reventlyViewedItems) {
      ApplyCode(reventlyViewedItems.querySelectorAll('.cart'));
    }
  }
};

export default () => {
  setup();

  // Fire event when code is loaded
  fireEvent('Test Code Fired');

  if (shared.VARIATION === 'control') {
    return;
  }

  runChanges();
  // Tracking
  document
    .querySelectorAll('[data-test-attribute="view_prices_button"]').forEach( (button) => {
			button.addEventListener('click', () => fireEvent('Clicked Cta'));
		});
};
