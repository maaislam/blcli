import run from './experiment';
import { poller } from '../../../../lib/uc-lib';

if (typeof window.getSelection === 'function') {
  poller([
    '#search-results-container > .agency-result .agency-title',
    'div[data-action="website"]',
    '.agency-result',
    () => {
      let checkjQuery = false;
      if (window.jQuery) {
        checkjQuery = true;
      }
      return checkjQuery;
    },
  ], run);
}

