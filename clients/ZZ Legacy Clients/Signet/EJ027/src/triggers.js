import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#basketForm .buying-buttons',
  '.product-image__link',
  '.buying-info__name',
  () => {
    return !!window.digitalData.page.category;
  },
  () => {
    return !!window.jQuery;
  },
], activate);
