import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => { return window.location.pathname.indexOf('/itineraries/') > -1} ,
  () => window.jQuery && window.jQuery.fn && window.jQuery.fn.slick,
  () => window.innerWidth < 500,
], activate);
