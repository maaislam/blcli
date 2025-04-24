import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const pageType = window.universal_variable.page.type;

switch (pageType) {
  case 'Category':
    pollerLite([
      '#action-basket',
    ], activate);
    break;

  case 'Product':
    pollerLite([
      '#search-results .search-product-list',
      '.product .product-link',
      '.add-to-basket',
    ], activate);
    break;

  default:
    break;
}
