import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.buying-buttons .buying-buttons__buy.js-buyingButton',
  () => {
    return window.digitalData && window.digitalData.page && window.digitalData.page.category;
  },
  () => {
    if (window.digitalData.page.category.subCategory1 === 'Earrings') {
      return false;
    } else {
      return true;
    }
  },
], activate);

