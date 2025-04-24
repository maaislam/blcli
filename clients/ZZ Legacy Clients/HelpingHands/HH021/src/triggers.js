import Run from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.pull-quote.quotation', // Review element
  '#main-nav', // Render location mobile
  '.row > .text-center', // Render location large desktop
  '.col-md-3.logo-block', // Render location tablet/small desktop
], Run);
