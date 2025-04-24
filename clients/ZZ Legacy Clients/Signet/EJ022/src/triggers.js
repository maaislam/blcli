import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.buying-info__pricing',
  '.pdpContent .tableContainer',
  '#js-accordion-tabs',
  'div[data-accordion-tabs]',
], activate);
