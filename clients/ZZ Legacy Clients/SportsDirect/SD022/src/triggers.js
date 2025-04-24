/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

pollerLite([
  'body',
  '.productFilters',
  '.productFilterTitleBox',
  'h3.productFilterTitle',
  '#innerfiltercontainer',
  () => {
    let run = false;
    const filterTitles = document.querySelectorAll('h3.productFilterTitle');
    if (filterTitles.length) {
      for (let i = 0; filterTitles.length > i; i += 1) {
        if (filterTitles[i] && filterTitles[i].textContent.trim() == 'Brand') {
          run = true;
        }
      }
    }
    if (window.innerWidth < 1042) {
      run = false;
    }
    return run;
  },
], activate);
