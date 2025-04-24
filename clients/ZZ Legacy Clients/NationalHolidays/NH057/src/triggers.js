import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if(
  window.location.pathname.match(/itineraries/i) ||
  window.location.pathname.match(/search-results/i)
) {
  activate();
}
