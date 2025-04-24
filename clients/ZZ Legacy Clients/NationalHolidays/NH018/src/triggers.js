import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body', '#SearchResults', '.search-again', () => {
    let hasNoResults = false;
    const resultsTitle = document.querySelector('.search-options > .matching-results > strong');
    if (!resultsTitle) {
      return false;
    }
    const resultsAmount = resultsTitle.textContent;
    if (resultsAmount === '0') {
      hasNoResults = true;
    }
    // if (hasNoResults === true) {
    //   return true;
    // }
    return hasNoResults;
  },
], Experiment.init);
