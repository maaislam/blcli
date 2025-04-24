/**
 * NH070 - Per Person Pricing Clarity
 * @author User Conversion
 */
import { setup, addNewElementsToItineraryPage, addNewElementsToResultsPage, amendElementsToShortlist } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';

const activate = () => {
  setup();

  // Experiment code
  if (window.location.pathname.indexOf('/itineraries/') > -1) {
    pollerLite([
      'body',
      '.destination-box',
      '.blue-line.NH064-price-line',
    ], addNewElementsToItineraryPage);
  } else if (window.location.pathname.indexOf('/search-results') > -1) {
    pollerLite([
      'body',
      '.result-item',
      '#divQuickviewPopup .content .web-offer',
    ], addNewElementsToResultsPage);
  } else if (window.location.pathname.indexOf('/my-shortlist') > -1) {
    pollerLite([
      'body',
      '.shortlist-row.header-row',
      '.shortlist-tbl',
      '.shortlist-row .shortlist-tbl',
    ], amendElementsToShortlist);
  }
};

export default activate;
