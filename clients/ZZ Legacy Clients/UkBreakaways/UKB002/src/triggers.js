import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.search-panel.content',
  '#ctl00_ctl00_txtKeyword',
  '#search-results .two-columns .right .result-item',
  '#txtStartDateAlt',
], activate);
