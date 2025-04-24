import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    // Check if page is Search Results or Itinerary Page
    if (window.location.pathname.indexOf('/search-results') > -1) {
      return !!document.querySelector('.result-item');
    } else if (window.location.pathname.indexOf('/itineraries/') > -1) {
      return !!document.querySelector('.container .fromtext.selfc');
    }
  },
], activate);
