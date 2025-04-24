import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  () => !!window.jQuery,
  () => !!window.Promise,
  'li.product',
  '#hero-banner',
], activate);
