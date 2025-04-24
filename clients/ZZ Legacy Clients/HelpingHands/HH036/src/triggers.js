import Run from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#intro', // Location intro - box 1
  '#team', // Team details - box 2
  '#rest-of-page', // Wait for at least one header and text section - unknown number
  '#rest-of-page > h2', // Section Header
  '#rest-of-page > p',
  // '.table.table-striped', // Location covered table - box 3
  '.additional-details', // Opening hours table
  '#content > .row > .hidden-lg.hidden-md.col-xs-12', // Render location
  '.pull-quote.quotation', // Review parent
  '#rest-of-page > p:last-of-type', // required for box 3 content
  () => !!window.jQuery,
], Run);
