/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#TopPaginationWrapper #filterByMob .MobFiltersText',
  '.mobSortFilter.mobControlBarWrap',
  '#filterlist', () => {
    let run = false;
    if (window.dataLayer && window.dataLayer[1] && window.dataLayer[1].pageType && window.dataLayer[1].pageType == 'BrowsePL') {
      run = true;
    }
    return run;
  }], activate);
