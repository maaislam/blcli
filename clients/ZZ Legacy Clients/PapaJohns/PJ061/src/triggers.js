import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => window.location.pathname === '/' || window.location.pathname.indexOf('/offers.aspx') > -1 || window.location.pathname.indexOf('/pizzas.aspx') > -1,
  () => window.jQuery && window.jQuery.fn,
], activate);
