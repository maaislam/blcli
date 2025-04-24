import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.container.pdpContent',
  '.product-image picture source',
  '.buying-info__pricing',
  '.buying-buttons #buy',
  '.container.pdpContent .compare-wish',
  '#js-accordion-tabs',
  () => {
    return !!window.jQuery;
  },
], activate);
