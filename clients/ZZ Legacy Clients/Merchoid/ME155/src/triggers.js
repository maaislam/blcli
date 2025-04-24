/* eslint-disable */
import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.row.max-width:last-child > .columns.small-12', // You might also like carousel
  '.product-secondary-tabs__feature:first-child > .product-secondary-tabs__feature-image > img', // Image for header
  () => {
    // Check if product brand link has a value
    try {
      return !!document.querySelector('.large-12.columns > input[name="_merchoid_pa_brand_link"]').value;
    } catch (e) {}
  },
  () => {
    // Check if product name has a value
    try {
      return !!document.querySelector('.large-12.columns > input[name="_merchoid_pa_brand_name"]').value;
    } catch (e) {}
  },
], run);
