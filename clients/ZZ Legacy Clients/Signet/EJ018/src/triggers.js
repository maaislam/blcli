import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    return window.digitalData && window.digitalData.page && window.digitalData.page.category;
  },
  () => {
    if (window.digitalData.page.category.subCategory1 === 'Rings' || window.digitalData.page.category.subCategory1 === 'Watches') {
      return true;
    } else {
      return false;
    }
  },
], activate);
