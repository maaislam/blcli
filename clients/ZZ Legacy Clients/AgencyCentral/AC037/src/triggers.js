import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.AC018_usp', // USP after header, content rendered after this
  '.AC018_search-refine > h2', // Agency refine title
  '.AC018_search-results', // Search result container
  '.AC018_refine-sticky-btn', // Opens refine search
  // Check if the number of agencies and location exist
  () => {
    let checkAgencyContent = false;
    if (document.querySelectorAll('.AC0018_title > h2 > strong')[0] && document.querySelectorAll('.AC0018_title > h2 > strong')[1]) {
      checkAgencyContent = true;
    }
    return checkAgencyContent;
  },
], Run);
