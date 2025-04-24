import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
/* eslint-disable */
pollerLite([
  'body',
  '#top ~ div',
  '.ux_banner',
  '.entry-content h3',
  '.entry-content div',
  '.product-small',
  '.chimpy-reset.chimpy_shortcode_content',
  '.name',
  '#chimpy_shortcode_field_EMAIL',
  () => {
    try {
      return !!wc_aelia_currency_switcher_params.selected_currency;
    } catch(e) {}
  },
  // Me184 requires 12 products
  () => {
    let hasProducts = false;
    if (document.querySelectorAll('.product-small').length > 13) {
      hasProducts = true;
    }
    return hasProducts;
  },
], activate);
