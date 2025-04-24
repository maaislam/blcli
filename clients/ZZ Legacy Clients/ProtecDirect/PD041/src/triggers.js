import Run from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.catBanner', // Render location for price
  '#variant-price-header', // Ex vat price
  '.price_details', // such as box of 10
  '#variant-grossPrice-header', // VAT price
  '#carousel_alternate .thumb', // Carousel thumbnails
  '.mainImageHolder', // Carousel/Product image container
  '.mainImageHolder > .span-5', // Thumbnail container
  '.prod > h3 > a', // Brand Link
  '.code', // Product Code
  '.prod > p', // Product Details
  '#tab-details', // Product details tab
  '#productDetailUpdateable .span-6.last', // Render location for bottom container
  '#breadcrumb li:not(.active) a', // Breadcrumbs for discover more area
  '[name="CSRFToken"]', // CSRF Token
  '[name="productCodePost"]', // Product code
  '#qty', // Quantity box
  '.plus', // Increment quantity button
  '.minus', // Decrement quantity button
  '#minicart_data .items', // N of items in header
  '#minicart_data .total', // Header total
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], Run);
