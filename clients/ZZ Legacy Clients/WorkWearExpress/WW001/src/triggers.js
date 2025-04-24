import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#the_basket_form thead th:last-child',
  '.basket_contents tbody tr',
  () => !!window.jQuery
], activate);
