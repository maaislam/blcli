import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.sticky-row .left a.orange-btn',
  () => window.location.pathname.indexOf('/itineraries/') > -1,
  () => innerWidth < 500,
], activate);
