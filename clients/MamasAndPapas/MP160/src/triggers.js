import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#js-productFilters',
  '.productFilter_footer.productFilter_footer-bottom',
  '.py-3.filterFooter0.filterFooterCarousel.js-uncheckCheckboxContainer',
  '.productFilter_filterSelectors',
  '.blackout',
], activate);
